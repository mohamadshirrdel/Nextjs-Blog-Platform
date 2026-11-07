import { connectToDB } from "@/app/libs/db";
import User from "@/app/libs/models/User";
import { auth, signOut } from "@/auth";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import BookmarksCount from "../blog/BookmarksCount";

export default async function Navbar({ categories }) {
  const session = await auth();


  let isAdmin = false;

  if (session?.user?.id) {
    await connectToDB();

    const currentUser = await User.findById(session.user.id)
      .select("role")
      .lean();

    isAdmin = currentUser?.role === "admin";
  }

  const parentCategories = categories.filter((category) => !category.parent);

  async function logout() {
    "use server";

    await signOut();
  }

  return (
    <header className="border-b border-white/10 bg-[#09090b]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-black tracking-tight">
          دو<span className="text-violet-500">لاگ</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <Link href="/" className="transition hover:text-white">
            خانه
          </Link>

          <Link href="/blog" className="transition hover:text-white">
            وبلاگ
          </Link>

          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1.5 transition hover:text-white"
            >
              دسته‌بندی‌ها
              <span className="text-xs transition-transform duration-200 group-hover:rotate-180">
                ↓
              </span>
            </button>

            <div className="invisible absolute right-1/2 top-full z-50 w-[680px] translate-x-1/2 translate-y-3 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="rounded-2xl border border-white/10 bg-[#18181b] p-6 shadow-2xl shadow-black/30">
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      دسته‌بندی‌ها
                    </h3>

                    <p className="mt-1 text-xs text-zinc-500">
                      موضوع مورد نظر خودت رو انتخاب کن
                    </p>
                  </div>

                  <Link
                    href="/blog"
                    className="text-xs text-violet-400 transition hover:text-violet-300"
                  >
                    مشاهده همه مطالب
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                  {parentCategories.map((category) => {
                    const children = categories.filter(
                      (child) => child.parent === category.id,
                    );

                    return (
                      <div key={category.id} className="min-w-0">
                        <Link
                          href={`/category/${category.slug}`}
                          className="mb-2 block truncate text-sm font-bold text-white transition hover:text-violet-400"
                        >
                          {category.title}
                        </Link>

                        {children.length > 0 && (
                          <div className="space-y-1">
                            {children.map((child) => (
                              <Link
                                key={child.id}
                                href={`/category/${category.slug}/${child.slug}`}
                                className="block truncate rounded-md px-2 py-1.5 text-xs text-zinc-500 transition hover:bg-white/5 hover:text-zinc-200"
                              >
                                {child.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <Link href="/about" className="transition hover:text-white">
            درباره ما
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {session && <BookmarksCount />}

          {session ? (
            <>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 rounded-lg border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 transition hover:bg-violet-500/20 hover:text-violet-200"
                >
                  <LayoutDashboard className="h-4 w-4" />
               داشبورد
                </Link>
              )}

              <Link
                href="/profile"
                className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
              >
                {session.user.name}
              </Link>

              <form action={logout}>
                <button
                  type="submit"
                  className="rounded-lg px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
                >
                  خروج
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
              >
                ورود
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-violet-500"
              >
                ثبت‌نام
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

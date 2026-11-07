import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-medium text-violet-400">حساب کاربری</p>

        <h1 className="mt-2 text-3xl font-black tracking-tight">پروفایل من</h1>

        <p className="mt-2 text-sm text-zinc-500">
          اطلاعات حساب کاربری خودت را اینجا مشاهده کن.
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <div className="border-b border-white/10 px-6 py-6 sm:px-8">
          <h2 className="text-lg font-bold text-white">اطلاعات حساب</h2>

          <p className="mt-1 text-sm text-zinc-500">اطلاعات فعلی حساب کاربری</p>
        </div>

        <div className="grid gap-6 px-6 py-8 sm:grid-cols-2 sm:px-8">
          <div>
            <p className="text-xs text-zinc-600">نام</p>

            <p className="mt-2 text-sm font-medium text-white">
              {session.user?.name}
            </p>
          </div>

          <div>
            <p className="text-xs text-zinc-600">ایمیل</p>

            <p className="mt-2 text-sm font-medium text-white">
              {session.user?.email}
            </p>
          </div>

          <div>
            <p className="text-xs text-zinc-600">شناسه کاربر</p>

            <p className="mt-2 break-all font-mono text-xs text-zinc-400">
              {session.user?.id}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  FolderTree,
  MessageCircle,
  PenLine,
} from "lucide-react";
import { auth } from "@/auth";
import { getPublishedPosts } from "@/app/libs/data/post";
import { getCategories } from "@/app/libs/data/category";

const features = [
  {
    icon: PenLine,
    title: "بنویس",
    text: "ویرایشگر ساده برای نوشتن تجربه‌ها و آموزش‌های برنامه‌نویسی، بدون حاشیه.",
  },
  {
    icon: FolderTree,
    title: "دسته‌بندی کن",
    text: "دسته‌بندی و زیردسته‌های مرتب تا خواننده‌ها سریع به موضوع موردنظرشان برسند.",
  },
  {
    icon: Bookmark,
    title: "ذخیره کن",
    text: "مطالب مفید را نشان‌گذاری کن و هر وقت خواستی از صفحه نشان‌شده‌ها برگرد.",
  },
  {
    icon: MessageCircle,
    title: "گفتگو کن",
    text: "زیر هر پست نظر بگذار و با نویسنده‌ها و بقیه برنامه‌نویس‌ها تبادل نظر کن.",
  },
];

export default async function Home() {
  const session = await auth();

  let posts = [];
  let categories = [];

  try {
    [posts, categories] = await Promise.all([
      getPublishedPosts(),
      getCategories(),
    ]);
  } catch (error) {
    console.error("Home page data error:", error);
  }

  const latestPosts = posts.slice(0, 3);
  const parentCategories = categories.filter((c) => !c.parent).slice(0, 8);
  const authorsCount = new Set(posts.map((p) => p.author.id)).size;

  const stats = [
    { value: posts.length, label: "مطلب منتشرشده" },
    { value: categories.length, label: "دسته‌بندی" },
    { value: authorsCount, label: "نویسنده" },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* ===== Hero ===== */}
      <section className="relative">
        {/* glow + grid background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-1/4 h-[480px] w-[480px] rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute top-40 left-1/4 h-[360px] w-[360px] rounded-full bg-fuchsia-500/10 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.25]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:py-28">
          {/* text */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
              وبلاگ برنامه‌نویس‌ها، برای برنامه‌نویس‌ها
            </span>

            <h1 className="mt-6 text-4xl font-black leading-[1.4] tracking-tight sm:text-5xl lg:text-6xl">
              کدهایت را بنویس،
              <br />
              <span className="bg-gradient-to-l from-violet-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">
                تجربه‌هایت را به اشتراک بگذار
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400">
              دولاگ جایی است برای نوشتن، یاد گرفتن و دیده شدن. از آموزش‌های وب و
              جاوااسکریپت تا تجربه‌های واقعی پروژه‌ها، همه‌چیز را اینجا بخوان و
              منتشر کن.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/blog"
                className="rounded-xl bg-violet-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition hover:-translate-y-0.5 hover:bg-violet-500"
              >
                مشاهده مطالب
              </Link>

              <Link
                href={session ? "/profile/posts/new" : "/register"}
                className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-bold text-zinc-200 transition hover:-translate-y-0.5 hover:border-violet-500/40 hover:bg-white/10"
              >
                {session ? "نوشتن پست جدید" : "همین حالا شروع کن"}
              </Link>
            </div>

            {/* stats */}
            <div className="mt-14 flex gap-10 border-t border-white/10 pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-black text-white">
                    {stat.value.toLocaleString("fa-IR")}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* code window */}
          <div className="relative" dir="ltr">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-600/20 to-fuchsia-500/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111113] shadow-2xl shadow-black/50">
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-3 font-mono text-xs text-zinc-500">
                  new-post.jsx
                </span>
              </div>

              <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-7 text-zinc-300">
                <code>
                  <span className="text-zinc-600">{"// "}</span>
                  <span className="text-zinc-600">
                    {"اولین پستت رو منتشر کن"}
                  </span>
                  {"\n"}
                  <span className="text-violet-400">const</span> post = {"{"}
                  {"\n"}
                  {"  "}title:{" "}
                  <span className="text-emerald-400">
                    &quot;شروع با React&quot;
                  </span>
                  ,{"\n"}
                  {"  "}category:{" "}
                  <span className="text-emerald-400">
                    &quot;فرانت‌اند&quot;
                  </span>
                  ,{"\n"}
                  {"  "}status:{" "}
                  <span className="text-emerald-400">
                    &quot;published&quot;
                  </span>
                  ,{"\n"}
                  {"}"};{"\n\n"}
                  <span className="text-violet-400">await</span>{" "}
                  <span className="text-sky-400">publish</span>(post);{"\n"}
                  <span className="text-zinc-600">{"// "}✓ منتشر شد</span>
                  <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-violet-400" />
                </code>
              </pre>
            </div>

            {/* floating chips */}
            <div
              dir="rtl"
              className="absolute -bottom-5 right-6 flex items-center gap-2 rounded-xl border border-white/10 bg-[#18181b] px-4 py-2.5 text-xs text-zinc-300 shadow-xl"
            >
              <Bookmark className="h-4 w-4 text-violet-400" />
              <span>۱۲۸ نشان‌گذاری</span>
            </div>
            <div
              dir="rtl"
              className="absolute -top-5 left-6 flex items-center gap-2 rounded-xl border border-white/10 bg-[#18181b] px-4 py-2.5 text-xs text-zinc-300 shadow-xl"
            >
              <MessageCircle className="h-4 w-4 text-violet-400" />
              <span>نظر جدید روی پست تو</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Categories ===== */}
      {parentCategories.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-violet-400">موضوعات</p>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                دنبال چی می‌گردی؟
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {parentCategories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-zinc-300 transition hover:-translate-y-0.5 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ===== Latest posts ===== */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-violet-400">وبلاگ</p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              تازه‌ترین نوشته‌ها
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-400 transition hover:text-violet-300"
          >
            مشاهده همه
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        {latestPosts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
              <PenLine className="h-8 w-8 text-violet-400" />
            </div>
            <h3 className="mt-6 text-lg font-bold">هنوز مطلبی منتشر نشده</h3>
            <p className="mt-2 text-sm text-zinc-500">
              اولین نفری باش که یک پست منتشر می‌کند.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-white/5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400">
                    {post.category.title}
                  </span>

                  <span className="text-xs text-zinc-600">
                    {new Date(post.publishedAt).toLocaleDateString("fa-IR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold leading-8 transition group-hover:text-violet-400">
                  {post.title}
                </h3>

                <p className="mb-4 mt-2 line-clamp-3 text-sm leading-7 text-zinc-500">
                  {post.content}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                  <span className="text-zinc-500">{post.author.name}</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-violet-400">
                    مطالعه پست
                    <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ===== Features ===== */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm font-medium text-violet-400">امکانات</p>
          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            هر چیزی که یک وبلاگ خوب لازم دارد
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6 transition hover:border-violet-500/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
                  <Icon className="h-6 w-6 text-violet-400" />
                </div>
                <h3 className="mt-5 text-base font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-500">
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== CTA ===== */}
      {!session && (
        <section className="mx-auto max-w-7xl px-6 pb-24 pt-8">
          <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/20 via-[#111113] to-fuchsia-500/10 px-8 py-16 text-center">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[100px]" />

            <h2 className="relative text-2xl font-black sm:text-4xl">
              آماده‌ای اولین پستت را بنویسی؟
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-400">
              ثبت‌نام رایگان است و کمتر از یک دقیقه طول می‌کشد.
            </p>

            <div className="relative mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="rounded-xl bg-violet-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition hover:-translate-y-0.5 hover:bg-violet-500"
              >
                ساخت حساب کاربری
              </Link>
              <Link
                href="/login"
                className="rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-bold text-zinc-200 transition hover:bg-white/10"
              >
                قبلاً ثبت‌نام کرده‌ام
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

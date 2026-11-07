import { BookOpen, Handshake, PenLine } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";

export const metadata = {
  title: "درباره ما | نکست‌بلاگ",
  description: "با دولاگ، وبلاگ برنامه‌نویس‌ها بیشتر آشنا شوید.",
};

const values = [
  {
    icon: BookOpen,
    title: "یاد بگیر",
    text: "مطالب آموزشی و تجربه‌های واقعی از دنیای برنامه‌نویسی و توسعه وب، به زبان ساده و فارسی.",
  },
  {
    icon: PenLine,
    title: "بنویس",
    text: "هر کسی می‌تواند ثبت‌نام کند، پست بنویسد و دانسته‌هایش را با بقیه به اشتراک بگذارد.",
  },
  {
    icon: Handshake,
    title: "به اشتراک بگذار",
    text: "با نظر دادن، نشان‌گذاری و گفتگو زیر پست‌ها، یک جامعه‌ی کوچک و دوستانه می‌سازیم.",
  },
];

const steps = [
  { title: "ثبت‌نام کن", text: "با چند کلیک حساب کاربری خودت را بساز." },
  {
    title: "پست بنویس",
    text: "از پروفایلت یک پست جدید بساز و دسته‌بندی‌اش را انتخاب کن.",
  },
  {
    title: "منتشر کن",
    text: "پستت در وبلاگ نمایش داده می‌شود تا بقیه بخوانند و نظر بدهند.",
  },
];

const stack = [
  "Next.js",
  "React",
  "Tailwind CSS",
  "MongoDB",
  "NextAuth",
  "Zustand",
];

export default async function AboutPage() {
  const session = await auth();

  return (
    <div className="relative overflow-hidden">
      {/* ===== Hero ===== */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 right-1/3 h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute top-32 left-1/4 h-[300px] w-[300px] rounded-full bg-fuchsia-500/10 blur-[110px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center lg:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-300">
            درباره ما
          </span>

          <h1 className="mt-6 text-4xl font-black leading-[1.4] tracking-tight sm:text-5xl">
            ما اینجا هستیم تا{" "}
            <span className="bg-gradient-to-l from-violet-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">
              دانش برنامه‌نویسی
            </span>{" "}
            دست‌به‌دست بچرخد
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400">
            دولاگ جایی است برای نوشتن، یاد گرفتن و به اشتراک گذاشتن تجربه‌ها و
            ایده‌های دنیای برنامه‌نویسی. هدف ما ساده است: یک فضای مرتب و خوشگذار
            برای کسانی که دوست دارند بنویسند و بخوانند.
          </p>
        </div>
      </section>

      {/* ===== Values ===== */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {values.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-7 transition hover:-translate-y-1 hover:border-violet-500/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
                  <Icon className="h-6 w-6 text-violet-400" />
                </div>
                <h2 className="mt-5 text-lg font-bold">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-zinc-500">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm font-medium text-violet-400">
            چطور کار می‌کند؟
          </p>
          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            سه قدم تا اولین پست
          </h2>
        </div>

        <div className="relative grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-7"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-sm font-black text-white shadow-lg shadow-violet-600/30">
                {(index + 1).toLocaleString("fa-IR")}
              </span>
              <h3 className="mt-5 text-base font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-zinc-500">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Tech stack ===== */}
      <section className="mx-auto max-w-4xl px-6 py-12" dir="rtl">
        <div className="rounded-3xl border border-white/10 bg-[#111113] p-8 text-center sm:p-12">
          <p className="text-sm font-medium text-violet-400">پشت صحنه</p>
          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            ساخته‌شده با ابزارهای مدرن
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-zinc-500">
            این وبلاگ با تکنولوژی‌هایی ساخته شده که خودمان هم هر روز با آن‌ها
            کار می‌کنیم.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3" dir="ltr">
            {stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2 font-mono text-xs text-zinc-300 transition hover:border-violet-500/40 hover:text-violet-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-12">
        <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/20 via-[#111113] to-fuchsia-500/10 px-8 py-14 text-center">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[100px]" />

          <h2 className="relative text-2xl font-black sm:text-3xl">
            {session ? "آماده‌ای بنویسی؟" : "به جمع ما بپیوند"}
          </h2>

          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={session ? "/profile/posts/new" : "/register"}
              className="rounded-xl bg-violet-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition hover:-translate-y-0.5 hover:bg-violet-500"
            >
              {session ? "نوشتن پست جدید" : "ساخت حساب کاربری"}
            </Link>

            <Link
              href="/blog"
              className="rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-bold text-zinc-200 transition hover:bg-white/10"
            >
              مشاهده مطالب
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

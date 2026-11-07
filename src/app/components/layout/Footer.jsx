import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#09090b]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="text-xl font-black tracking-tight">
              دو<span className="text-violet-500">لاگ</span>
            </Link>

            <p className="mt-4 text-sm leading-7 text-zinc-500">
              جایی برای نوشتن، یاد گرفتن و به اشتراک گذاشتن تجربه‌ها و ایده‌های
              دنیای برنامه‌نویسی.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h3 className="mb-4 text-sm font-bold text-white">دسترسی سریع</h3>

              <div className="flex flex-col gap-3 text-sm text-zinc-500">
                <Link href="/" className="transition hover:text-white">
                  خانه
                </Link>

                <Link href="/blog" className="transition hover:text-white">
                  وبلاگ
                </Link>

                <Link href="/about" className="transition hover:text-white">
                  درباره ما
                </Link>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold text-white">حساب کاربری</h3>

              <div className="flex flex-col gap-3 text-sm text-zinc-500">
                <Link href="/login" className="transition hover:text-white">
                  ورود
                </Link>

                <Link href="/register" className="transition hover:text-white">
                  ثبت‌نام
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 نکست‌بلاگ. تمام حقوق محفوظ است.</p>

          <p>ساخته شده با Next.js و ❤️</p>
        </div>
      </div>
    </footer>
  );
}

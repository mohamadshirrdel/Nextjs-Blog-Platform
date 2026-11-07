"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result.error) {
        alert("خطا در ورود: " + result.error);
      } else {
        router.push("/profile");
        router.refresh();
      }
    } catch (err) {
      alert("خطا در ورود: " + result.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-[#141414] p-6 shadow-2xl shadow-black/20"
    >
      <div className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-zinc-300"
          >
            ایمیل
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="example@email.com"
            className="w-full rounded-lg border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-white/30 focus:ring-2 focus:ring-white/5"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-zinc-300"
          >
            رمز عبور
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="رمز عبور خود را وارد کنید"
            className="w-full rounded-lg border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-white/30 focus:ring-2 focus:ring-white/5"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
        >
          ورود
        </button>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-zinc-600">یا</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
      </div>

      <button
        onClick={() => signIn("google", { callbackUrl: "/profile" })}
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/5"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.805 12.23c0-.79-.07-1.55-.205-2.28H12v4.31h5.49a4.69 4.69 0 0 1-2.04 3.08v2.56h3.3c1.93-1.78 3.055-4.4 3.055-7.67Z"
            fill="#4285F4"
          />
          <path
            d="M12 22c2.76 0 5.08-.91 6.77-2.47l-3.3-2.56c-.91.61-2.07.98-3.47.98-2.67 0-4.94-1.8-5.75-4.22H2.84v2.64A10.23 10.23 0 0 0 12 22Z"
            fill="#34A853"
          />
          <path
            d="M6.25 13.73A6.15 6.15 0 0 1 5.93 12c0-.6.11-1.18.32-1.73V7.63H2.84A10.01 10.01 0 0 0 1.77 12c0 1.58.38 3.07 1.07 4.37l3.41-2.64Z"
            fill="#FBBC05"
          />
          <path
            d="M12 6.05c1.5 0 2.84.52 3.9 1.54l2.92-2.92C17.08 2.99 14.76 2 12 2a10.23 10.23 0 0 0-9.16 5.63l3.41 2.64C7.06 7.85 9.33 6.05 12 6.05Z"
            fill="#EA4335"
          />
        </svg>
        ورود با حساب گوگل
      </button>

      <button
        onClick={() => signIn("github", { callbackUrl: "/profile" })}
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-[#24292f] mt-4 px-4 py-3 text-sm font-medium text-white transition hover:bg-[#30363d]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-current"
        >
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.3 9.41 7.88 10.94.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.69 1.26 3.35.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18A11.1 11.1 0 0 1 12 8.13c.98 0 1.96.13 2.88.38 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.12 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.08.78 2.18v3.22c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>
        ورود با گیت‌هاب
      </button>

      <p className="mt-6 text-center text-sm text-zinc-500">
        حساب کاربری ندارید؟{" "}
        <a
          href="/register"
          className="font-medium text-zinc-200 transition hover:text-white hover:underline"
        >
          ثبت‌نام کنید
        </a>
      </p>
    </form>
  );
};

export default LoginForm;

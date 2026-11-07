"use client";

import { register } from "@/app/actions/auth";
import Link from "next/link";
import { useActionState, useEffect } from "react";

const initialState = {
  message: "",
  errors: {},
  success: false,
};

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(register, initialState);

  console.log(state);

  useEffect(() => {
    if (state.success) {
      return alert(state.message);
    }

    // :))
  }, [state]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 p-6 shadow-2xl shadow-black/20 sm:p-8">
      <form action={formAction} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-zinc-300"
          >
            نام و نام خانوادگی
          </label>

          <input
            id="name"
            name="name"
            type="text"
            defaultValue={state?.values?.name}
            placeholder="مثلاً محمد امین"
            required
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
          />
        </div>

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
            // dir="ltr"
            defaultValue={state?.values?.email}
            placeholder="you@example.com"
            required
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-left text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
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
            placeholder="حداقل ۶ کاراکتر"
            minLength={6}
            required
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-zinc-300"
          >
            تایید رمز عبور
          </label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="حداقل ۶ کاراکتر"
            minLength={6}
            required
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-violet-600 py-3 text-sm font-bold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "در حال ساخت حساب..." : "ساخت حساب"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500">
        قبلاً ثبت‌نام کرده‌ای؟
        <Link
          href="/login"
          className="mr-1.5 font-semibold text-violet-400 transition hover:text-violet-300"
        >
          وارد شو
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;

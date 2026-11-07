import LoginForm from "@/app/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-144px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            ورود به حساب کاربری
          </h1>

          <p className="mt-3 text-sm text-zinc-500">
            برای ادامه وارد حساب خود شوید
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}

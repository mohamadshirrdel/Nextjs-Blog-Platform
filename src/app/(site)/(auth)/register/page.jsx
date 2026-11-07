import RegisterForm from "@/app/components/auth/RegisterForm";

const page = () => {
  return (
    <main className="flex min-h-[calc(100vh-144px)] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-xl font-black text-violet-400 ring-1 ring-violet-500/20">
            د
          </div>

          <h1 className="text-2xl font-black tracking-tight">
            ساخت حساب کاربری
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            برای شروع، اطلاعات خودت را وارد کن.
          </p>
        </div>

        <RegisterForm />
      </div>
    </main>
  );
};

export default page;

import { getDashboardStats } from "../libs/data/dashboard";

const page = async () => {
  const stats = await getDashboardStats();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">داشبورد</h1>

        <p className="mt-2 text-sm text-slate-400">نمای کلی وضعیت پلتفرم</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-slate-950 p-6">
          <p className="text-sm text-slate-400">کل کاربران</p>

          <p className="mt-3 text-3xl font-bold text-white">
            {stats.users.total}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-950 p-6">
          <p className="text-sm text-slate-400">کل پست‌ها</p>

          <p className="mt-3 text-3xl font-bold text-white">
            {stats.posts.total}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-950 p-6">
          <p className="text-sm text-slate-400">پست‌های منتشرشده</p>

          <p className="mt-3 text-3xl font-bold text-green-400">
            {stats.posts.published}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-950 p-6">
          <p className="text-sm text-slate-400">پیش‌نویس‌ها</p>

          <p className="mt-3 text-3xl font-bold text-yellow-400">
            {stats.posts.drafts}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-slate-950 p-6">
          <h2 className="text-lg font-semibold">کاربران</h2>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white/5 p-4">
              <p className="text-sm text-slate-400">کاربران عادی</p>

              <p className="mt-2 text-2xl font-bold">{stats.users.regular} </p>
            </div>

            <div className="rounded-lg bg-white/5 p-4">
              <p className="text-sm text-slate-400">ادمین‌ها</p>

              <p className="mt-2 text-2xl font-bold">{stats.users.admins}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-950 p-6">
          <h2 className="text-lg font-semibold">پست‌ها</h2>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white/5 p-4">
              <p className="text-sm text-slate-400">منتشرشده</p>

              <p className="mt-2 text-2xl font-bold text-green-400">
                {stats.posts.published}
              </p>
            </div>

            <div className="rounded-lg bg-white/5 p-4">
              <p className="text-sm text-slate-400">پیش‌نویس</p>

              <p className="mt-2 text-2xl font-bold text-yellow-400">
                {stats.posts.drafts}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

import Sidebar from "../components/admin/Sidebar";
import { requireAdmin } from "../libs/utils/auth";

const layout = async ({ children }) => {
  await requireAdmin();

  return (
    <div dir="rtl" className="min-h-screen bg-slate-900 text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-7xl p-6 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default layout;

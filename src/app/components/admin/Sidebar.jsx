"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "داشبورد",
    href: "/admin",
    icon: "▦",
  },
  {
    title: "پست‌ها",
    href: "/admin/posts",
    icon: "▤",
  },
  {
    title: "کاربران",
    href: "/admin/users",
    icon: "♙",
  },
  {
    title: "دسته‌بندی‌ها",
    href: "/admin/categories",
    icon: "◈",
  },
  {
    title: "نظرات",
    href: "/admin/comments",
    icon: "◌",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-l border-white/10 bg-slate-950 md:block">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="flex h-20 items-center border-b border-white/10 px-6">
          <Link href="/admin" className="text-xl font-bold text-white">
            نکست بلاگ
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          <p className="mb-3 px-3 text-xs font-medium text-slate-500">مدیریت</p>

          {menuItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                href={item.href}
                key={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex h-6 w-6 items-center justify-center text-base">
                  {item.icon}
                </span>

                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <span>←</span>
            <span>بازگشت به سایت</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

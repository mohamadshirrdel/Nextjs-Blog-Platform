import Link from "next/link";

const links = [
  {
    id: 1,
    href: "/profile",
    label: "اطلاعات حساب",
  },
  {
    id: 2,
    href: "/profile/posts",
    label: "مقالات من",
  },
  {
    id: 3,
    href: "/profile/posts/new",
    label: "ایجاد مقاله",
  },
];

const ProfileNavbar = () => {
  return (
    <nav className="mb-10 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className="rounded-lg px-4 py-2 text-sm transition"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default ProfileNavbar;

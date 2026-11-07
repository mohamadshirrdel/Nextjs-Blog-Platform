import ProfileNavbar from "@/app/components/profile/ProfileNavbar";

const layout = ({ children }) => {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <ProfileNavbar />

        {children}
      </div>
    </main>
  );
};

export default layout;

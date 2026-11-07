import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { getCategories } from "../libs/data/category";

const layout = async ({ children }) => {
  const categories = await getCategories();

  return (
    <>
      <div className="relative z-50">
        <Navbar categories={categories} />
      </div>

      {children}

      <Footer />
    </>
  );
};

export default layout;

import Categories from "@/app/components/admin/category/Categories";
import CreateCategoryForm from "@/app/components/admin/category/CreateCategoryForm";
import { getCategories } from "@/app/libs/data/category";

const page = async () => {
  const categories = await getCategories();

  const parentCategories = categories.filter((category) => !category.parent);
  const subCategories = categories.filter((category) => category.parent);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">دسته‌بندی‌ها</h1>

        <p className="mt-2 text-sm text-slate-400">
          مدیریت دسته‌بندی‌ها و زیردسته‌های پلتفرم
        </p>
      </div>

      <div className="mb-8 rounded-xl border border-white/10 bg-slate-950 p-6">
        <h2 className="text-lg font-semibold">ایجاد دسته‌بندی</h2>

        <CreateCategoryForm parentCategories={parentCategories} />

        <Categories
          parentCategories={parentCategories}
          subCategories={subCategories}
        />
      </div>
    </div>
  );
};

export default page;

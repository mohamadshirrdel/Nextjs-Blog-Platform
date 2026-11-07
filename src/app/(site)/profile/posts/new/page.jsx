import CreatePostForm from "@/app/components/profile/CreatePostForm";
import { getCategories } from "@/app/libs/data/category";

const page = async () => {
  const categories = await getCategories();

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-medium text-violet-400">مقالات</p>

        <h1 className="mt-2 text-3xl font-black tracking-tight">
          ایجاد مقاله جدید
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          یک مقاله جدید بنویس و آن را به‌عنوان پیش‌نویس ذخیره یا منتشر کن.
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <div className="px-6 py-8 sm:px-8">
          <CreatePostForm categories={categories} />
        </div>
      </section>
    </div>
  );
};

export default page;

"use client";

import { createPost } from "@/app/actions/post";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePostForm = ({ categories = [] }) => {
  const router = useRouter();

  const [post, setPost] = useState({
    title: "",
    content: "",
    status: "draft",
    category: "",
    subCategory: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) =>
    setPost((post) => ({ ...post, [key]: value }));

  const parentCategories = categories.filter((category) => !category.parent);

  const subCategories = categories.filter(
    (category) => category.parent === post.category,
  );

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);

      const selectedCategory = post.subCategory || post.category;

      // Validation

      const result = await createPost({
        title: post.title,
        content: post.content,
        status: post.status,
        category: selectedCategory,
      });

      if (!result.success) {
        throw new Error(result.message);
      }

      alert(result.message);

      router.push("/profile/posts");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-zinc-300"
        >
          عنوان مقاله
        </label>

        <input
          id="title"
          type="text"
          value={post.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="مثلاً آشنایی با Server Components"
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-violet-500/50"
          required
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="mb-2 block text-sm font-medium text-zinc-300"
        >
          محتوای مقاله
        </label>

        <textarea
          id="content"
          placeholder="محتوای مقاله را بنویس..."
          value={post.content}
          onChange={(e) => handleChange("content", e.target.value)}
          rows="{12}"
          className="w-full resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-zinc-700 focus:border-violet-500/50"
          required
        />
      </div>

      <div>
        <label
          htmlFor="parent-category"
          className="mb-2 block text-sm font-medium text-zinc-300"
        >
          دسته‌بندی
        </label>

        <select
          id="parent-category"
          value={post.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#18181b] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500/50"
          required
        >
          <option value="">انتخاب دسته‌بندی</option>

          {parentCategories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      {post.category && subCategories.length > 0 && (
        <div>
          <label
            htmlFor="sub-category"
            className="mb-2 block text-sm font-medium text-zinc-300"
          >
            زیر‌دسته
          </label>

          <select
            id="sub-category"
            value={post.subCategory}
            onChange={(e) => handleChange("subCategory", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#18181b] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500/50"
          >
            <option value="">بدون زیر‌دسته</option>
            {subCategories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <p className="mb-3 text-sm font-medium text-zinc-300">وضعیت مقاله</p>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="cursor-pointer">
            <input
              type="radio"
              name="status"
              value="draft"
              onChange={(e) => handleChange("status", e.target.value)}
              className="peer sr-only"
            />

            <div className="rounded-xl border border-white/10 bg-black/20 p-4 transition peer-checked:border-violet-500/50 peer-checked:bg-violet-500/10">
              <p className="text-sm font-semibold text-white">پیش‌نویس</p>

              <p className="mt-1 text-xs leading-6 text-zinc-500">
                مقاله منتشر نمی‌شود و فقط خودت آن را می‌بینی.
              </p>
            </div>
          </label>

          <label className="cursor-pointer">
            <input
              type="radio"
              name="status"
              value="published"
              onChange={(e) => handleChange("status", e.target.value)}
              className="peer sr-only"
            />

            <div className="rounded-xl border border-white/10 bg-black/20 p-4 transition peer-checked:border-violet-500/50 peer-checked:bg-violet-500/10">
              <p className="text-sm font-semibold text-white">انتشار</p>

              <p className="mt-1 text-xs leading-6 text-zinc-500">
                مقاله بلافاصله در وبلاگ منتشر می‌شود.
              </p>
            </div>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "در حال ایجاد ..." : "ایجاد پست"}
      </button>
    </form>
  );
};

export default CreatePostForm;

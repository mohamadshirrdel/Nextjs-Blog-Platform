"use client";

import { createCategory } from "@/app/actions/category";
import { useActionState } from "react";

const CreateCategoryForm = ({ parentCategories }) => {
  const [state, formAction, isPending] = useActionState(createCategory, {
    message: "",
    success: false,
  });

  return (
    <form action={formAction} className="mt-6 grid gap-4 md:grid-cols-3">
      <div>
        <label className="mb-2 block text-sm text-slate-300">نام</label>

        <input
          type="text"
          name="title"
          defaultValue={state?.values?.title}
          placeholder="مثلاً JavaScript"
          required
          className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-white/30"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">Slug</label>

        <input
          type="text"
          name="slug"
          defaultValue={state?.values?.slug}
          placeholder="javascript"
          required
          className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-white/30"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">دسته والد</label>

        <select
          name="parent"
          className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-white/30"
          defaultValue=""
        >
          <option value="">دسته اصلی</option>

          {parentCategories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
        >
          {isPending ? "در حال ایجاد" : "ایجاد دسته‌بندی"}
        </button>
      </div>
    </form>
  );
};

export default CreateCategoryForm;

import {
  getCategoryBySlug,
  getSubCategoryBySlug,
} from "@/app/libs/data/category";
import { getPostsByCategory } from "@/app/libs/data/post";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }) => {
  const { categorySlug, subCategorySlug } = await params;

  const parentCategory = await getCategoryBySlug(categorySlug);

  if (!parentCategory) {
    notFound();
  }

  const childCategory = await getSubCategoryBySlug(
    subCategorySlug,
    parentCategory.id,
  );

  if (!childCategory) {
    notFound();
  }

  const posts = await getPostsByCategory(childCategory.id);

  console.log(posts);

  return (
    <main dir="rtl" className="min-h-screen bg-[#09090b] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-center gap-2 text-sm text-zinc-500">
          <Link
            href={`/category/${parentCategory.slug}`}
            className="transition hover:text-white"
          >
            {parentCategory.title}
          </Link>

          <span>/</span>

          <span className="text-zinc-300">{childCategory.title}</span>
        </div>

        <div className="mb-12">
          <span className="text-sm text-violet-400">زیر‌دسته</span>

          <h1 className="mt-3 text-3xl font-black">{childCategory.title}</h1>

          <p className="mt-3 text-sm text-zinc-500">
            مطالب مرتبط با {childCategory.title}
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/2 p-10 text-center">
            <p className="text-zinc-500">
              هنوز مطلبی در این زیر‌دسته منتشر نشده است.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group rounded-2xl border border-white/10 bg-white/2 p-6 transition hover:border-violet-500/30 hover:bg-white/4"
              >
                <h2 className="line-clamp-2 text-lg font-bold transition group-hover:text-violet-400">
                  {post.title}
                </h2>

                <p className="mt-3 line-clamp-3 text-sm leading-7 text-zinc-500">
                  {post.content}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default page;

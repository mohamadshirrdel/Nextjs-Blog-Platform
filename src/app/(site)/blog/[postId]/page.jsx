import CommentsSection from "@/app/components/blog/CommentsSection";
import { getPostById } from "@/app/libs/data/post";
import Link from "next/link";
import React from "react";

const page = async ({ params }) => {
  const { postId } = await params;

  const post = await getPostById(postId);

  const categoryHref = post.category.parent
    ? `/category/${post.category.parent.slug}/${post.category.slug}`
    : `/category/${post.category.slug}`;

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <header className="mb-10">
        <p className="text-sm font-medium text-violet-400">مقاله</p>

        <div className="mt-4">
          <Link
            href={categoryHref}
            className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-400 transition hover:border-violet-500/40 hover:bg-violet-500/15 hover:text-violet-300"
          >
            {post.category.title}
          </Link>
        </div>

        <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-5 flex items-center gap-4 text-sm text-zinc-500">
          <span>{post.author.name}</span>

          <span className="h-1 w-1 rounded-full bg-zinc-700" />

          <time>
            {" "}
            {new Date(post.publishedAt).toLocaleDateString("fa-IR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
          </time>
        </div>
      </header>

      <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
        <div className="whitespace-pre-wrap text-sm leading-8 text-zinc-300 sm:text-base sm:leading-9">
          {post.content}
        </div>
      </article>

      <CommentsSection postId={postId} />
    </main>
  );
};

export default page;

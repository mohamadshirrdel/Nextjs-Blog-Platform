import BookmarkButton from "@/app/components/blog/BookmarkButton";
import { getPublishedPosts } from "@/app/libs/data/post";
import Link from "next/link";

const page = async () => {
  const posts = await getPublishedPosts();

  console.log(posts);

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12">
        <p className="text-sm font-medium text-violet-400">وبلاگ</p>

        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          آخرین نوشته‌ها
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500">
          تجربه‌ها، آموزش‌ها و مطالبی درباره دنیای برنامه‌نویسی و توسعه وب.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/2 px-6 py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-3xl">
            ✍️
          </div>

          <h2 className="mt-6 text-lg font-bold text-white">
            هنوز مطلبی منتشر نشده
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            به‌زودی اولین نوشته‌ها در وبلاگ منتشر می‌شوند.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const categoryHref = post.category.parent
              ? `/category/${post.category.parent.slug}/${post.category.slug}`
              : `/category/${post.category.slug}`;

            return (
              <article
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/3 transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-white/5"
              >
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      href={categoryHref}
                      className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400 transition hover:border-violet-500/40 hover:bg-violet-500/15 hover:text-violet-300"
                    >
                      {post.category.title}
                    </Link>

                    <p className="text-xs text-zinc-600">
                      {new Date(post.publishedAt).toLocaleDateString("fa-IR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>

                    <BookmarkButton postId={post.id.toString()} />
                  </div>

                  <h2 className="mt-4 text-xl font-bold leading-8 text-white transition group-hover:text-violet-400">
                    {post.title}
                  </h2>

                  <p className="mb-3 mt-3 line-clamp-3 text-sm leading-7 text-zinc-500">
                    {post.content}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-xs text-zinc-500">
                      {post.author.name}
                    </span>

                    <Link
                      href={`/blog/${post.id}`}
                      className="text-sm font-semibold text-violet-400 transition hover:text-violet-300"
                    >
                      مطالعه پست
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default page;

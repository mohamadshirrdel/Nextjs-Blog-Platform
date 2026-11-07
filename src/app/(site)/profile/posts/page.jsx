import DeletePostButton from "@/app/components/profile/DeletePostButton";
import { getUserPosts } from "@/app/libs/data/post";
import Link from "next/link";

const page = async () => {
  const posts = await getUserPosts();

  console.log(posts);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-violet-400">مقالات</p>

          <h1 className="mt-2 text-3xl font-black tracking-tight">مقالات من</h1>

          <p className="mt-2 text-sm text-zinc-500">
            تمام مقالاتی که ایجاد کرده‌ای را اینجا مدیریت کن.
          </p>
        </div>

        <Link
          href="/profile/posts/new"
          className="w-fit rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-500"
        >
          ایجاد مقاله جدید
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-3xl">
            ✍️
          </div>

          <h2 className="mt-6 text-lg font-bold text-white">
            هنوز مقاله‌ای نداری
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            اولین مقاله خودت را ایجاد کن.
          </p>

          <Link
            href="/profile/posts/new"
            className="mt-6 inline-flex rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-500"
          >
            ایجاد مقاله
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-bold text-white">
                      {post.title}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        post.status === "published"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {post.status === "published" ? "منتشر شده" : "پیش‌نویس"}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm leading-7 text-zinc-500">
                    {post.content}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-zinc-600">
                    <span>
                      ایجاد شده در{" "}
                      {new Date(post.createdAt).toLocaleDateString("fa-IR")}
                    </span>

                    {post.publishedAt && (
                      <span>
                        منتشر شده در{" "}
                        {new Date(post.publishedAt).toLocaleDateString("fa-IR")}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-4">
                  <Link
                    href={`/profile/posts/${post.id}/edit`}
                    className="text-sm font-semibold text-zinc-400 transition hover:text-white"
                  >
                    ویرایش
                  </Link>

                  <DeletePostButton postId={post.id} />

                  {post.status === "published" && (
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-sm font-semibold text-violet-400 transition hover:text-violet-300"
                    >
                      مشاهده مقاله
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;

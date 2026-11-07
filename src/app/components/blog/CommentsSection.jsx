import React from "react";
import CommentFrom from "./CommentFrom";
import { getCommentByPostId } from "@/app/libs/data/comment";

const CommentsSection = async ({ postId }) => {
  const comments = await getCommentByPostId(postId);

  console.log(comments);

  return (
    <section className="mt-12">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          نظرات
          <span className="mr-2 text-sm font-normal text-zinc-500"> </span>
        </h2>
      </div>

      {comments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/2 px-6 py-10 text-center">
          <p className="text-sm text-zinc-500">
            هنوز نظری برای این مقاله ثبت نشده است.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <article
              key={comment.id}
              className="rounded-2xl border border-white/10 bg-white/3 p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-white">
                  {comment.author.name}
                </p>

                <time className="text-xs text-zinc-600">
                  {new Date(comment.createdAt).toLocaleDateString("fa-IR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                </time>
              </div>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-zinc-400">
                {comment.content}
              </p>
            </article>
          ))}
        </div>
      )}

      <CommentFrom postId={postId} />
    </section>
  );
};

export default CommentsSection;

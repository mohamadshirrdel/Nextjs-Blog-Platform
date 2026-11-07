"use client";

import { createComment } from "@/app/actions/comment";
import React, { useActionState } from "react";

const CommentFrom = ({ postId }) => {
  const [state, formAction, isPending] = useActionState(createComment, {
    success: false,
    message: "",
  });

  return (
    <form
      action={formAction}
      className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
    >
      <input type="hidden" name="postId" value={postId} />

      <div>
        <label
          htmlFor="comment"
          className="mb-2 block text-sm font-medium text-zinc-300"
        >
          نظر شما
        </label>

        <textarea
          id="comment"
          name="content"
          placeholder="نظرتان درباره این مقاله چیست؟"
          rows="5"
          maxLength="1000"
          className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
        />
      </div>

      {state.message && (
        <p
          className={`mt-4 rounded-xl px-4 py-3 text-sm ${
            state.success
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {state.message}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "در حال ارسال ..." : "ارسال نظر"}
        </button>
      </div>
    </form>
  );
};

export default CommentFrom;

"use client";

import { deletePost } from "@/app/actions/post";
import { useActionState } from "react";

const DeletePostButton = ({ postId }) => {
  const [state, formAction, isPending] = useActionState(deletePost, {
    success: false,
    message: "",
  });

  return (
    <form action={formAction}>
      <input type="hidden" name="postId" value={postId} />

      <button
        type="submit"
        disabled={isPending}
        className="text-sm font-semibold text-red-400 transition hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "در حال حذف ..." : "حذف"}
      </button>
    </form>
  );
};

export default DeletePostButton;

"use client";

import { deletePost } from "@/app/actions/post";
import React, { useActionState } from "react";

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
        className="text-sm text-red-400 transition hover:text-red-300"
      >
        {isPending ? "در حال حذف ..." : "حذف"}
      </button>
    </form>
  );
};

export default DeletePostButton;

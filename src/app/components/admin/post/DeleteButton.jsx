"use client";

import { deletePost } from "@/app/actions/post";
import React, { useActionState } from "react";

const DeleteButton = ({ postId }) => {
  const [state, formAction, isPending] = useActionState(deletePost, {
    success: false,
    message: "",
  });

  return (
    <form action={deletePost}>
      <input type="hidden" name="postId" value={postId} />
      <button
        type="submit"
        className="text-sm text-red-400 transition hover:text-red-300"
      >
        {isPending ? "در حال حذف ..." : "حذف"}
      </button>
    </form>
  );
};

export default DeleteButton;

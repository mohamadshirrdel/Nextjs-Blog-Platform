"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { connectToDB } from "../libs/db";
import Post from "../libs/models/Post";
import Comment from "../libs/models/Comment";
import User from "../libs/models/User";
import { requireAdmin } from "../libs/utils/auth";
import { revalidatePath } from "next/cache";

export const createComment = async (state, formData) => {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  const postId = formData.get("postId");
  const content = formData.get("content");

  if (!postId || content.trim().length < 10) {
    return {
      success: false,
      message: "اطلاعات ارسالی کافی نمی‌باشند",
    };
  }

  try {
    await connectToDB();

    const post = await Post.findOne({
      _id: postId,
      status: "published",
    });

    if (!post) {
      return {
        success: false,
        message: "پست یافت نشد",
      };
    }

    // کامنت ادمین مستقیم منتشر می‌شود؛ بقیه بعد از تایید ادمین
    const currentUser = await User.findById(session.user.id)
      .select("role")
      .lean();

    const isAdmin = currentUser?.role === "admin";

    await Comment.create({
      content: content.trim(),
      post: postId,
      author: session.user.id,
      status: isAdmin ? "approved" : "pending",
    });

    revalidatePath(`/blog/${postId}`);
    revalidatePath("/admin/comments");

    return {
      success: true,
      message: isAdmin
        ? "کامنت با موفقیت ثبت شد"
        : "نظر شما ثبت شد و بعد از تایید ادمین زیر پست نمایش داده می‌شود",
    };
  } catch (err) {
    console.log("Error In createComment action ->", err.message);

    return {
      success: false,
      message: "مشکلی در ثبت کامنت رخ داد",
    };
  }
};

const ALLOWED_STATUSES = ["pending", "approved", "rejected"];

export const updateCommentStatus = async (formData) => {
  await requireAdmin();

  const commentId = formData.get("commentId")?.toString();
  const status = formData.get("status")?.toString();

  if (!commentId || !ALLOWED_STATUSES.includes(status)) {
    return;
  }

  try {
    await connectToDB();

    const comment = await Comment.findByIdAndUpdate(commentId, {
      $set: { status },
    });

    revalidatePath("/admin/comments");

    if (comment) {
      revalidatePath(`/blog/${comment.post}`);
    }
  } catch (err) {
    console.log("Error In updateCommentStatus action ->", err.message);
  }
};

export const deleteComment = async (formData) => {
  await requireAdmin();

  const commentId = formData.get("commentId")?.toString();

  if (!commentId) {
    return;
  }

  try {
    await connectToDB();

    const comment = await Comment.findByIdAndDelete(commentId);

    revalidatePath("/admin/comments");

    if (comment) {
      revalidatePath(`/blog/${comment.post}`);
    }
  } catch (err) {
    console.log("Error In deleteComment action ->", err.message);
  }
};

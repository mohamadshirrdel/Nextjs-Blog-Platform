"use server";

import { connectToDB } from "../db";
import Comment from "../models/Comment";
import { requireAdmin } from "../utils/auth";

// کامنت‌هایی که فیلد status ندارند (قدیمی‌ها) هم نمایش داده می‌شوند
const PUBLIC_FILTER = { status: { $nin: ["pending", "rejected"] } };

export const getCommentByPostId = async (postId) => {
  try {
    await connectToDB();

    const comments = await Comment.find({
      post: postId,
      ...PUBLIC_FILTER,
    })
      .sort({
        createdAt: -1,
      })
      .populate("author", "name")
      .lean();

    return comments.map((comment) => ({
      id: comment._id.toString(),
      content: comment.content,
      author: {
        id: comment.author._id.toString(),
        name: comment.author.name,
      },

      createdAt: comment.createdAt,
    }));
  } catch (err) {
    console.log("Label ->", err);
  }
};

const ADMIN_FILTERS = {
  pending: { status: "pending" },
  approved: PUBLIC_FILTER,
  rejected: { status: "rejected" },
  all: {},
};

export const getAdminComments = async (status = "pending") => {
  await requireAdmin();

  await connectToDB();

  const filter = ADMIN_FILTERS[status] ?? ADMIN_FILTERS.pending;

  const comments = await Comment.find(filter)
    .sort({
      createdAt: -1,
    })
    .populate("author", "name email")
    .populate("post", "title")
    .lean();

  return comments.map((comment) => ({
    id: comment._id.toString(),
    content: comment.content,
    status: comment.status ?? "approved",
    author: {
      name: comment.author?.name ?? "کاربر حذف‌شده",
      email: comment.author?.email ?? "",
    },
    post: {
      id: comment.post?._id.toString() ?? null,
      title: comment.post?.title ?? "پست حذف شده",
    },
    createdAt: comment.createdAt,
  }));
};

export const getCommentCounts = async () => {
  await requireAdmin();

  await connectToDB();

  const [total, pending, rejected] = await Promise.all([
    Comment.countDocuments({}),
    Comment.countDocuments({ status: "pending" }),
    Comment.countDocuments({ status: "rejected" }),
  ]);

  return {
    all: total,
    pending,
    rejected,
    approved: total - pending - rejected,
  };
};

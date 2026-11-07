import { connectToDB } from "../db";
import Post from "../models/Post";
import User from "../models/User";
import { requireAdmin } from "../utils/auth";

export async function getDashboardStats() {
  await requireAdmin();

  await connectToDB();

  const [
    totalUsers,
    totalAdmins,
    totalPosts,
    totalPublishedPosts,
    totalDraftPosts,
  ] = await Promise.all([
    User.countDocuments(),

    User.countDocuments({
      role: "admin",
    }),

    Post.countDocuments(),

    Post.countDocuments({
      status: "published",
    }),

    Post.countDocuments({
      status: "draft",
    }),
  ]);

  return {
    users: {
      total: totalUsers,
      admins: totalAdmins,
      regular: totalUsers - totalAdmins,
    },

    posts: {
      total: totalPosts,
      published: totalPublishedPosts,
      drafts: totalDraftPosts,
    },
  };
}

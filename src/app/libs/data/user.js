"use server";

import { connectToDB } from "../db";
import User from "../models/User";
import { requireAdmin } from "../utils/auth";

export const getUsers = async () => {
  await requireAdmin();

  await connectToDB();

  const users = await User.find({})
    .select("-password")
    .sort({
      createdAt: -1,
    })
    .lean();

  return users.map((user) => ({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    isDeleted: user.isDeleted,
    deletedAt: user.deletedAt,
  }));
};

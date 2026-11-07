"use server"

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { connectToDB } from "../db";
import Post from "../models/Post";

export const getUserPosts = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const posts = await Post.find({
    author: session.user.id,
  }).sort({
    createdAt: -1,
  });

  return posts.map((post) => ({
    id: post._id.toString(),
    title: post.title,
    content: post.content,
    status: post.status,
    publishedAt: post.publishedAt,
    createdAt: post.createdAt,
  }));
};

export const getPublishedPosts = async () => {
  await connectToDB();

  const posts = await Post.find({
    status: "published",
  })
    .sort({
      publishedAt: -1,
    })
    .populate("author", "name")
    .populate({
      path: "category",
      select: "title slug parent",
      populate: {
        path: "parent",
        select: "title slug",
      },
    })
    .lean();

  return posts.map((post) => ({
    id: post._id.toString(),
    title: post.title,
    content: post.content,
    publishedAt: post.publishedAt,

    author: {
      id: post.author._id.toString(),
      name: post.author.name,
    },

    category: post.category,
  }));
};

export const getPostById = async (postId) => {
  const post = await Post.findOne({
    _id: postId,
    status: "published",
  })
    .populate("author", "name")
    .populate({
      path: "category",
      select: "title slug parent",
      populate: {
        path: "parent",
        select: "title slug",
      },
    })
    .lean();

  if (!post) {
    return null;
  }

  return {
    id: post._id.toString(),
    title: post.title,
    content: post.content,
    publishedAt: post.publishedAt,

    author: {
      id: post.author._id.toString(),
      name: post.author.name,
    },

    category: {
      id: post.category._id.toString(),
      title: post.category.title,
      slug: post.category.slug,
      parent: post.category.parent,
    },
  };
};

export const getPostsByCategory = async (categoryId) => {
  await connectToDB();

  const posts = await Post.find({
    category: categoryId,
    status: "published",
  })
    .sort({
      createdAt: -1,
    })
    .lean();

  return posts.map((post) => ({
    id: post._id.toString(),
    title: post.title,
    content: post.content,
  }));
};

export const getPosts = async () => {
  await connectToDB();

  const posts = await Post.find()
    .sort({
      createdAt: -1,
    })
    .populate("author", "name")
    .lean();

  return posts.map((post) => ({
    id: post._id.toString(),
    title: post.title,
    publishedAt: post.publishedAt,
    createdAt: post.createdAt,
    status: post.status,

    author: {
      id: post.author._id.toString(),
      name: post.author.name,
    },
  }));
};

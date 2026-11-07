"use server";

import { connectToDB } from "../db";
import Category from "../models/Category";

export const getCategories = async () => {
  await connectToDB();

  const categories = await Category.find();

  return categories.map((category) => ({
    id: category._id.toString(),
    title: category.title,
    slug: category.slug,
    parent: category.parent?.toString() || null,
  }));
};

export const getCategoryBySlug = async (slug) => {
  await connectToDB();

  const category = await Category.findOne({
    slug,
  }).lean();

  if (!category) {
    return null;
  }

  return {
    id: category._id.toString(),
    title: category.title,
    slug: category.slug,
    parent: category.parent?.toString() || null,
  };
};

export const getSubCategoryBySlug = async (slug, parentId) => {
  await connectToDB();

  const category = await Category.findOne({
    slug,
    parent: parentId,
  }).lean();

  if (!category) {
    return null;
  }

  return {
    id: category._id.toString(),
    title: category.title,
    slug: category.slug,
    parent: category.parent?.toString() || null,
  };
};

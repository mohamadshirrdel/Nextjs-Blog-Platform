import mongoose from "mongoose";
import Category from "./Category";
import User from "./User";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [8, "عنوان باید حداقل 8 کاراکتر باشد"],
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User.modelName,
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category.modelName,
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
    },

    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;

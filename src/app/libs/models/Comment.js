import mongoose from "mongoose";
import User from "./User";
import Post from "./Post";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: [8, "کامنت باید حداقل 8 کاراکتر باشد"],
      maxlength: [1000, "کامنت باید حداقل 1000 کاراکتر باشد"],
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User.modelName,
      required: true,
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Post.modelName,
      required: true,
    },

    // pending: در انتظار تایید | approved: منتشر شده | rejected: رد شده
    // کامنت‌های قدیمی فیلد status ندارند و به‌عنوان منتشرشده در نظر گرفته می‌شوند
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;

"use client";

import { updatePost } from "@/app/actions/post";
import { X } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

const initialState = { success: false, message: "" };

const inputClass =
  "w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none transition focus:border-blue-500 disabled:opacity-50";

function EditPostModal({ post, users, onClose }) {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const result = await updatePost(prevState, formData);

      if (result.success) {
        onClose();
      }

      return result;
    },
    initialState,
  );

  // بستن مودال با Esc
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape" && !isPending) {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isPending, onClose]);

  // اگر نویسنده فعلی توی لیست کاربران نبود (مثلاً حذف شده) باز هم نمایش داده بشه
  const authorOptions = users.some((user) => user.id === post.author.id)
    ? users
    : [{ id: post.author.id, name: post.author.name, email: "" }, ...users];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => !isPending && onClose()}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-post-title"
        className="relative w-full max-w-lg rounded-xl border border-white/10 bg-slate-900 p-6 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 id="edit-post-title" className="text-lg font-bold text-white">
            ویرایش پست
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            aria-label="بستن"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form action={formAction} className="space-y-5">
          <input type="hidden" name="postId" value={post.id} />

          <div>
            <label
              htmlFor="edit-title"
              className="mb-2 block text-sm text-slate-300"
            >
              عنوان
            </label>

            <input
              id="edit-title"
              name="title"
              type="text"
              defaultValue={post.title}
              disabled={isPending}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="edit-author"
              className="mb-2 block text-sm text-slate-300"
            >
              نویسنده
            </label>

            <select
              id="edit-author"
              name="author"
              defaultValue={post.author.id}
              disabled={isPending}
              className={inputClass}
            >
              {authorOptions.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name || user.email}
                  {user.name && user.email ? ` (${user.email})` : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="edit-status"
              className="mb-2 block text-sm text-slate-300"
            >
              وضعیت
            </label>

            <select
              id="edit-status"
              name="status"
              defaultValue={post.status}
              disabled={isPending}
              className={inputClass}
            >
              <option value="published">منتشر شده</option>
              <option value="draft">پیش‌نویس</option>
            </select>
          </div>

          {state.message && !state.success && (
            <p className="rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
              {state.message}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="rounded-lg px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 disabled:opacity-50"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
            >
              {isPending ? "در حال ذخیره ..." : "ذخیره تغییرات"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const EditPostButton = ({ post, users }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm text-blue-400 transition hover:text-blue-300"
      >
        ویرایش
      </button>

      {/* مودال فقط وقتی باز است mount می‌شود؛ پس با هر بار باز شدن فرم و خطاها ریست می‌شوند */}
      {open && (
        <EditPostModal
          post={post}
          users={users}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default EditPostButton;

import { ImageResponse } from "next/og";
import { async } from "./../../../libs/db";
import { getPostById } from "@/app/libs/data/post";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Test Alt";
export const runtime = "nodejs";
export const contentType = "image/png";

export default async function Image({ params }) {
  const { PostId } = await params;

  const post = await getPostById(PostId);

  const size = {
    with: 1200,
    height: 630,
  };

  const fontData = await readFile(
    join(process.cwd(), "public/fonts/IRANSans.ttf"),
  );

  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: "linear-gradient(to bottom, #000, #1a1a1a)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "80px",
      }}
    >
      <h1 style={{ fontSize: 72, fontWeight: "bold", textAlign: "center" }}>
        {post.title}
      </h1>
      <p style={{ fontSize: 36, marginTop: 20, opacity: 0.8 }}>
        {post.author.name}
        {new Date(post.publishedAt).toLocaleDateString("fa-IR")}
      </p>
    </div>,
    {
      ...size,
      fonts: [
        { name: "IranSans", data: fontData, style: "normal", weight: 400 },
      ],
    },
  );
}

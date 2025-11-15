import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const s3 = new S3Client({
    region: "ap-northeast-2",
    credentials: {
      accessKeyId: process.env.ACCESS_KEY!,
      secretAccessKey: process.env.SECRET_KEY!,
    },
  });

  const file = req.query.file as string;

  // ✔ Content-Type 조건 제거
  // ✔ Fields에서 Content-Type 제거
  // ✔ Key만 사용
  const { url, fields } = await createPresignedPost(s3, {
    Bucket: process.env.BUCKET_NAME!,
    Key: file,
    Conditions: [
      ["content-length-range", 0, 10485760], // 10MB
      ["starts-with", "$Content-Type", ""],
    ],
    Expires: 60,
  });

  console.log("S3 presigned URL =>", { url, fields });

  res.status(200).json({ url, fields });
}

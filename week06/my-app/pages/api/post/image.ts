import type { NextApiRequest, NextApiResponse } from "next";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { filename, fileType } = req.body;

    const client = new S3Client({
      region: "ap-northeast-2",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!,
      },
    });

    const key = `uploads/${filename}`;

    const { url, fields } = await createPresignedPost(client, {
      Bucket: "seminar-test-s3",
      Key: key,
      Fields: {
        key,
        "Content-Type": fileType,
      },
      Conditions: [["starts-with", "$Content-Type", ""]],
      Expires: 60,
    });

    return res.status(200).json({ url, fields });
  } catch (err: any) {
    console.error("S3 Presigned Error:", err);
    return res.status(500).json({
      error: "S3 Presigned Failed",
      details: err.message,
    });
  }
}

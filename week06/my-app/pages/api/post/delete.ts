import { connectDB } from '@/utils/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == 'DELETE') {
        let session = await getServerSession(req, res, authOptions);
        
        if (!session) {
            return res.status(401).json({ error: "로그인이 필요합니다." });
        }

        try {
            const db = (await connectDB).db('forum');
            
            // 삭제할 게시글 정보 가져오기
            const post = await db
                .collection('post')
                .findOne({ _id: new ObjectId(req.body) });
            
            if (!post) {
                return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
            }

            // 유저 권한 확인
            const userCollection = db.collection('user_cred');
            const user = await userCollection.findOne({ email: session.user?.email });
            const isAdmin = user?.role === 'admin';
            const isAuthor = post.author === session.user?.email;

            if (!isAdmin && !isAuthor) {
                return res.status(403).json({ error: "삭제 권한이 없습니다." });
            }

            const result = await db
                .collection('post')
                .deleteOne({ _id: new ObjectId(req.body) });
            
            return res.status(200).json({ message: '삭제 완료' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "서버 에러가 발생했습니다." });
        }
    }
    
    return res.status(405).json({ error: "Method not allowed" });
}
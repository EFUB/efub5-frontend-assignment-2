import { connectDB } from '@/utils/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == 'DELETE') {
        try {
            const db = (await connectDB).db('forum');
            const result = await db
                .collection('post')
                .deleteOne({ _id: new ObjectId(req.body) });
            res.status(200).json('삭제 완료');
        } catch (error) {
            res.status(500);
        }
    }
}
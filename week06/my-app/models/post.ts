interface Post {
    _id?: string;
    title: string;
    content: string;
    author?: string;
    imgUrl: string | null;
    likes?: string[]; // 좋아요를 누른 사용자 이메일 배열
    likeCount?: number; // 좋아요 수
    comments?: Comment[]; // 댓글 배열
    createdAt?: Date;
}

interface Comment {
    _id?: string;
    content: string;
    author: string;
    createdAt: Date;
}

export default Post;
export type { Comment };
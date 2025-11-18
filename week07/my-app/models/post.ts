interface Post {
  title: string;
  content: string;
  author?: string | null;
  likes?: string[];
  createdAt?: Date;
}

export default Post;

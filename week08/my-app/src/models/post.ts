interface Post {
  title: string;
  content: string;
  likes?: string[];
  imgUrl: string | null;
}

export default Post;
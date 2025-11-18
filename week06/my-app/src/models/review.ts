import { ObjectId } from "mongodb";

interface Review {
  _id?: ObjectId;
  post_id: ObjectId;
  content: string;
  author: string;
}

export default Review;
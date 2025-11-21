import type Review from "@/models/review";

export default async function ReviewItem ({ result }: { result: Review[] }) {
  return (
    <div className='list-bg'>
      {result.map((review, i) => (
        <div className='list-item' key={i}>
          <p className='list-item-content' key={i}>
            {review.content}
          </p>
        </div>
      ))}
    </div>
  );
}
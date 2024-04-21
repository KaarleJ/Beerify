import Review from './Review';
import { Review as ReviewType } from '@/types';


type ReviewsProps = {
  reviews: ReviewType[];
  className?: string;
};

const Reviews = ({ reviews, className }: ReviewsProps) => {
  return (
    <ul className={`p-5 ${className}`}>
      {reviews.map(review => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  );
};

export default Reviews;

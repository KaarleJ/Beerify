import { Review as ReviewType } from '@/types';

type ReviewProps = {
  review: ReviewType;
};

const Review = ({ review }: ReviewProps) => {
  return (
    <li>
      <strong>{review.beerName}</strong>
      <p>Rating: {review.rating}</p>
      <p>{review.text}</p>
    </li>
  );
};

export default Review;

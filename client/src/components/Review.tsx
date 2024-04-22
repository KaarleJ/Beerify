import { Review as ReviewType } from '@/types';

type ReviewProps = {
  review: ReviewType;
};

const Review = ({ review }: ReviewProps) => {
  return (
    <li>
      <h2>{review.beerName}</h2>
      <p>Rating: {review.rating}</p>
      <p>{review.text}</p>
    </li>
  );
};

export default Review;

import React from 'react';
import Review from './Review';


type Review = {
  id: number;
  rating: number;
  text: string;
  beerName: string;
}

type ReviewsProps = {
  reviews: {
    id: number;
    rating: number;
    text: string;
    beerName: string;
  }[];
};

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <ul>
      {reviews.map(review => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  );
};

export default Reviews;

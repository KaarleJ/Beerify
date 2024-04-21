import React from 'react';

type ReviewProps = {
  review: {
    id: number;
    rating: number;
    text: string;
    beerName: string;
  };
};

const Review: React.FC<ReviewProps> = ({ review, }) => {
  return (
    <li>
      <strong>{review.beerName}</strong>
      <p>Rating: {review.rating}</p>
      <p>{review.text}</p>
    </li>
  );
};

export default Review;

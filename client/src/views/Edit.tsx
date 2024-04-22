import React, { useState } from 'react';
import UpdateReviewForm from '../components/UpdateReviewForm';
import { updateReview } from '@/services/reviewService';

const Edit: React.FC = () => {
  const [rating, setRating] = useState<number>(1);
  const [newText, setText] = useState<string>('');
  const [newBeerName, setBeerName] = useState<string>('');
  const [reviewId, setReviewId] = useState<string>('');


  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value);
    if (value > 5) {
      value = 5;
    }
    setRating(value);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleBeerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBeerName(event.target.value);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewId(event.target.value);
  };

  const update = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    setRating(1);
    setText('');
    setBeerName('');
    setReviewId('');

    const reviewObject = {
      rating: rating,
      text: newText,
      beerName: newBeerName,
      id: Number(reviewId)
    };

    try {
      await updateReview(reviewObject);
      console.log('Review Updated succesfully');
    } catch (error) {
      console.error('Virhe arvostelun päivittämisessä:', error);
    }
  };

  return (
    <div className="text-ellipsis max-w-3xl">
      <h1>Edit a review</h1>
      <UpdateReviewForm
        addReview={update}
        rating={rating.toString()}
        handleRatingChange={handleRatingChange}
        newText={newText}
        handleTextChange={handleTextChange}
        newBeerName={newBeerName}
        handleBeerNameChange={handleBeerNameChange}
        id={reviewId}
        handleIdChange={handleIdChange}
      />
    </div>
  );
};

export default Edit;
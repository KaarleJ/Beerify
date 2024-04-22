import { useState } from 'react';
import { createReview } from '../services/reviewService';
import ReviewForm from '../components/ReviewForm';
import { RawReview } from '@/types';




const Create = () => {

  const [rating, setRating] = useState<number>(1);
  const [newText, setText] = useState<string>('');
  const [newBeerName, setBeerName] = useState<string>('');

  const addReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('addReview function called');

    if (!newText || !newBeerName) {
      console.error('Please enter text and beer name');
      return;
    }

    const reviewObject: RawReview = {
      rating: rating,
      text: newText,
      beerName: newBeerName,
    };

    try {
      await createReview(reviewObject);
      setRating(1);
      setText('');
      setBeerName('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };


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

  return (
    <div className="text-ellipsis max-w-3xl">
      <h1>Create a review</h1>
      <ReviewForm
        addReview={addReview}
        rating={rating.toString()}
        handleRatingChange={handleRatingChange}
        newText={newText}
        handleTextChange={handleTextChange}
        newBeerName={newBeerName}
        handleBeerNameChange={handleBeerNameChange}
      />
    </div>
  );
};

export default Create;

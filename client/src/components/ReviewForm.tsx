import React from 'react';

type ReviewFormProps = {
  addReview: (event: React.FormEvent<HTMLFormElement>) => void;
  rating: string;
  handleRatingChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newText: string;
  handleTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newBeerName: string;
  handleBeerNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ReviewForm: React.FC<ReviewFormProps> = ({ addReview, rating, handleRatingChange, newText, handleTextChange, newBeerName, handleBeerNameChange }) => {

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const enteredValue = parseInt(event.key, 10);
    if (enteredValue > 5 || isNaN(enteredValue)) {
      event.preventDefault();
    }
  };

  return (
    <form onSubmit={addReview} className="bg-orange-800 p-4 rounded-md">
      <div className="mb-4">
        Beer Name:
        <input
          value={newBeerName}
          onChange={handleBeerNameChange}
          className="bg-zinc-900 text-white p-2 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        Rating:
        <input
          value={rating}
          onChange={handleRatingChange}
          onKeyPress={handleKeyPress}
          type="number"
          min="1"
          max="5"
          className="bg-zinc-900 text-white p-2 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        Text:
        <textarea
          value={newText}
          onChange={handleTextChange as React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>}
          rows={4}
          className="bg-zinc-900 text-white p-2 rounded-md w-full resize-y"
          style={{ width: '100%', minWidth: '100%', maxWidth: '100%' }}
        />
      </div>
      <div>
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Add Review
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
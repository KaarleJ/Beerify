import { useEffect, useState } from 'react';
import Reviews from '../components/Reviews/Reviews';
import reviewService from '../services/reviewService';

type Review = {
  id: number;
  rating: number;
  text: string;
  beerName: string;
}

const ReviewsView: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const initialReviews = await reviewService.getAll();
        setReviews(initialReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);


  return (
    <div className="text-ellipsis max-w-3xl">
      <h1>Beer Reviews</h1>
      <Reviews reviews={reviews}/>
    </div>
  );
};

export default ReviewsView;

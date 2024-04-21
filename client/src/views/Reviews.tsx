import { useEffect, useState } from 'react';
import Reviews from '../components/Reviews';
import { getReviews } from '../services/reviewService';
import { Review } from '../types';


const ReviewsView: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const initialReviews = await getReviews();
        setReviews(initialReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);


  return (
    <div className="flex flex-col items-start">
      <h1 className=''>Beer Reviews</h1>
      <Reviews reviews={reviews}/>
    </div>
  );
};

export default ReviewsView;

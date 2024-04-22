import { useEffect, useState } from 'react';
import Reviews from '../components/Reviews';
import { getReviews } from '../services/reviewService';
import { Review } from '../types';

const ReviewView: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchReviews = async () => {
      const currentUrl = new URL(window.location.href);
      const reviewId = currentUrl.pathname.split('/').pop();

      try {
        const initialReviews = await getReviews();
        const reviewToShow = initialReviews.find((n: Review) => Number(n.id) === Number(reviewId));

        if (reviewToShow === undefined) {
          setNotFound(true);
        } else {
          setReviews([reviewToShow]);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  if (notFound) {
    return (
      <div className="flex flex-col items-start">
        <h1 className=''>404 - Review not found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start">
      <h1 className=''>Beer Reviews</h1>
      <Reviews reviews={reviews} />
    </div>
  );
};

export default ReviewView;

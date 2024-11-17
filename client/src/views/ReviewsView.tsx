import ReviewCard from '@/components/ReviewCard';
import { getReviews } from '../services/reviewService';
import { useEffect, useState } from 'react';
import { Review } from '@/types';
import Loader from '@/components/Loader';
import { useSearchParams } from 'react-router-dom';

const ReviewsView = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const authorId = searchParams.get('author');

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const initialReviews = await getReviews(authorId);
        setReviews(initialReviews);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [authorId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <ul className="w-full rounded-md max-w-3xl ">
      {authorId ? <h1>Reviews by you</h1> : <h1 className='px-6'>Beerify reviews</h1>}
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </ul>
  );
};

export default ReviewsView;

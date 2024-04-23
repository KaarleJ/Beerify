import { useEffect, useState } from 'react';
import { Review } from '@/types';
import {
  getOneReview,
  updateReview,
  removeReview,
} from '../services/reviewService';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import reviewSchema from '@/lib/schemas/ReviewSchema';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const useReview = () => {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [review, setReview] = useState<Review>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    const fetchReview = async () => {
      setLoading(true);
      try {
        const review = await getOneReview(Number(id));
        setReview(review);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching reviews:', error);
        toast({
          title: 'Error',
          description: 'Error fetching review',
          variant: 'destructive',
        });
      }
    };

    fetchReview();
  }, [id, toast]);

  const editReview = async (rawValues: z.infer<typeof reviewSchema>) => {
    try {
      if (!id) throw new Error('ID of review is required');
      if (!review) throw new Error('Review not found');
      setUpdating(true);
      const values = {
        ...rawValues,
        rating: parseInt(rawValues.rating),
      };
      await updateReview(review.id, values);
      setUpdating(false);
      navigate(`/reviews/${review.id}`);
      toast({ title: 'Success', description: 'Review updated successfully' });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
      setUpdating(false);
    }
  };

  const deleteReview = async () => {
    try {
      setDeleting(true);
      if (!id) throw new Error('ID of review is required');
      if (!review) throw new Error('Review not found');
      await removeReview(review.id);
      navigate('/reviews');
      toast({ title: 'Success', description: 'Review deleted successfully' });
      setDeleting(false);
    } catch (error) {
      setDeleting(false);
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
      console.error(error);
    }
  };

  return { updating, loading, review, editReview, deleteReview, deleting };
};

export default useReview;

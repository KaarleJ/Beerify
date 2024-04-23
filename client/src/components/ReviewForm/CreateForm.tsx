import ReviewForm from './ReviewForm';
import reviewSchema from '@/lib/schemas/ReviewSchema';
import { useState } from 'react';
import { createReview } from '@/services/reviewService';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../ui/use-toast';

const CreateForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (rawValues: z.infer<typeof reviewSchema>) => {
    try {
      setLoading(true);
      const values = {
        ...rawValues,
        rating: parseInt(rawValues.rating),
      };
      await createReview(values);
      setLoading(false);
      navigate('/reviews');
      toast({ title: 'Success', description: 'Review created successfully' });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  return (
    <ReviewForm
      onSubmit={onSubmit}
      loading={loading}
      formSchema={reviewSchema}
    />
  );
};

export default CreateForm;

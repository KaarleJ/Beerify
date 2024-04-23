import ReviewForm from './ReviewForm';
import reviewSchema from '@/lib/schemas/ReviewSchema';
import Loader from '../Loader';
import useReview from '@/hooks/useReview';

const EditForm = () => {
  const { review, loading, updating, editReview } = useReview();

  if (loading || !review) return <Loader />;

  return (
    <ReviewForm
      onSubmit={editReview}
      loading={updating}
      formSchema={reviewSchema}
      defaultValues={{ ...review, rating: review.rating.toString() }}
    />
  );
};

export default EditForm;

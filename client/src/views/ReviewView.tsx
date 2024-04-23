import useAuth from '@/hooks/useAuth';
import useReview from '@/hooks/useReview';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Loader from '../components/Loader';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Rating } from '@mui/material';
import { Button } from '@/components/ui/button';
import Modal from '@/components/Modal';

const ReviewView = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { review, loading, deleteReview, deleting } = useReview();
  const owned = user?.id === review?.author.id;

  if (loading || !review) {
    return <Loader />;
  }

  return (
    <Card className="w-full h-full max-w-3xl mt-24 p-5 rounded-md shadow-xl">
      <CardHeader>
        <h1 className="p-5">{review.beerName}</h1>
        <div className="flex flex-row">
          <p className="pr-2">review by {review.author.username} rated</p>
          <Rating defaultValue={review.rating} readOnly />
        </div>
      </CardHeader>
      <CardContent>
        <p>{review.text}</p>
      </CardContent>
      <CardFooter>
        {owned ? (
          <>
            <Button
              onClick={() => navigate(`/edit/${review.id}`)}
              className="mx-2"
            >
              Edit
            </Button>
            <Button
              disabled={deleting}
              variant={'destructive'}
              onClick={() => setShowModal(true)}
              className="mx-2"
            >
              Delete
            </Button>
          </>
        ) : null}
      </CardFooter>
      <Modal show={showModal} className="p-5">
        <CardHeader>
          <CardTitle className='text-center'>Delete</CardTitle>
        </CardHeader>
        <CardContent>Are you sure you want to delete this review?</CardContent>
        <CardFooter className='flex flex-row justify-center'>
          <Button variant='ghost' className='mx-2' onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant={'destructive'} className='mx-2' onClick={() => deleteReview()}>Delete</Button>
        </CardFooter>
      </Modal>
    </Card>
  );
};

export default ReviewView;

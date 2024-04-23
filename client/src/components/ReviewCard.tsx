import { Review as ReviewType } from '@/types';
import { Rating } from '@mui/material';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type ReviewProps = {
  review: ReviewType;
  className?: string;
};

const ReviewCard = ({ review, className }: ReviewProps) => {
  return (
    <li className={`mx-5 my-2 hover:brightness-150 ${className}`}>
      <a href={`/reviews/${review.id}`}>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex flex-row items-center">
                <h2>{review.beerName}</h2>
                <Rating
                  defaultValue={review.rating}
                  readOnly
                  className="ml-5 mt-1"
                />
              </div>
            </CardTitle>
            <CardDescription>by {review.author.username}</CardDescription>
          </CardHeader>
          <CardContent>
            <CardDescription className='text-ellipsis overflow-hidden'>{review.text}</CardDescription>
          </CardContent>
        </Card>
      </a>
    </li>
  );
};

export default ReviewCard;

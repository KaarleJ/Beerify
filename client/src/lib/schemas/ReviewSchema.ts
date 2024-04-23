import { z } from 'zod';


const reviewSchema = z.object({
  rating: z.string().regex(/^[0-5]$/, 'Rating must be between 0 and 5'),
  text: z.string().min(10, 'Review must be between 10 and 1000 characters').max(1000, 'Review must be between 10 and 1000 characters'),
  beerName: z.string().min(3, 'Beer name should be at least 3 characters long').max(100, 'Beer name should be at most 100 characters long'),
});

export default reviewSchema;
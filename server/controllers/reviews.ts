import { Request, Response, Router } from 'express';
import { reviews } from '../database/schema';
import { db } from '../database/db';
import { asc, eq } from 'drizzle-orm';



const reviewRouter = Router();

// Retrieve all reviews
reviewRouter.get('/', async (req: Request, res: Response) => {
  try {
    const allReviews = await db.select().from(reviews).orderBy(asc(reviews.id));
    res.json(allReviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
});

// add a new review
reviewRouter.post('/', async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const newReview = await db.insert(reviews).values({
      rating: body.rating,
      text: body.text,
      beerName: body.beerName,
      authorId: body.authorId,
    });
    console.log(newReview);
    res.status(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error adding review', error });
  }
});

// Update a review
reviewRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const body = req.body;
    const updatedReview = await db.update(reviews).set({
      rating: body.rating,
      text: body.text,
      beerName: body.beerName,
    }).where(eq(reviews.id, id));
    if (updatedReview) {
      res.json(updatedReview);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error });
  }
});

// Delete a review
reviewRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedReview = await db.delete(reviews).where(eq(reviews.id, id));

    if (deletedReview) {
      console.log('Deleted a review successfully');
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting review', error });
  }
});

export default reviewRouter;

import { Request, Response, Router } from 'express';
import { reviews } from '../database/schema';
import { db } from '../database/db';
import { asc, eq, and } from 'drizzle-orm';

const reviewRouter = Router();

// Retrieve all reviews
reviewRouter.get('/', async (_req: Request, res: Response) => {
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
    const { rating, text, beerName } = req.body;
    const userId = req.user?.id as number;

    const newReview = await db
      .insert(reviews)
      .values({
        rating: rating,
        text: text,
        beerName: beerName,
        authorId: userId,
      })
      .returning();

    res.status(201).send(newReview);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error adding review' });
  }
});

// Update a review
reviewRouter.put('/:id', async (req: Request, res: Response) => {
  const userId = req.user?.id as number;
  const id = Number(req.params.id);
  const { rating, text, beerName } = req.body;

  try {
    const updatedReview = await db
      .update(reviews)
      .set({
        rating: rating,
        text: text,
        beerName: beerName,
      })
      .where(and(eq(reviews.id, id), eq(reviews.authorId, userId)))
      .returning();

    if (updatedReview) {
      res.json(updatedReview);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating review' });
  }
});

// Delete a review
reviewRouter.delete('/:id', async (req: Request, res: Response) => {
  const userId = req.user?.id as number;
  const id = Number(req.params.id);

  try {
    const deletedReview = await db
      .delete(reviews)
      .where(and(eq(reviews.id, id), eq(reviews.authorId, userId)))
      .returning();

    if (deletedReview.length > 0) {
      res.status(200).send(deletedReview);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting review' });
  }
});

export default reviewRouter;

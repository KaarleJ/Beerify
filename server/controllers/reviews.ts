/* eslint-disable indent */
import { Request, Response, Router } from 'express';
import { reviews } from '../database/schema';
import { db } from '../database/db';
import { asc, eq, and } from 'drizzle-orm';

const reviewRouter = Router();

reviewRouter.get('/', async (req: Request, res: Response) => {
  const authorId = req.query.authorId as string | undefined;
  try {
    const result = authorId
      ? await db.query.reviews.findMany({
          where: eq(reviews.authorId, Number(authorId)),
          with: {
            author: true,
          },
          orderBy: asc(reviews.id),
        })
      : await db.query.reviews.findMany({
          with: {
            author: true,
          },
          orderBy: asc(reviews.id),
        });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
});

reviewRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const review = await db.query.reviews.findFirst({
      where: eq(reviews.id, id),
      with: {
        author: true,
      },
    });

    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching review', error });
  }
});

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

reviewRouter.put('/:id', async (req: Request, res: Response) => {
  const userId = req.user?.id as number;
  const id = Number(req.params.id);
  const { rating, text, beerName } = req.body;

  console.log('body: ', req.body);

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

    console.log('updated: ', updatedReview);

    if (updatedReview[0]) {
      res.json(updatedReview[0]);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating review' });
  }
});

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

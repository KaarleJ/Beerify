import { Request, Response, Router } from 'express';
import { reviews } from '../database/schema';
import { db } from '../database/db';
import { asc, eq } from 'drizzle-orm';



const reviewRouter = Router();

// Hakee kaikki arvostelut
reviewRouter.get('/', async (req: Request, res: Response) => {
  try {
    const allReviews = await db.select().from(reviews).orderBy(asc(reviews.id));
    res.json(allReviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Virhe arvostelujen hakemisessa', error });
  }
});

// Lisää uusi arvostelu
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
    res.status(500).json({ message: 'Virhe arvostelun lisäämisessä', error });
  }
});

// Päivitä arvostelu
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
      res.status(404).json({ message: 'Arvostelua ei löytynyt' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Virhe arvostelun päivittämisessä', error });
  }
});

// Poista arvostelu
reviewRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedReview = await db.delete(reviews).where(eq(reviews.id, id));

    if (deletedReview) {
      console.log('poistaminen onnistui');
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Arvostelua ei löytynyt' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Virhe arvostelun poistamisessa', error });
  }
});

export default reviewRouter;

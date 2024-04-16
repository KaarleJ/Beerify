import express, { Express, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import { db } from '../database/db';
import { users } from '../database/schema';

const app: Express = express();
const port = process.env.PORT || 3000;

let count = 0;
app.use(cors());
app.use(express.static('dist'));


app.get('/count', (_req: Request, res: Response) => {
  res.send({ count });
  count++;
});

app.get('/users', async (_req: Request, res: Response) => {
  const us = await db.select().from(users);
  res.send(us);
});

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../index.html'), (error) => {
    if (error) {
      res.status(500).send(error);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  });
});

app.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../index.html'), (error) => {
    if (error) {
      res.status(500).send(error);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

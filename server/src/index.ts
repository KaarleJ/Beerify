import express, { Express, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import reviewRouter from './controllers/reviews';
import morgan from 'morgan';
import dotenv from 'dotenv';
import auth from './middleware/auth';
import authRouter from './controllers/auth';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));


app.use('/api/auth', authRouter);
app.use('/api/reviews', auth, reviewRouter);

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

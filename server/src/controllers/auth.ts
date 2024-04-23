import { Request, Response, Router } from 'express';
import { users } from '../database/schema';
import { db } from '../database/db';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const authRouter = Router();

authRouter.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await db.select().from(users).where(eq(users.username, username));
  if (user.length !== 1) {
    res.status(401).json({ message: 'Invalid username or password' });
    return;
  }

  const match = await bcrypt.compare(password, user[0].password);

  if (!match) {
    res.status(401).json({ message: 'Invalid username or password' });
    return;
  }

  const token = jwt.sign({ username, id: user[0].id }, process.env.JWT_SECRET as string, { expiresIn: '4h' });

  res.json({ token, user: { username: username, id: user[0].id } }).status(200);
});

authRouter.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await db.insert(users).values({ username, password: hashedPassword }).returning();
    if (newUser.length !== 1) {
      throw new Error('Error registering user');
    }
    const token = jwt.sign({ username, id: newUser[0].id }, process.env.JWT_SECRET as string, { expiresIn: '4h' });
    res.json({ token, user: { username: username, id: newUser[0].id } }).status(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user', error });
  }
});

export default authRouter;
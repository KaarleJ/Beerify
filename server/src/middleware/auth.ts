import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: JwtPayload | null | { id: number, username: string } ;
    }
  }
}

const key = process.env.JWT_SECRET as string | undefined;

if (!key) {
  throw new Error('JWT_SECRET must be provided');
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'GET')
    return next();

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, key) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default auth;

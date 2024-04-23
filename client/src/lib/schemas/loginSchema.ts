import { z } from 'zod';

const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'Username is at least 3 characters')
    .max(100, 'Username is at most 100 characters'),
  password: z
    .string()
    .min(6, 'Password is at least 6 characters')
    .max(100, 'Password is at most 100 characters'),
});

export default loginSchema;

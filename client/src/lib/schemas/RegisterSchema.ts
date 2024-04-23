import { z } from 'zod';

const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username should be at least 3 characters long')
    .max(100, 'Username should be at most 100 characters long'),
  password: z
    .string()
    .min(6, 'Password should be at least 6 characters long')
    .max(100, 'Password should be at most 100 characters long')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      'Password must contain at least one letter and one number'
    ),
});

export default registerSchema;

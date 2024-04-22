import { z } from 'zod';


const registerSchema = z.object({
  username: z.string().min(3).max(100),
  password: z.string().min(6).max(100).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
});

export default registerSchema;
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

type FormSchema = z.ZodObject<
  {
    username: z.ZodString;
    password: z.ZodString;
  },
  'strip',
  z.ZodTypeAny,
  {
    username: string;
    password: string;
  },
  {
    username: string;
    password: string;
  }
>;

interface AuthFormProps {
  formSchema: FormSchema;
  onSubmit: (values: z.infer<FormSchema>) => void;
  loading?: boolean;
}

// This component works as an interface for the login and register forms.
// It receives a formSchema, onSubmit function and loading state as props.
const AuthForm = ({ formSchema, onSubmit, loading }: AuthFormProps) => {
  const form = useForm<z.infer<FormSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  return (
    <Card className='p-10'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input className='bg-card' placeholder="Username..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input className='bg-card' placeholder="Password..." type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default AuthForm;

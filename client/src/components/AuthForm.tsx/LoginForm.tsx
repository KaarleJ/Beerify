import loginSchema from '@/lib/schemas/loginSchema';
import { z } from 'zod';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import { useToast } from '../ui/use-toast';

const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await login(values.username, values.password);
      navigate('/');
      toast({ title: 'Success', description: 'Logged in successfully' });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Wrong credentials',
        variant: 'destructive',
      });
    }
  };

  return (
    <AuthForm
      formSchema={loginSchema}
      onSubmit={onSubmit}
      loading={isLoading}
    />
  );
};

export default LoginForm;

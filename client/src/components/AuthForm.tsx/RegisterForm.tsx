import registerSchema from '@/lib/schemas/loginSchema';
import { z } from 'zod';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import { useToast } from '../ui/use-toast';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const { username, password } = values;
    try {
      await register(username, password);
      navigate('/');
      toast({ title: 'Success', description: 'Registered successfully' });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  return (
    <AuthForm
      onSubmit={onSubmit}
      formSchema={registerSchema}
      loading={isLoading}
    />
  );
};

export default RegisterForm;

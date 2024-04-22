import loginSchema from '@/lib/schemas/loginSchema';
import { z } from 'zod';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';


const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();


  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await login(values.username, values.password);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthForm formSchema={loginSchema} onSubmit={onSubmit} loading={isLoading} />
  );
};

export default LoginForm;

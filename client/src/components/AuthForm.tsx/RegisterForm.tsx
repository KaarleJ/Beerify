import registerSchema from '@/lib/schemas/loginSchema';
import { z } from 'zod';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';


const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const { username, password } = values;
    try {
      await register(username, password);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthForm onSubmit={onSubmit} formSchema={registerSchema} loading={isLoading}/>
  );
};

export default RegisterForm;

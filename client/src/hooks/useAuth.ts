import { useContext } from 'react';
import { AuthContext } from '../lib/auth/AuthContext';

function useAuth() {
  const { user, login, logout, register, isLoading } = useContext(AuthContext);

  return { user, login, logout, register, isLoading };
}

export default useAuth;

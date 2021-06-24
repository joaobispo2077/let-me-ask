import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';  

export function useAuth() {
  const value = useContext(AuthContext);

  return value;
}
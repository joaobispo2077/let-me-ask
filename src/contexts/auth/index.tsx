
import { createContext, ReactNode,useState, useEffect  } from "react";
import {auth, firebase} from '../../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | null;
  signInWithGoogle: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider (props: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const handleRecoverUser = (user: firebase.User | null) => {
    if (user) {
      const { displayName, photoURL, uid } = user;
  
      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }
  
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      });
    }
  }
  
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    console.log('logIn',result);

    handleRecoverUser(result.user);   
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      handleRecoverUser(user);
    });

    return () => {
      unsubscribe();
    }
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}
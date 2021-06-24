import { createContext, useState, useEffect } from 'react';
import {auth, firebase} from './services/firebase';

import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | null;
  signInWithGoogle: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType);

 function App() {
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
    auth.onAuthStateChanged(user => {
      handleRecoverUser(user);
    });
  }, [user]);

  return (
    <>
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </BrowserRouter>
    </AuthContext.Provider>
    </>
  );
}

export default App;
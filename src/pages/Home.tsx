
import {auth, firebase} from '../services/firebase';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg'

import { Button } from '../components/Button';

import '../styles/auth.scss';
import { useHistory } from 'react-router-dom';

export function Home() {
  const history = useHistory();

  const handleCreateRoom = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    console.log('logIn',result);
     

    history.push('/rooms/new');
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeask" />
          <button onClick={handleCreateRoom} className="create-rom">
            <img src={googleIconImg} alt="Logo do google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
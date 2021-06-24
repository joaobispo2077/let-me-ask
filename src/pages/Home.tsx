
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg'

import { Button } from '../components/Button';

import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.scss';
import { database } from '../services/firebase';

export function Home() {
  const { signInWithGoogle } = useAuth();

  const history = useHistory();

  const [roomCode, setRoomCode] = useState('');

  const handleCreateRoom = async () => {
    await signInWithGoogle();

    history.push('/rooms/new');
  }

  const handleJoinRoom = async (event: FormEvent) => {
    event.preventDefault();

    if(roomCode.trim()==="") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!(roomRef).exists()) {
      alert('Romm does not exists.');
      return;
    }

    history.push(`/rooms/${roomCode}`);
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
          <form onSubmit={handleJoinRoom}>
            <input onChange={e => setRoomCode(e.target.value)} type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
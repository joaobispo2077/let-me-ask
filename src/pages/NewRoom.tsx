import { FormEvent, ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/auth.scss';

export function NewRoom() {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');

  const handleCreateRoom = async (event: FormEvent) => {
    event.preventDefault();
    console.log('initiating room creation...');
    
    if(newRoom.trim() !== "") {
      console.log('room blocked is:', newRoom.trim());
      
      return;
    }

    console.log('creating...', newRoom, user);

    const roomRef = database.ref('rooms');
        
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });
  }

  // const handleTypeRoomName = (event: ChangeEvent<HTMLInputElement>) => {
  //   setNewRoom(event.target.value);    
  // }

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
          <h2>  Criar uma nova sala </h2>
          <form onSubmit={handleCreateRoom}>
            <input onChange={(event) =>  setNewRoom(event.target.value)} type="text" placeholder="Nome da sala" />
            <Button type="submit">Criar sala</Button>
          </form>
            <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}
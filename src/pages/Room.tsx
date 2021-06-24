import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export const Room = () => {
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { user } = useAuth();

  const [newQuestion, setNewQuestion] = useState('');

  const handleSendQuestion = async (event: FormEvent) => {
    event.preventDefault();

    if(newQuestion.trim() === '') 
      return;

    if(!user) {
      throw new Error('You must be logged in.')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="let me ask" />
          <RoomCode code={roomId}/>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala de perguntas</h1>
          <span>4 perguntas</span>
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="Oque você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)} 
            value={newQuestion}
          />

          <div className="form-footer">
            { user ? (
            <div className="user-info">
              <img src={user.avatar} alt={user.name} />
              <span>{user.name}</span>
            </div>
            ): ( <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>)}
           
            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  )
}

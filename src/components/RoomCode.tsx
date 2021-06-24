import React from 'react'
import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string;
};

export const RoomCode = (props: RoomCodeProps) => {

  const handleCopyRoomCodeToClipBoard = () => {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button onClick={handleCopyRoomCodeToClipBoard} className="room-code">
      <div>
        <img src={copyImg} alt="Copiar código da sala" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  )
}

import { useState } from 'react';

const PLAYER_A = 'X' as const;
const PLAYER_B = 'O' as const;

type PlayerType = typeof PLAYER_A | typeof PLAYER_B;

const togglePlayer = (
  currentPlayer: PlayerType
) => currentPlayer === PLAYER_A ? PLAYER_B : PLAYER_A;

const PicPacPoe = () => {

  const [board, setBoard] = useState<(PlayerType | '')[][]>(Array(3).fill(Array(3).fill('')));
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_A);
  const [winner, setWinner] = useState<string | null>(null);

  const resetHandler = () => {
    setCurrentPlayer(PLAYER_A);
    setWinner(null);
  }
  
  return (
    <InfoPanel currentPlayer={currentPlayer} winner={winner} />
    <Board board={board}/>
  );
}

export default PicPacPoe;
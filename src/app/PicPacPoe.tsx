'use client';

/* eslint-disable react/no-array-index-key */
import { useCallback, useState } from 'react';

type PlayerType = 'X' | 'O';
type BoardType = (PlayerType | '')[][];

const PLAYER_A: PlayerType = 'X';
const PLAYER_B: PlayerType = 'O';

const tableCreator = () => Array(3).fill(Array(3).fill('')) as BoardType;

const checkWinner = (board: BoardType, currentPlayer: PlayerType) => {
  const indexArray = [0, 1, 2];

  return (
    // check rows
    indexArray.some(
      (rowIndex) => indexArray.every(
        (colIndex) => board[rowIndex][colIndex] === currentPlayer,
      ),
    )
    // check cols
    || indexArray.some(
      (colIndex) => indexArray.every(
        (rowIndex) => board[rowIndex][colIndex] === currentPlayer,
      ),
    )
    // check diagonals
    || indexArray.every((index) => board[index][index] === currentPlayer)
    || indexArray.every((index) => board[index][2 - index] === currentPlayer)
  );
};

const PicPacPoe = () => {
  const [board, setBoard] = useState<BoardType>(tableCreator());
  const [currentPlayer, setCurrentPlayer] = useState<PlayerType>(PLAYER_A);
  const [winner, setWinner] = useState<string | null>(null);

  const play = useCallback((rowIndex: number, colIndex: number) => {
    if (!board[rowIndex][colIndex] && !winner) {
      const updatedBoard = board.map(
        (row, boardRowIndex) => row.map(
          (value, boardColIndex) => {
            if (
              rowIndex === boardRowIndex
              && colIndex === boardColIndex
            ) return currentPlayer;
            return value;
          },
        ),
      );
      setBoard(updatedBoard);
      if (checkWinner(updatedBoard, currentPlayer)) {
        setWinner(currentPlayer);
      } else {
        setCurrentPlayer((prev) => (prev === PLAYER_A ? PLAYER_B : PLAYER_A));
      }
    }
  }, [board, currentPlayer, winner]);

  const resetHandler = () => {
    setCurrentPlayer(PLAYER_A);
    setWinner(null);
    setBoard(tableCreator());
  };

  return (
    <div className="flex flex-col justify-center">
      {/* InfoPanel */}
      <div>
        {
          winner
            ? `Winner: Player ${winner}`
            : `Current player: ${currentPlayer}`
        }
      </div>
      {/* Board */}
      <div className="mx-auto">
        {board.map(
          (row, rowIndex) => (
            // Row
            <div key={`board-row-${rowIndex}`} className="flex">
              {row.map(
                (value, colIndex) => (
                  // Square
                  <button
                    type="button"
                    key={`board-square-${rowIndex}-${colIndex}`}
                    className="size-10 border"
                    onClick={() => play(rowIndex, colIndex)}
                  >
                    {value}
                  </button>
                ),
              )}
            </div>
          ),
        )}
      </div>
      <button type="button" onClick={resetHandler}>
        Reset
      </button>
    </div>
  );
};

export default PicPacPoe;

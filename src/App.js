import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [results, setResults] = useState({ X: 0, O: 0 });

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    if (checkWin(newBoard, player)) {
      setWinner(player);
      setResults((prevResults) => ({
        ...prevResults,
        [player]: prevResults[player] + 1,
      }));
    } else if (isBoardFull(newBoard)) {
      setWinner('Draw');
    } else {
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer('X');
    setWinner(null);
  };

  const checkWin = (board, player) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] === player && board[b] === player && board[c] === player) {
        return true;
      }
    }

    return false;
  };

  const isBoardFull = (board) => {
    return board.every((cell) => cell !== null);
  };

  const renderSquare = (index) => {
    return (
      <div
        className="square"
        onClick={() => handleClick(index)}
        style={{ lineHeight: '120px' }}
      >
        {board[index]}
      </div>
    );
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <div className="game-board">
        <div className="board">
          {board.map((_, index) => renderSquare(index))}
        </div>
      </div>
      {winner && (
        <div className="status">
          {winner === 'Draw' ? 'It\'s a Draw!' : `Player ${winner} wins!`}
        </div>
      )}
      <button className="reset-button" onClick={restartGame}>
        Restart
      </button>
      <div className="results">
        <div className="result-item">
          P1 (X): {results.X}
        </div>
        <div className="result-item">
          P2 (O): {results.O}
        </div>
      </div>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

function DrawbotBoard() {
  const [game] = useState(new Chess('rnb1kbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'));
  const [fen, setFen] = useState('rnb1kbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');

  const handleMove = async (sourceSquare, targetSquare) => {
    console.log(`White move from ${sourceSquare} to ${targetSquare}`);
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (move) {
      const newFen = game.fen();
      console.log(`Resulting FEN after white's move: ${newFen}`);
      setFen(newFen);

      // Call backend for black's drawish move
      try {
        let url = 'http://127.0.0.1:5000'
        // let url = 'https://personal-website-backend-vdr2.onrender.com'
        console.log(`Sending request to backend URL: ${url}/drawbot-move`);
        const res = await fetch(url + '/drawbot-move', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fen: newFen }),
        });

        const data = await res.json();
        console.log('Backend response:', data);
        console.log('Backend from:', data.move.from);
        if (data && data.move && data.move.from && data.move.to) {
          game.move({ from: data.move.from, to: data.move.to, promotion: 'q' });
          setFen(game.fen());
          console.log(`Applied drawbot move from ${data.from} to ${data.to}`);
        } else {
          console.log('Drawbot move data invalid or missing');
        }
      } catch (err) {
        console.error('Error fetching drawbot move:', err);
      }

      return true;
    }

    return false;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Chessboard position={fen} onPieceDrop={handleMove} boardWidth={400} />
    </div>
  );
}

export default DrawbotBoard;
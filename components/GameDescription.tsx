import React from 'react';
import { Game } from '@/types/game';
import GroupButtons from './GroupButtons';

type Props = {
  game: Game;
};

const GameDescription: React.FC<Props> = ({ game }) => {
  return (
    <article>
      <h2 className="mb-3 text-2xl font-bold text-white">{`Best price $${game.price}`}</h2>
      <p className="text-white">{game.description}</p>
      <GroupButtons game={game} />
    </article>
  );
};

export default GameDescription;

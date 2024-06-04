import React from 'react';
import { getSingleGame } from '@/libs/api';
import Galery from '@/components/Galery';
import GameDescription from '@/components/GameDescription';

type Props = {
  params: { slug: string };
};

const GameItem: React.FC<Props> = async ({ params: { slug } }) => {
  const game = await getSingleGame(slug);

  return (
    <section className="container mx-auto px-6 py-20">
      <h1 className="mb-4 mt-[62px] text-3xl font-extrabold text-white">
        {game.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
        <Galery gameName={game.name} images={game.image} />
        <GameDescription game={game} />
      </div>
    </section>
  );
};

export default GameItem;

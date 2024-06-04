import React from 'react';
import { getGames } from '@/libs/api';
import GameCard from './GameCard';

const TrandingGames = async () => {
  const games = await getGames();

  return (
    <section className="mx-auto px-6 py-8 text-white sm:px-12 md:px-20 lg:px-36">
      <div className="mb-8 flex flex-col items-center justify-between sm:flex-row">
        <h2 className="text-3xl font-bold sm:mr-4">Currently trending games</h2>
      </div>

      <div className="flex flex-wrap gap-8">
        {games.map((game) => (
          <GameCard game={game} key={game._id} />
        ))}
      </div>
    </section>
  );
};

export default TrandingGames;

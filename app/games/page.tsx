import React from 'react';
import GameCard from '@/components/GameCard';
import Hero from '@/components/Hero';
import { getGames } from '@/libs/api';

const Games = async () => {
  const games = await getGames();
  return (
    <>
      <Hero />

      <section className="px-4 py-16 text-center text-white lg:px-36 lg:pb-36">
        <h2 className="mb-3 text-3xl font-bold lg:text-4xl">Games</h2>
        <p className="mx-auto max-w-xl text-gray-400 lg:text-lg">
          Checkout our latest collection of games
        </p>

        <div className="flex flex-wrap gap-8 rounded py-10">
          {games.map((game) => (
            <GameCard
              key={game._id}
              game={game}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Games;

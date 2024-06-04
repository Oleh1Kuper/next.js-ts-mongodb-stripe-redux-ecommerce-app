import React from 'react';
import Link from 'next/link';
import { getRecentGames } from '@/libs/api';
import GameCard from './GameCard';

const RecentGamesSection = async () => {
  const recentGames = await getRecentGames();

  return (
    <section
      id="recent-games"
      className="px-4 py-16 text-center text-white lg:px-36 lg:py-36"
    >
      <h2 className="mb-3 text-3xl font-bold lg:text-4xl">Our recent games</h2>

      <p className="mx-auto max-w-xl text-gray-400 lg:text-lg">
        Stay Ahead of the Gaming Curve with Our Latest Games.
      </p>

      <div className="flex flex-wrap gap-8 rounded py-10">
        {recentGames.map((game) => (
          <GameCard game={game} key={game._id} />
        ))}
      </div>

      <Link
        href="/games"
        className="bg-primary-gradient mt-4 rounded-md border-2 border-primary-dark px-6 py-2 sm:mt-0"
      >
        See All
      </Link>
    </section>
  );
};

export default RecentGamesSection;

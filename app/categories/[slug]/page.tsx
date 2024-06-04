import React from 'react';
import GameCard from '@/components/GameCard';
import NewsLetter from '@/components/NewsLetter';
import { getCategory, getCategoryGames } from '@/libs/api';

type Props = {
  params: { slug: string };
};

const GameCategory: React.FC<Props> = async ({ params: { slug } }) => {
  const games = await getCategoryGames(slug);
  const category = await getCategory(slug);

  return (
    <>
      <section className="bg-transparent py-1 md:py-20">
        <div
          className="bg-primary-gradiant relative
          mx-auto inline-block max-w-screen-xl px-4 py-8
          md:py-12 lg:px-8 lg:py-20"
        >
          <div className="lg:w-3/4">
            <h1
              className="text-2xl font-extrabold tracking-tight
              text-white md:text-4xl lg:text-5xl"
            >
              {`${slug.toUpperCase()} Games`}
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-gray-300 md:mt-4 md:text-xl">
              {category.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-36 px-4 lg:px-36 text-white text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-3">{`${slug.toUpperCase()} Games`}</h2>
        <p className="text-gray-400 max-w-xl mx-auto lg:text-lg">
          Checkout our latest collection of
          {' '}
          <span className="text-primary">{slug}</span>
          {' '}
          games
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

      <NewsLetter />
    </>
  );
};

export default GameCategory;

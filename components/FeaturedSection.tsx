import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import client from '@/libs/sanity';
import { Game } from '@/types/game';

const FeaturedSection = async () => {
  const game: Game = await client.fetch({
    query: "*[_type=='game' && isFeatured][0]",
  });

  if (!game) return null;

  return (
    <section className="px-6 pb-24 text-white sm:px-12 md:px-20 lg:px-36">
      <h2 className="my-16 text-center text-2xl font-semibold text-primary-dark">
        Featured Game
      </h2>

      <article className="mx-auto max-w-screen-xl">
        <h3 className="mb-4 text-2xl font-bold md:mb-8 md:text-3xl lg:text-4xl">
          {game.name}
        </h3>

        <p className="mb-8 max-w-screen-md text-sm md:mb-12">
          {game.description}
        </p>

        <Link href={`/games/${game.slug.current}`}>
          <Image
            src={game.image[0].url}
            alt={game?.name}
            width={500}
            height={500}
            className="w-full rounded-lg object-cover"
          />
        </Link>
      </article>
    </section>
  );
};

export default FeaturedSection;

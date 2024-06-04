import React from 'react';
import { Game } from '@/types/game';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  game: Game;
};

const GameCard: React.FC<Props> = ({ game }) => {
  return (
    <Link
      href={`/games/${game.slug.current}`}
      className="relative mx-auto h-[277px] w-[251px] overflow-hidden rounded-2xl"
    >
      <span className="absolute right-0 top-0 z-10 rounded-bl-2xl bg-primary p-3 text-lg font-semibold">
        {`$${game.price}`}
      </span>

      <Image
        className="object-cover"
        src={game.image[0].url}
        alt={game.name}
        fill
      />

      <h3 className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 px-4 py-3 text-lg font-bold text-white">
        {game.name}
      </h3>
    </Link>
  );
};

export default GameCard;

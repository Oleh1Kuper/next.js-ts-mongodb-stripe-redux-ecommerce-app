import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Category } from '@/types/category';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  category: Category;
};

const GameCategoryCard: React.FC<Props> = ({ category }) => {
  const { image, name, slug } = category;

  return (
    <Link
      href={`categories/${slug.current}`}
      className="mx-auto max-w-xs lg:w-56 lg:max-w-none xl:w-64"
    >
      <Image
        src={image}
        alt={name}
        width={200}
        height={200}
        className="mx-auto h-12 w-12 rounded-[100%] object-cover transition-all duration-150 hover:scale-110 lg:h-20 lg:w-20 xl:h-24 xl:w-24"
      />

      <h3 className="mb-2 mt-3 text-center text-sm text-white lg:text-base">
        {name}
      </h3>

      <FaArrowRightLong size={20} className="mx-auto text-primary" />
    </Link>
  );
};

export default GameCategoryCard;

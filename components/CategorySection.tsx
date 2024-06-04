import React from 'react';
import { getCategories } from '@/libs/api';
import GameCategoryCard from './GameCategoryCard';

const bgImg = '/images/gaming1.jpg';

const CategorySection = async () => {
  const categories = await getCategories();

  return (
    <section
      style={{ backgroundImage: `url('${bgImg}')` }}
      className="bg-cover bg-center bg-no-repeat py-16 sm:py-20 md:py-28 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <h2
          className="mx-auto mb-4 max-w-md text-center
          text-2xl font-bold leading-[130%,187%,130%,130%]
          text-primary sm:max-w-lg sm:text-3xl md:max-w-2xl md:text-4xl lg:text-5xl"
        >
          Categories
        </h2>

        <p
          className="mx-auto mb-8 max-w-md rounded-3xl
          bg-primary-gradiant px-8 py-5 text-center text-base text-white sm:max-w-lg sm:text-lg
          md:max-w-2xl md:text-xl lg:text-2xl"
        >
          Explore a wide range of games, offering thrilling adventures,
          challenging sports, and immersive action gameplay. Discover new
          worlds, compete with friends, and embark on epic quests that will keep
          you entertained for hours.
        </p>

        <div className="flex flex-wrap">
          {categories.map((category) => (
            <GameCategoryCard category={category} key={category._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

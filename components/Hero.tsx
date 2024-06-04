import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  isShownLink?: boolean;
};

const Hero: React.FC<Props> = ({ isShownLink }) => {
  return (
    <section className="px-6 py-40 sm:px-12 md:px-20 lg:px-36">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <div className="mx-auto flex max-w-md flex-col justify-center lg:col-start-1 lg:col-end-2 lg:mx-0 lg:max-w-none">
          <h1 className="text-primary-dark mb-3 text-xl font-bold tracking-tight md:text-2xl lg:text-3xl">
            Gaming
          </h1>
          <p className="text-5xl font-bold leading-[120%] text-white md:text-5xl md:leading-[155%]">
            Unlock your gaming potential
          </p>
          <p className="mt-3 text-base font-medium text-gray-300 sm:mt-5 sm:max-w-md md:mt-5 md:max-w-xl md:text-lg lg:mx-0">
            Discover, Learn, and Conquer with our extensive collection of games
          </p>

          {!isShownLink && (
            <div className="mt-8 rounded sm:mt-10">
              <Link
                className="bg-primary hover:bg-primary-dark
              mt-8 inline-flex items-center rounded-[40px]
              border border-transparent px-6 py-3 text-base font-medium
              text-white shadow-sm sm:mt-10 sm:px-8"
                href="#recent-games"
              >
                Find games
              </Link>
            </div>
          )}
        </div>

        <div className="mt-5 flex justify-center lg:col-start-2 lg:col-end-3 lg:block">
          <Image
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="3D Game"
            width={400}
            height={400}
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

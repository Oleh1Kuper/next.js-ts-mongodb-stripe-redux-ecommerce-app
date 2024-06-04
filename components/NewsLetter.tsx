import React from 'react';

const NewsLetter = () => {
  return (
    <section className="container mx-auto py-[150px] text-white md:px-36">
      <h2 className="mb-3 text-2xl font-bold md:mb-5 md:text-4xl">
        Stay in the Loop
      </h2>
      <p className="mb-6 text-base md:mb-10 md:text-lg">
        Subscribe to Our Newsletter for Exclusive Game Updates, Offers, and
        Tips.
      </p>

      <div
        className="mx-auto flex flex-col items-center justify-between
        rounded-2xl bg-[#1C140F] px-6 py-8 md:flex-row md:px-14 md:py-10"
      >
        <div className="mb-6 flex-1 md:mb-0 md:mr-8">
          <h3 className="mb-2 text-lg font-bold md:text-2xl">
            Sign Up for Our Newsletter
          </h3>
          <p className="mb-4 text-sm text-gray-300 md:text-base">
            Get the latest news and updates delivered straight to your inbox.
          </p>
        </div>
        <form className="flex w-full flex-col items-center overflow-hidden rounded-lg md:w-1/2 md:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-t-lg px-4 py-3
            text-gray-700 md:w-3/4 md:rounded-l-lg
            md:rounded-r-none md:rounded-t-none"
          />
          <button
            type="button"
            className="mt-4 rounded-b-lg bg-green-600 px-8 py-3
            font-bold text-white transition-all duration-200
            hover:bg-green-700 md:ml-4 md:mt-0 md:rounded-r-lg"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;

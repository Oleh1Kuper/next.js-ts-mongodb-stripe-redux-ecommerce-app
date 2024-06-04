import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#070707] py-10 text-white">
      <div className="container mx-auto px-6 py-8">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <article>
            <h2 className="mb-4 text-lg font-bold">Logo</h2>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
              nobis, mollitia asperiores accusantium blanditiis tempore dolores
            </p>
          </article>

          <article>
            <h2 className="mb-4 text-lg font-bold">About us</h2>
            <ul className="text-sm">
              <li>
                <Link className="hover:text-gray-400" href="/">
                  Сareers
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-400" href="/">
                  Blog
                </Link>
              </li>
            </ul>
          </article>

          <article>
            <h2 className="mb-4 text-lg font-bold">Contact us</h2>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
              nobis, mollitia asperiores accusantium blanditiis tempore dolores
            </p>
          </article>
        </section>
      </div>
    </footer>
  );
};

export default Footer;

'use client';

import React, { useState } from 'react';
import Image from 'next/image';

type Props = {
  images: Array<{ _key: string; url: string }>;
  gameName: string;
};

const Galery: React.FC<Props> = ({ images, gameName }) => {
  const [index, setIndex] = useState(0);
  const updateImage = (i: number) => () => {
    setIndex(i);
  };

  return (
    <article>
      <Image
        className="mb-4 rounded-lg"
        src={images[index].url}
        width={400}
        height={300}
        alt={gameName}
      />

      <div className="flex gap-1">
        {images.map((img, i) => (
          <div
            key={img._key}
            className="p-1"
            onClick={updateImage(i)}
            aria-hidden
          >
            <Image
              src={img.url}
              width={80}
              height={80}
              alt={gameName}
              className="cursor-pointer rounded shadow-md shadow-white/50"
            />
          </div>
        ))}
      </div>
    </article>
  );
};

export default Galery;

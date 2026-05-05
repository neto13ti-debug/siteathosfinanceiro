'use client';

import { useState } from 'react';

export default function BlogImage({ src, alt, fallback }: { src: string; alt: string; fallback: string }) {
  const [imgSrc, setImgSrc] = useState(src?.includes('http') ? src : fallback);

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      onError={() => setImgSrc(fallback)}
    />
  );
}

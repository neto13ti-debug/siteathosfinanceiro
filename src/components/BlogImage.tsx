'use client';

import { useState } from 'react';

export default function BlogImage({ src, alt, fallback, secondary, title }: { src: string; alt: string; fallback: string; secondary?: string; title?: string }) {
  // Tenta pegar do src, se não tiver, tenta extrair um link de imagem do 'secondary' (resumo/conteúdo)
  const extractImg = (text: string) => {
    if (!text) return null;
    const match = text.match(/src="([^">]+)"/) || text.match(/srcset="([^">,\s]+)/);
    return match ? match[1] : null;
  };

  // Se não houver nada, gera uma busca no Unsplash baseada no título
  const getContextFallback = () => {
    if (!title) return fallback;
    const query = encodeURIComponent(title.split(' ').slice(0, 3).join(' '));
    return `https://source.unsplash.com/featured/?finance,${query}`;
  };

  const initialSrc = (src?.includes('http') ? src : (secondary ? extractImg(secondary) : null)) || getContextFallback();
  const [imgSrc, setImgSrc] = useState(initialSrc);

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      onError={() => {
        if (secondary && imgSrc !== extractImg(secondary)) {
          const extracted = extractImg(secondary);
          if (extracted) {
            setImgSrc(extracted);
            return;
          }
        }
        setImgSrc(fallback);
      }}
    />
  );
}

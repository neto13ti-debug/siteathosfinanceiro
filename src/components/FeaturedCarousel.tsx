'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BlogImage from './BlogImage';
import { cleanSlug } from '@/lib/utils';

interface Post {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content?: string;
  category: string;
  image: string;
}

export default function FeaturedCarousel({ posts }: { posts: Post[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (posts.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % posts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [posts.length]);

  if (posts.length === 0) return null;

  const featuredFallback = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop";

  return (
    <div style={{ position: 'relative', marginBottom: '4rem' }}>
      {posts.map((post, index) => (
        <div 
          key={post.id} 
          className="animate-fadeIn"
          style={{ 
            display: index === current ? 'block' : 'none'
          }}
        >
          <Link 
            href={`/blog/${cleanSlug(post.slug)}`} 
            style={{ 
              textDecoration: 'none', 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '3rem', 
              alignItems: 'center', 
              background: '#f8fafc', 
              borderRadius: '32px', 
              padding: '2.5rem', 
              border: '1px solid #e2e8f0', 
              transition: 'all 0.3s ease' 
            }}
          >
            <div style={{ position: 'relative', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}>
              <BlogImage src={post.image} alt={post.title} fallback={featuredFallback} secondary={post.content || post.summary} title={post.title} />
              <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'var(--accent)', color: '#000', padding: '0.5rem 1.2rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase' }}>DESTAQUE</div>
            </div>
            <div>
              <span style={{ color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>{post.category}</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', margin: '0.8rem 0', lineHeight: 1.2, fontFamily: 'Outfit' }}>{post.title}</h2>
              <p style={{ 
                fontSize: '1.1rem', 
                color: '#475569', 
                lineHeight: 1.6, 
                marginBottom: '2rem',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {post.summary?.replace(/<[^>]*>/g, '')}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>A</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>Redação Athos</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Atualizado agora</div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
      
      {/* Indicadores do Carrossel */}
      {posts.length > 1 && (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '20px' }}>
          {posts.map((_, i) => (
            <div 
              key={i} 
              onClick={(e) => { e.preventDefault(); setCurrent(i); }}
              style={{ 
                width: i === current ? '30px' : '10px', 
                height: '10px', 
                borderRadius: '5px', 
                background: i === current ? 'var(--accent)' : '#e2e8f0', 
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }} 
            />
          ))}
        </div>
      )}

    </div>
  );
}

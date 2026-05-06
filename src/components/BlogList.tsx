'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { cleanSlug } from '@/lib/utils';
import BlogImage from './BlogImage';

interface Post {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content?: string;
  category: string;
  image: string;
  created_at: string;
  source?: string;
}

export default function BlogList({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  useEffect(() => {
    const channel = supabase
      .channel('blog-updates')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'posts' },
        (payload) => {
          const newPost = payload.new as Post;
          setPosts((current) => [newPost, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return 'Data indisponível';
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '3rem' }}>
      {posts.map((post) => (
        <Link 
          href={`/blog/${cleanSlug(post.slug)}`} 
          key={post.id} 
          className="blog-card"
          style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', group: 'true' } as any}
        >
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: '240px', 
            borderRadius: '20px', 
            overflow: 'hidden', 
            marginBottom: '1.5rem',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
            background: '#1e293b'
          }}>
            <BlogImage 
              src={post.image} 
              alt={post.title} 
              fallback={`https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop&sig=${post.id}`}
              secondary={post.content || post.summary}
              title={post.title}
            />
            <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--accent)', color: '#000', padding: '0.3rem 1rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
              {post.category || 'Mercado'}
            </div>
          </div>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
              <span>{formatDate(post.created_at || new Date().toISOString())}</span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(0,0,0,0.1)' }}></span>
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{post.source || 'Suno Notícias'}</span>
            </div>
            
            <h3 style={{ fontSize: '1.6rem', lineHeight: 1.2, marginBottom: '1rem', fontWeight: 800, color: '#000000', fontFamily: 'Outfit', letterSpacing: '-0.5px' }}>
              {post.title}
            </h3>
            
            <p style={{ fontSize: '1rem', color: '#1e293b', lineHeight: 1.6, marginBottom: '2rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {post.summary?.replace(/<[^>]*>/g, '')}
            </p>
            
            <div style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', color: '#0f172a', fontWeight: 700, fontSize: '0.95rem', borderBottom: '2px solid var(--accent)', paddingBottom: '4px', width: 'fit-content' }}>
              Ler reportagem &rarr;
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

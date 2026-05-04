'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

interface Post {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  image: string;
  created_at: string;
  source?: string;
}

export default function BlogList({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  useEffect(() => {
    // Configura o Radar Realtime do Supabase
    const channel = supabase
      .channel('blog-updates')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'posts' },
        (payload) => {
          console.log('Nova notícia detectada!', payload);
          const newPost = payload.new as Post;
          // Adiciona a nova notícia no topo da lista
          setPosts((current) => [newPost, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
      {posts.map((post) => (
        <Link href={`/blog/${post.slug}`} key={post.id} className="animate-fade-in-up" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
          <div className="glass-panel" style={{ 
            padding: '0', 
            borderRadius: '16px', 
            overflow: 'hidden', 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            transition: 'transform 0.3s ease, border-color 0.3s ease',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{ position: 'relative', width: '100%', height: '200px' }}>
              <Image src={post.image || 'https://images.unsplash.com/photo-1611974717482-982c7a6b444a?q=80&w=2070&auto=format&fit=crop'} alt={post.title} fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--accent)', color: 'white', padding: '0.2rem 0.8rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>
                {post.category}
              </div>
            </div>
            
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                <span>{formatDate(post.created_at || new Date().toISOString())}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: post.source ? '#10b981' : 'var(--accent)' }}></span>
                  {post.source || 'Athos AI'}
                </span>
              </div>
              
              <h3 style={{ fontSize: '1.4rem', lineHeight: 1.3, marginBottom: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{post.title}</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {post.summary}
              </p>
              
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', color: 'var(--accent)', fontWeight: 700, fontSize: '0.9rem' }}>
                Continuar lendo <span style={{ marginLeft: '0.5rem' }}>→</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

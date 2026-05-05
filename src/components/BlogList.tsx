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

  // Função para limpar o slug de forma profunda
  const cleanSlug = (slug: string) => {
    if (!slug) return 'noticia-sem-link';
    return slug
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^\w\s-]/g, '')       // Remove caracteres especiais como $, %, ,
      .replace(/\s+/g, '-')           // Troca espaços por traços
      .replace(/-+/g, '-');           // Remove traços duplos
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
            <img 
              src={post.image?.startsWith('http') ? post.image : `https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop&sig=${post.id}`} 
              alt={post.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
              className="hover-scale"
              onError={(e: any) => e.target.src = `https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop&sig=${post.id}`}
            />
            <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--accent)', color: '#000', padding: '0.3rem 1rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
              {post.category || 'Mercado'}
            </div>
          </div>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', fontSize: '0.85rem', color: '#94a3b8' }}>
              <span>{formatDate(post.created_at || new Date().toISOString())}</span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }}></span>
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{post.source || 'Suno Notícias'}</span>
            </div>
            
            <h3 style={{ fontSize: '1.6rem', lineHeight: 1.2, marginBottom: '1rem', fontWeight: 800, color: '#fff', fontFamily: 'Outfit', letterSpacing: '-0.5px' }}>
              {post.title}
            </h3>
            
            <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.6, marginBottom: '2rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {post.summary?.replace(/<[^>]*>/g, '')}
            </p>
            
            <div style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', color: '#fff', fontWeight: 700, fontSize: '0.95rem', borderBottom: '2px solid var(--accent)', paddingBottom: '4px', width: 'fit-content' }}>
              Ler reportagem &rarr;
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

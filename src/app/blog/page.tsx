import Link from 'next/link';
import Image from 'next/image';
import { siteContent } from '@/data/content';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'Blog & Atualizações | Athos',
  description: 'Novidades do mundo financeiro e próximos treinamentos da Athos Soluções Financeiras.'
};

export default async function Blog() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) console.error('Supabase fetch error:', error);
  const displayPosts = (posts && posts.length > 0) ? posts : siteContent.blog.posts;

  return (
    <main style={{ position: 'relative', overflow: 'clip', minHeight: '100vh' }}>
      <div className="glow-bg"></div>
      
      <nav style={{ padding: '1.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-main)' }}>
            <Link href="/">ATHOS<span style={{ color: 'var(--accent)' }}>.</span></Link>
          </div>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <Link href="/" className="btn" style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>Voltar ao Site</Link>
          </div>
        </div>
      </nav>

      <section className="section" style={{ paddingTop: '6rem' }}>
        <div className="container">
          <h1 className="section-title">{siteContent.blog.title}</h1>
          <p className="section-subtitle">{siteContent.blog.subtitle}</p>
          


          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            {displayPosts.map((post: any, index: number) => (
              <div key={post.id} className={`glass-panel animate-fade-in-up ${index > 0 ? 'delay-1' : ''}`} style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', gap: '1.5rem', borderRadius: '20px' }}>
                <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden' }}>
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                    className="hover-scale"
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '0.5rem' }}>{post.category}</span>
                  <h2 style={{ fontSize: '1.4rem', margin: '0 0 1rem 0', lineHeight: 1.3, fontWeight: 700 }}>{post.title}</h2>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6, fontSize: '0.95rem', flex: 1 }}>{post.summary}</p>
                  <Link href={`/blog/${post.slug}`} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.95rem', alignSelf: 'flex-start', borderRadius: '8px' }}>
                    Ler mais
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link href="/" className="btn glass-panel" style={{ padding: '1rem 2rem', fontSize: '1.1rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)' }}>
              &larr; Voltar para a Página Inicial
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

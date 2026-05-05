import Link from 'next/link';
import { siteContent } from '@/data/content';
import { supabase } from '@/lib/supabase';
import BlogList from '@/components/BlogList';

export const metadata = {
  title: 'Blog & Atualizações | Athos',
  description: 'Novidades do mundo financeiro e próximos treinamentos da Athos Soluções Financeiras.'
};

export const dynamic = 'force-dynamic';

export default async function Blog() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) console.error('Supabase fetch error:', error);
  
  // Mescla as notícias do banco (Supabase) com as notícias locais de forma segura
  let staticPosts = siteContent.blog.posts;
  try {
    const localPosts = require('../../../src/data/posts.json');
    if (Array.isArray(localPosts)) {
      staticPosts = [...localPosts, ...staticPosts];
    }
  } catch (e) {
    console.error('Erro ao carregar posts locais:', e);
  }

  const initialPosts = [...(posts || []), ...staticPosts];

  return (
    <main style={{ position: 'relative', overflow: 'clip', minHeight: '100vh', background: '#0a0f18' }}>
      <div className="glow-bg" style={{ opacity: 0.3 }}></div>
      
      {/* Nav Minimalista Estilo Portal */}
      <nav style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(10, 15, 24, 0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.4rem', color: 'var(--text-main)' }}>
            <Link href="/">ATHOS<span style={{ color: 'var(--accent)' }}>.</span><span style={{ fontSize: '0.8rem', fontWeight: 400, marginLeft: '0.5rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px' }}>Portal</span></Link>
          </div>
          <Link href="/" className="btn" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>Voltar ao Site</Link>
        </div>
      </nav>

      <section className="section" style={{ paddingTop: '5rem', background: 'linear-gradient(to bottom, #0f172a 0%, #020617 100%)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Insights Financeiros</span>
            <h1 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-2px', color: '#fff', fontFamily: 'Outfit' }}>{siteContent.blog.title}</h1>
            <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>{siteContent.blog.subtitle}</p>
          </div>
          
          <BlogList initialPosts={initialPosts as any} />
        </div>
      </section>
    </main>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { siteContent } from '@/data/content';
import { supabase } from '@/lib/supabase';

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
  const displayPosts = (posts && posts.length > 0) ? posts : siteContent.blog.posts;

  // Função para formatar a data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

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

      <section className="section" style={{ paddingTop: '4rem' }}>
        <div className="container">
          <div style={{ borderLeft: '4px solid var(--accent)', paddingLeft: '1.5rem', marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-1px' }}>{siteContent.blog.title}</h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px' }}>{siteContent.blog.subtitle}</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {displayPosts.map((post: any, index: number) => (
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
                    <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--accent)', color: 'white', padding: '0.2rem 0.8rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>
                      {post.category}
                    </div>
                  </div>
                  
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                      <span>{formatDate(post.created_at || new Date())}</span>
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
        </div>
      </section>
    </main>
  );
}

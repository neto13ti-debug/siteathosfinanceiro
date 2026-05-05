import { siteContent } from '@/data/content';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: post } = await supabase
    .from('posts')
    .select('title')
    .eq('slug', slug)
    .single();

  if (!post) return { title: 'Post não encontrado' };
  return { title: `${post.title} | Athos Blog` };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Tenta buscar no Supabase (limpando o slug para busca mais flexível)
  const decodedSlug = decodeURIComponent(slug);
  const searchTitle = decodedSlug.replace(/suno-/g, '').replace(/-/g, ' ').trim();
  
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .or(`slug.eq."${decodedSlug}",slug.eq."${slug}",title.ilike.%${searchTitle}%`)
    .limit(1)
    .single();

  // Fallback para o JSON se não encontrar no banco
  const displayPost = post || siteContent.blog.posts.find(p => p.slug === slug);

  if (!displayPost) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>Post não encontrado</h1>
          <Link href="/blog" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Voltar ao Blog</Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: '#0a0f18', color: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <nav style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)', background: '#0a0f18', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/blog" style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.5rem', color: '#fff' }}>
            ATHOS<span style={{ color: 'var(--accent)' }}>.</span><span style={{ fontSize: '0.8rem', opacity: 0.6, marginLeft: '8px', fontWeight: 400 }}>PORTAL</span>
          </Link>
          <Link href="/blog" style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 600 }}>&larr; Voltar ao Blog</Link>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '4rem', alignItems: 'start' }}>
          
          {/* Coluna Principal: Conteúdo */}
          <article>
            <header style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                <span style={{ color: 'var(--accent)' }}>{displayPost.category || 'Mercado'}</span>
                <span style={{ opacity: 0.3 }}>|</span>
                <span style={{ color: '#94a3b8' }}>{new Date(displayPost.created_at || new Date()).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
              </div>
              <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, fontWeight: 900, marginBottom: '2rem', letterSpacing: '-2px', color: '#fff', fontFamily: 'Outfit' }}>
                {displayPost.title}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#000' }}>A</div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{displayPost.source || 'Suno Notícias'}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>Especialista Athos Financial</div>
                </div>
              </div>
            </header>

            <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '24px', overflow: 'hidden', marginBottom: '3rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', background: '#1e293b' }}>
              <img 
                src={displayPost.image?.startsWith('http') ? displayPost.image : 'https://images.unsplash.com/photo-1611974717482-982c7a6b444a?q=80&w=2070&auto=format&fit=crop'} 
                alt={displayPost.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            <div style={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#cbd5e1', maxWidth: '100%' }}>
              <p style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 500, marginBottom: '2.5rem', lineHeight: 1.6, borderLeft: '4px solid var(--accent)', paddingLeft: '2rem' }}>
                {displayPost.summary?.replace(/<[^>]*>/g, '')}
              </p>
              
              <div 
                className="post-content"
                style={{ fontSize: '1.15rem' }}
                dangerouslySetInnerHTML={{ __html: displayPost.content }} 
              />
            </div>
          </article>

          {/* Coluna Lateral: Sidebar */}
          <aside style={{ position: 'sticky', top: '6rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(30, 41, 59, 0.3)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', color: '#fff', borderBottom: '2px solid var(--accent)', display: 'inline-block', paddingBottom: '5px' }}>
                Relacionados
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {siteContent.blog.posts
                  .filter(p => p.slug !== displayPost.slug)
                  .slice(0, 3)
                  .map(related => (
                    <Link href={`/blog/${related.slug}`} key={related.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div style={{ width: '80px', height: '80px', flexShrink: 0, borderRadius: '12px', overflow: 'hidden', background: '#1e293b' }}>
                        <img src={related.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <h4 style={{ fontSize: '0.95rem', lineHeight: 1.3, fontWeight: 600, color: '#f1f5f9', margin: 0 }}>{related.title}</h4>
                    </Link>
                  ))
                }
              </div>

              <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--accent)', borderRadius: '16px', color: '#000', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '1rem' }}>Precisa de ajuda no seu financeiro?</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: 500, opacity: 0.8 }}>Nós cuidamos da burocracia para você focar no lucro.</p>
                <Link href="/#contato" className="btn" style={{ background: '#000', color: '#fff', width: '100%', display: 'block', padding: '0.8rem', borderRadius: '8px', fontWeight: 700 }}>Falar com Especialista</Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}

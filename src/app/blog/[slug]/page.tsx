import { siteContent } from '@/data/content';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const { data: post } = await supabase
      .from('posts')
      .select('title')
      .eq('slug', slug)
      .maybeSingle();

    if (!post) return { title: 'Post não encontrado | Athos Blog' };
    return { title: `${post.title} | Athos Blog` };
  } catch (e) {
    return { title: 'Blog | Athos Financial' };
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    // Tenta buscar no Supabase ignorando o prefixo "suno-"
    const decodedSlug = decodeURIComponent(slug);
    const cleanTerm = decodedSlug.replace(/suno-/g, '').split('-')[0]; // Pega a primeira palavra real da notícia
    
    const { data: post } = await supabase
      .from('posts')
      .select('*')
      .or(`slug.eq."${decodedSlug}",title.ilike.%${cleanTerm}%`)
      .limit(1)
      .maybeSingle();

    // Fallback para o conteúdo principal do site
    const displayPost = post || siteContent.blog.posts.find(p => p.slug === slug);

    if (!displayPost) {
      return (
        <main style={{ background: '#020408', color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Post não encontrado</h2>
          <Link href="/blog" className="btn btn-primary" style={{ padding: '1rem 2rem', background: 'var(--accent)', color: '#000', borderRadius: '12px', fontWeight: 800 }}>Voltar ao Blog</Link>
        </main>
      );
    }

  return (
    <main style={{ background: '#020408', color: '#e2e8f0', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <nav style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(2, 4, 8, 0.95)', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(10px)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/blog" style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.5rem', color: '#fff', display: 'flex', alignItems: 'center' }}>
            ATHOS<span style={{ color: 'var(--accent)' }}>.</span><span style={{ fontSize: '0.75rem', opacity: 0.5, marginLeft: '8px', fontWeight: 400, letterSpacing: '2px' }}>PORTAL</span>
          </Link>
          <Link href="/blog" className="hover-accent" style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 600, transition: 'color 0.3s' }}>&larr; Voltar ao Blog</Link>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '5rem', paddingBottom: '8rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '5rem', alignItems: 'start' }}>
          
          {/* Coluna Principal: Conteúdo */}
          <article>
            <header style={{ marginBottom: '4rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 800 }}>
                <span style={{ background: 'var(--accent)', color: '#000', padding: '2px 8px', borderRadius: '4px' }}>{displayPost.category || 'Mercado'}</span>
                <span style={{ opacity: 0.2 }}>•</span>
                <span style={{ color: '#64748b' }}>{new Date(displayPost.created_at || new Date()).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
              </div>
              <h1 style={{ fontSize: '3.8rem', lineHeight: 1.05, fontWeight: 900, marginBottom: '2.5rem', letterSpacing: '-3px', color: '#fff', fontFamily: 'Outfit' }}>
                {displayPost.title}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent) 0%, #d97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#000', fontSize: '1.2rem' }}>A</div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{displayPost.source || 'Suno Notícias'}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Análise Financial Athos</div>
                </div>
              </div>
            </header>

            <div style={{ position: 'relative', width: '100%', height: '500px', borderRadius: '28px', overflow: 'hidden', marginBottom: '4rem', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <img 
                src={displayPost.image?.includes('http') ? displayPost.image : 'https://images.unsplash.com/photo-1611974717482-982c7a6b444a?q=80&w=2070&auto=format&fit=crop'} 
                alt={displayPost.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            <div style={{ fontSize: '1.25rem', lineHeight: 1.9, color: '#cbd5e1', maxWidth: '100%', textAlign: 'justify' }}>
              {/* Removido o resumo duplicado para fluidez de leitura */}
              <div 
                className="post-content-portal"
                dangerouslySetInnerHTML={{ __html: displayPost.content }} 
              />
            </div>
          </article>

          {/* Coluna Lateral: Sidebar */}
          <aside style={{ position: 'sticky', top: '7rem' }}>
            <div style={{ padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(2, 4, 8, 0.6) 100%)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '2rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '12px', height: '2px', background: 'var(--accent)' }}></span>
                Relacionados
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {siteContent.blog.posts
                  .filter(p => p.slug !== displayPost.slug)
                  .slice(0, 3)
                  .map(related => (
                    <Link href={`/blog/${related.slug}`} key={related.id} className="sidebar-item" style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', textDecoration: 'none' }}>
                      <div style={{ width: '90px', height: '90px', flexShrink: 0, borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <img src={related.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <h4 style={{ fontSize: '1rem', lineHeight: 1.4, fontWeight: 700, color: '#f1f5f9', margin: 0 }}>{related.title}</h4>
                    </Link>
                  ))
                }
              </div>

              <div style={{ marginTop: '4rem', padding: '2.5rem', background: 'linear-gradient(135deg, var(--accent) 0%, #d97706 100%)', borderRadius: '24px', color: '#000', textAlign: 'center', boxShadow: '0 20px 40px rgba(245, 158, 11, 0.2)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.2rem', lineHeight: 1.2 }}>Precisa de ajuda no seu financeiro?</h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '2rem', fontWeight: 600, opacity: 0.9 }}>Nós cuidamos da burocracia para você focar no lucro real.</p>
                <Link href="/#contato" className="btn" style={{ background: '#000', color: '#fff', width: '100%', display: 'block', padding: '1rem', borderRadius: '12px', fontWeight: 800, fontSize: '1rem', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>Falar com Especialista</Link>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* Rodapé do Portal */}
      <footer style={{ background: '#010204', padding: '5rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '2rem', color: '#fff', marginBottom: '2rem' }}>
            ATHOS<span style={{ color: 'var(--accent)' }}>.</span>
          </div>
          <p style={{ color: '#475569', maxWidth: '500px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
            Inteligência financeira para empresas que buscam alta performance e crescimento sustentável.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', fontSize: '0.9rem', color: '#94a3b8' }}>
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/#servicos">Soluções</Link>
            <Link href="/#contato">Contato</Link>
          </div>
          <div style={{ marginTop: '4rem', fontSize: '0.8rem', color: '#1e293b' }}>
            © {new Date().getFullYear()} Athos Financial Gestão e BPO. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </main>
    );
  } catch (error) {
    console.error('Global Blog Error:', error);
    return (
      <main style={{ background: '#020408', color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', opacity: 0.7 }}>Ocorreu um erro ao carregar esta notícia.</h2>
        <Link href="/blog" style={{ color: 'var(--accent)', fontWeight: 700 }}>Voltar para a lista de notícias</Link>
      </main>
    );
  }
}

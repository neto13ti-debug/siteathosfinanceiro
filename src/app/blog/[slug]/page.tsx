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
  
  // Tenta buscar no Supabase
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
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
    <main style={{ position: 'relative', overflow: 'clip', minHeight: '100vh' }}>
      <div className="glow-bg"></div>
      
      <nav style={{ padding: '1.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-main)' }}>
            <Link href="/">ATHOS<span style={{ color: 'var(--accent)' }}>.</span></Link>
          </div>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <Link href="/blog">Voltar ao Blog</Link>
          </div>
        </div>
      </nav>

      <article className="section" style={{ paddingTop: '6rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="animate-fade-in-up">
            <span style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 'bold' }}>{displayPost.category}</span>
            <h1 style={{ fontSize: '2.5rem', margin: '1rem 0 2rem 0', lineHeight: 1.2 }}>{displayPost.title}</h1>
            
            <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden', marginBottom: '3rem' }}>
              <Image 
                src={displayPost.image} 
                alt={displayPost.title} 
                fill 
                style={{ objectFit: 'cover' }} 
              />
            </div>
            
            <div className="glass-panel" style={{ padding: '2rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>{displayPost.summary}</p>
              <div dangerouslySetInnerHTML={{ __html: displayPost.content }} />
            </div>
            
            {/* CTA Section */}
            <div className="glass-panel" style={{ marginTop: '3rem', padding: '3rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.9) 100%)', border: '1px solid var(--accent)' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--text-main)', fontWeight: 800 }}>Sua empresa está perdendo dinheiro com processos financeiros desorganizados?</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
                A Athos oferece serviços de <strong>BPO Financeiro</strong> para tirar a dor de cabeça da sua rotina. Nós cuidamos das contas a pagar, receber, fluxo de caixa e conciliação bancária, enquanto você foca no que realmente importa: <strong>fazer o seu negócio crescer</strong>.
              </p>
              <Link href="/#servicos" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Conheça Nossas Soluções
              </Link>
            </div>

            {/* Related Posts Section */}
            <div style={{ marginTop: '5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '4rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', fontWeight: 700 }}>Leia também</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {siteContent.blog.posts
                  .filter(p => p.slug !== displayPost.slug)
                  .slice(0, 3)
                  .map(relatedPost => (
                    <div key={relatedPost.id} className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ position: 'relative', width: '100%', height: '140px', borderRadius: '8px', overflow: 'hidden' }}>
                        <Image src={relatedPost.image} alt={relatedPost.title} fill style={{ objectFit: 'cover' }} className="hover-scale" />
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{relatedPost.category}</span>
                        <h4 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0', lineHeight: 1.3 }}>{relatedPost.title}</h4>
                        <Link href={`/blog/${relatedPost.slug}`} style={{ marginTop: 'auto', color: '#3b82f6', fontSize: '0.9rem', fontWeight: 'bold' }}>
                          Ler artigo &rarr;
                        </Link>
                      </div>
                    </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </article>
    </main>
  );
}

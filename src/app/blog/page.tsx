import Link from 'next/link';
import { siteContent } from '@/data/content';
import { supabase } from '@/lib/supabase';
import BlogList from '@/components/BlogList';
import { cleanSlug } from '@/lib/utils';
import FeaturedCarousel from '@/components/FeaturedCarousel';

export const metadata = {
  title: 'Blog & Atualizações | Athos',
  description: 'Novidades do mundo financeiro e próximos treinamentos da Athos Soluções Financeiras.'
};

export const dynamic = 'force-dynamic';

export default async function Blog(props: { searchParams: Promise<{ cat?: string }> }) {
  const searchParams = await props.searchParams;
  const category = searchParams.cat;

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  // Mescla apenas Supabase e conteúdo principal do site
  let allPosts = [...(posts || []), ...siteContent.blog.posts];
  
  // Filtramos por categoria se houver uma selecionada
  if (category) {
    allPosts = allPosts.filter(p => {
      const catLower = p.category?.toLowerCase() || '';
      const titleLower = p.title?.toLowerCase() || '';
      const content = catLower + titleLower;

      if (category === 'acoes') return content.includes('acao') || content.includes('acoes') || content.includes('bolsa') || content.includes('mercado');
      if (category === 'fii') return content.includes('fundo') || content.includes('imobiliario') || content.includes('fii') || content.includes('ifix');
      if (category === 'macro') return content.includes('economia') || content.includes('politica') || content.includes('macro') || content.includes('fed') || content.includes('copom');
      return true;
    });
  }

  // Pegamos as 2 notícias mais recentes que batem com a categoria
  const latestNews = (posts || []).filter(p => {
    if (!category) return true;
    const catLower = p.category?.toLowerCase() || '';
    const titleLower = p.title?.toLowerCase() || '';
    const content = catLower + titleLower;

    if (category === 'acoes') return content.includes('acao') || content.includes('acoes') || content.includes('bolsa') || content.includes('mercado');
    if (category === 'fii') return content.includes('fundo') || content.includes('imobiliario') || content.includes('fii') || content.includes('ifix');
    if (category === 'macro') return content.includes('economia') || content.includes('politica') || content.includes('macro') || content.includes('fed') || content.includes('copom');
    return true;
  }).slice(0, 2);
  
  // Buscamos a postagem específica de BPO que criamos (sempre incluída se não estiver filtrando ou se bater com a categoria)
  const bpoHighlight = [...(posts || []), ...siteContent.blog.posts].find(p => p.slug === 'bpo-financeiro-dores-e-solucoes');
  
  // Montamos o carrossel: 2 notícias recentes + 1 destaque BPO
  const featuredPosts = [...latestNews, ...(bpoHighlight ? [bpoHighlight] : [])];
  
  // O restante das notícias vai para a lista (excluindo as que já estão no destaque)
  const featuredIds = new Set(featuredPosts.map(p => p.id));
  const remainingPosts = allPosts.filter(p => !featuredIds.has(p.id));

  return (
    <main style={{ position: 'relative', overflow: 'clip', minHeight: '100vh', background: '#f8fafc' }}>
      
      {/* Nav Minimalista Estilo Portal */}
      <nav style={{ padding: '1rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.6rem', color: '#1e293b' }}>
            <Link href="/blog">ATHOS<span style={{ color: 'var(--accent)' }}>.</span><span style={{ fontSize: '0.8rem', fontWeight: 500, marginLeft: '0.5rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '1px' }}>Portal de Notícias</span></Link>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>
            <Link href="/blog?cat=acoes" style={{ color: category === 'acoes' ? 'var(--accent)' : 'inherit', cursor: 'pointer' }}>Ações</Link>
            <Link href="/blog?cat=fii" style={{ color: category === 'fii' ? 'var(--accent)' : 'inherit', cursor: 'pointer' }}>Fundos Imobiliários</Link>
            <Link href="/blog?cat=macro" style={{ color: category === 'macro' ? 'var(--accent)' : 'inherit', cursor: 'pointer' }}>Macroeconomia</Link>
          </div>
          <Link href="/" className="btn" style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem', background: '#0f172a', color: '#fff', borderRadius: '8px' }}>Voltar ao Site</Link>
        </div>
      </nav>

      <section style={{ padding: '4rem 0', background: '#fff' }}>
        <div className="container">
          
          {/* Carrossel de Destaques (Top 3) */}
          <FeaturedCarousel posts={featuredPosts as any} />

          {/* Banner de Propaganda 1 */}
          <div style={{ marginBottom: '5rem', background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 100%)', borderRadius: '20px', padding: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 800 }}>Oportunidade</span>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0' }}>Mentoria Athos: 10 Vagas Restantes</h3>
              <p style={{ color: '#94a3b8' }}>Domine as finanças da sua empresa com acompanhamento individual.</p>
            </div>
            <Link href="/#contato" className="btn btn-primary" style={{ position: 'relative', zIndex: 1 }}>Saber Mais &rarr;</Link>
            <div style={{ position: 'absolute', right: '-10%', top: '-20%', width: '300px', height: '300px', background: 'var(--accent)', opacity: 0.1, filter: 'blur(80px)', borderRadius: '50%' }}></div>
          </div>
          
          <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f1f5f9', paddingBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit' }}>
              {category ? `Notícias: ${category.toUpperCase()}` : 'Mais Notícias'}
            </h3>
          </div>

          {remainingPosts.length > 0 ? (
            <BlogList initialPosts={remainingPosts as any} />
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem 0', background: '#f8fafc', borderRadius: '24px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>Nenhuma notícia encontrada nesta categoria</h4>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Tente outra categoria ou veja todas as notícias.</p>
              <Link href="/blog" className="btn btn-primary">Ver Todas as Notícias</Link>
            </div>
          )}

          {/* Rodapé do Blog */}
          <div style={{ marginTop: '6rem', padding: '4rem', background: '#f8fafc', borderRadius: '32px', textAlign: 'center' }}>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Assine nossa Newsletter</h4>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>Receba os destaques do mercado financeiro direto no seu e-mail.</p>
            <form style={{ display: 'flex', gap: '1rem', maxWidth: '500px', margin: '0 auto' }} action="#">
              <input type="email" placeholder="Seu e-mail" required style={{ flex: 1, padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <button type="submit" className="btn btn-primary">Assinar</button>
            </form>
          </div>

        </div>
      </section>
    </main>
  );
}

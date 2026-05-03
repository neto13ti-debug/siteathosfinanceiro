import GenerateNewsButton from '@/components/GenerateNewsButton';
import Link from 'next/link';

export const metadata = {
  title: 'Admin | Gerador de Notícias',
};

export default function AdminPage() {
  return (
    <main style={{ position: 'relative', overflow: 'clip', minHeight: '100vh', padding: '4rem 2rem' }}>
      <div className="glow-bg"></div>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Área Restrita (Admin)</h1>
          <Link href="/blog" className="btn glass-panel" style={{ padding: '0.5rem 1rem' }}>Voltar ao Blog Público</Link>
        </div>
        
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            ATENÇÃO: Em servidores como a Vercel, este botão não conseguirá salvar as notícias permanentemente porque arquivos locais não podem ser alterados na nuvem.
            Para escalar esse sistema, será necessário plugar um banco de dados como o Supabase.
          </p>
          <GenerateNewsButton />
        </div>
      </div>
    </main>
  );
}

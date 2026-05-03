'use client';
import { useState } from 'react';

export default function GenerateNewsButton() {
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState('');

  const handleGenerate = async (provider) => {
    setLoading(provider);
    setMessage(`Solicitando ao agente ${provider.toUpperCase()}... (pode levar uns segundos)`);
    try {
      const res = await fetch('/api/generate-news', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider })
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessage(`Sucesso! Notícia gerada com ${provider.toUpperCase()}: ${data.post.title}`);
        setTimeout(() => window.location.reload(), 2000);
      } else {
        setMessage(`Erro no ${provider.toUpperCase()}: ${data.error}`);
      }
    } catch (err) {
      setMessage(`Erro: ${err.message}`);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
      <h3 style={{ color: '#3b82f6', marginBottom: '0.5rem', fontSize: '1.2rem' }}>🤖 Central de Testes de Agentes IA</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Escolha qual Inteligência Artificial deve escrever a notícia. 
        As chaves devem estar configuradas no seu arquivo <code>.env.local</code>.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button 
          onClick={() => handleGenerate('gemini')} 
          disabled={loading !== null}
          className="btn"
          style={{ background: loading === 'gemini' ? '#64748b' : '#3b82f6', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading === 'gemini' ? 'Gerando...' : 'Gerar com Gemini'}
        </button>
        
        <button 
          onClick={() => handleGenerate('openai')} 
          disabled={loading !== null}
          className="btn"
          style={{ background: loading === 'openai' ? '#64748b' : '#10a37f', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading === 'openai' ? 'Gerando...' : 'Gerar com ChatGPT'}
        </button>

        <button 
          onClick={() => handleGenerate('groq')} 
          disabled={loading !== null}
          className="btn"
          style={{ background: loading === 'groq' ? '#64748b' : '#f59e0b', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading === 'groq' ? 'Gerando...' : 'Gerar com Groq (100% Grátis)'}
        </button>
      </div>

      {message && <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: message.includes('Erro') ? '#ef4444' : '#22c55e' }}>{message}</p>}
    </div>
  );
}

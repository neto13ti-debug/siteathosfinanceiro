import { siteContent } from '@/data/content';
import Image from 'next/image';
import Link from 'next/link';
import './globals.css';

export default function Home() {
  return (
    <main style={{ position: 'relative', overflow: 'clip' }}>
      <div className="glow-bg"></div>
      <div className="glow-bg-2"></div>
      <div className="finance-watermark"></div>
      
      {/* Navbar Placeholder */}
      <nav style={{ padding: '1.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'fixed', top: 0, width: '100%', zIndex: 50, background: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(10px)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.8rem', color: 'var(--text-main)', letterSpacing: '-1px' }}>
            ATHOS<span className="text-gradient">.</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '1rem', color: 'var(--text-muted)' }}>
            <a href="#sobre" className="nav-link">Quem Somos</a>
            <a href="#servicos" className="nav-link">Soluções</a>
            <Link href="/blog" className="nav-link" style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Blog</Link>
            <a href="#contato" className="nav-link">Contato</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '6rem' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h1 className="animate-fade-in-up" style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.2, letterSpacing: '-0.5px' }}>
              Excelência em <span className="text-gradient">Gestão e BPO</span> Financeiro
            </h1>
            <p className="section-subtitle animate-fade-in-up delay-1" style={{ fontSize: '1.15rem', textAlign: 'left', margin: '0 0 2.5rem 0' }}>
              {siteContent.hero.subtitle}
            </p>
            <div className="animate-fade-in-up delay-2" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={`https://wa.me/${siteContent.contact.whatsapp}?text=Olá! Gostaria de falar com um especialista da Athos.`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Falar com Especialista
              </a>
              <a href="#servicos" className="btn glass-panel" style={{ padding: '1rem 2.5rem', background: 'rgba(255,255,255,0.05)' }}>Ver Soluções</a>
              <Link href="/blog" className="btn glass-panel" style={{ padding: '1rem 2.5rem', background: 'var(--primary)', color: '#fff', border: '1px solid var(--accent)' }}>Acessar Blog</Link>
            </div>
          </div>
          <div className="animate-fade-in-up delay-3 image-glow animate-float" style={{ position: 'relative', height: '450px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}>
            <Image 
              src={siteContent.hero.image} 
              alt="Gestão Financeira" 
              fill 
              style={{ objectFit: 'cover' }} 
              priority
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2,6,23,0.9), transparent)' }}></div>
          </div>
        </div>
      </section>

      {/* Logos Marquee */}
      <div className="marquee-container">
        <div className="marquee-content">
          {[...siteContent.partners, ...siteContent.partners].map((partner, index) => (
            <div key={`${partner.id}-${index}`} className="marquee-item">
              <Image 
                src={partner.url} 
                alt={partner.name} 
                fill 
                style={{ objectFit: 'contain' }} 
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Promo Banner Section (Estilo Suno / Infomoney) */}
      {siteContent.promo.show && (
        <section style={{ background: '#020617', padding: '4rem 0', borderTop: '1px solid rgba(245, 158, 11, 0.2)', borderBottom: '1px solid rgba(245, 158, 11, 0.2)', position: 'relative', overflow: 'hidden' }}>
          {/* Luz de fundo para o Banner */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '200px', background: 'rgba(245, 158, 11, 0.1)', filter: 'blur(100px)', zIndex: 0 }}></div>
          
          <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <span style={{ background: 'var(--accent)', color: '#000', padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem', display: 'inline-block' }}>
                {siteContent.promo.badge}
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', color: '#fff', letterSpacing: '-1px' }}>
                {siteContent.promo.title}
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px' }}>
                {siteContent.promo.subtitle}
              </p>
            </div>
            
            <div style={{ flexShrink: 0 }}>
              <a href={siteContent.promo.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem', background: '#fff', color: '#000', boxShadow: '0 10px 30px rgba(255,255,255,0.1)' }}>
                {siteContent.promo.cta} &rarr;
              </a>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="sobre" className="section" style={{ background: 'rgba(15, 23, 42, 0.5)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', height: '500px', width: '100%' }} className="animate-float">
               <Image 
                  src={siteContent.about.image} 
                  alt="Mapa de Atuação Athos" 
                  fill 
                  style={{ objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(245, 158, 11, 0.2))', mixBlendMode: 'screen' }} 
                />
            </div>
            <div>
              <h2 className="section-title" style={{ textAlign: 'left' }}>{siteContent.about.title}</h2>
              <div style={{ width: '60px', height: '4px', background: 'var(--accent)', marginBottom: '2rem', borderRadius: '2px' }}></div>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                {siteContent.about.description}
              </p>
              <p style={{ color: 'var(--text-main)', fontWeight: 500, fontSize: '1.1rem', paddingLeft: '1rem', borderLeft: '3px solid var(--accent)', marginBottom: '2rem' }}>
                {siteContent.about.mission}
              </p>
              <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ fontSize: '3rem' }}>🏆</div>
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>+3 Anos de Mercado</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Atuando em todo o Brasil com excelência.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="section">
        <div className="container">
          <h2 className="section-title">{siteContent.services.title}</h2>
          <p className="section-subtitle">Soluções personalizadas para impulsionar a gestão financeira da sua empresa.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem', marginTop: '4rem' }}>
            {siteContent.services.items.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={service.id} className="animate-fade-in-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                  
                  {/* Image Side */}
                  <div style={{ order: isEven ? 1 : 2, position: 'relative', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} className="image-glow">
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      style={{ objectFit: 'cover' }} 
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.8), transparent)' }}></div>
                  </div>

                  {/* Text Side */}
                  <div style={{ order: isEven ? 2 : 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '3rem' }}>{service.icon}</span>
                      <h3 style={{ fontSize: '2.5rem', fontWeight: 800 }}>{service.title}</h3>
                    </div>
                    
                    <div style={{ marginBottom: '2rem' }}>
                      <p style={{ color: '#ef4444', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1.1rem' }}>❌ A Dor:</p>
                      <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, borderLeft: '2px solid #ef4444', paddingLeft: '1rem' }}>{service.pain}</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                      <p style={{ color: '#22c55e', fontWeight: 600, marginBottom: '0.5rem', fontSize: '1.1rem' }}>✅ A Solução:</p>
                      <p style={{ color: 'var(--text-main)', lineHeight: 1.6, borderLeft: '2px solid #22c55e', paddingLeft: '1rem' }}>{service.solution}</p>
                    </div>

                    <div>
                      <h4 style={{ color: 'var(--accent)', marginBottom: '1rem', fontSize: '1.2rem' }}>Como funciona (Passo a Passo):</h4>
                      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {service.steps.map((step, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
                            <span style={{ background: 'var(--accent)', color: 'var(--primary)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>{i + 1}</span>
                            <span style={{ color: 'var(--text-muted)' }}>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="feedback" className="section" style={{ background: 'rgba(15, 23, 42, 0.5)' }}>
        <div className="container">
          <h2 className="section-title">{siteContent.testimonials.title}</h2>
          <p className="section-subtitle">O sucesso dos nossos parceiros é a nossa maior conquista.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {siteContent.testimonials.items.map((testimonial, index) => (
              <div key={testimonial.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {testimonial.type === 'video' ? (
                  <div style={{ position: 'relative', width: '100%', height: '200px', background: '#000', borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                      ▶ Play Vídeo (Placeholder)
                    </div>
                  </div>
                ) : (
                  <div style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden' }}>
                    <Image 
                      src={testimonial.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"} 
                      alt="Cliente" 
                      fill 
                      style={{ objectFit: 'cover' }} 
                    />
                  </div>
                )}
                <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: 1.6 }}>"{testimonial.text}"</p>
                <div>
                  <h4 style={{ color: 'var(--accent)' }}>{testimonial.name}</h4>
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Parceiro Athos</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section (Novo) */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="container">
          <div className="card-premium" style={{ padding: '5rem', textAlign: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem', fontFamily: 'Outfit' }}>
              Mantenha sua empresa <span className="text-gradient">Atualizada</span>
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
              Receba nossa curadoria semanal com as notícias que realmente impactam o seu bolso e a gestão do seu negócio.
            </p>
            <form style={{ display: 'flex', gap: '1rem', maxWidth: '600px', margin: '0 auto', flexWrap: 'wrap' }}>
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                style={{ flex: 1, padding: '1.2rem 2rem', borderRadius: '50px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '1.1rem', outline: 'none' }}
              />
              <button type="button" className="btn btn-primary" style={{ padding: '1.2rem 3rem' }}>Assinar Agora</button>
            </form>
            <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>Respeitamos sua privacidade. Saia da lista quando quiser.</p>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contato" className="section" style={{ background: '#020617', borderTop: '1px solid rgba(255,255,255,0.05)', paddingBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-bg-2"></div>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <h2 className="section-title">Pronto para <span className="text-gradient">Evoluir?</span></h2>
          <p className="section-subtitle">Entre em contato agora e descubra como podemos alavancar os resultados da sua empresa.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', margin: '4rem 0' }}>
            <a href={`https://wa.me/${siteContent.contact.whatsapp}?text=Olá! Gostaria de falar com um especialista da Athos.`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ fontSize: '1.2rem', padding: '1.5rem 3rem' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Chamar no WhatsApp
            </a>
            <div className="glass-panel" style={{ display: 'inline-block', padding: '1rem 2rem' }}>
              <span style={{ color: 'var(--accent)', marginRight: '1rem', fontWeight: 'bold' }}>Email:</span>
              <a href={`mailto:${siteContent.contact.email}`} className="nav-link">{siteContent.contact.email}</a>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4rem' }}>
            © {new Date().getFullYear()} Athos Soluções Financeiras. Todos os direitos reservados. <br/>
            {siteContent.contact.address}
          </p>
        </div>
      </footer>
    </main>
  );
}

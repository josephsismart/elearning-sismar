import React from 'react';

const s = {
  hero: { background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', color: '#fff', padding: '80px 20px 60px', textAlign: 'center' },
  photoWrap: { width: 180, height: 180, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 24px', border: '4px solid rgba(255,255,255,0.3)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' },
  photo: { width: '100%', height: '100%', objectFit: 'cover' },
  name: { fontSize: 32, fontWeight: 700, margin: '0 0 8px', fontFamily: "'Segoe UI', sans-serif" },
  title: { fontSize: 16, opacity: 0.85, margin: '0 0 6px' },
  school: { display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: '6px 16px', marginTop: 12 },
  logoSmall: { width: 28, height: 28, borderRadius: '50%' },
  stats: { display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 32, background: '#0f3460', padding: '28px 20px', color: '#fff' },
  stat: { textAlign: 'center', minWidth: 100 },
  statNum: { fontSize: 28, fontWeight: 700, color: '#e94560' },
  statLabel: { fontSize: 12, opacity: 0.7, marginTop: 4, textTransform: 'uppercase', letterSpacing: 1 },
  section: { padding: '50px 20px', maxWidth: 900, margin: '0 auto' },
  sectionTitle: { fontSize: 24, fontWeight: 700, color: '#1a1a2e', marginBottom: 24, textAlign: 'center' },
  cards: { display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' },
  card: { flex: '1 1 260px', maxWidth: 320, background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #eee' },
  cardIcon: { fontSize: 28, marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: 600, color: '#1a1a2e', marginBottom: 8 },
  cardText: { fontSize: 14, color: '#555', lineHeight: 1.6 },
  subjectGrid: { display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' },
  subject: { background: 'linear-gradient(135deg, #1a1a2e, #0f3460)', color: '#fff', borderRadius: 10, padding: '18px 24px', minWidth: 140, textAlign: 'center', fontSize: 14, fontWeight: 500 },
  footer: { background: '#1a1a2e', color: 'rgba(255,255,255,0.6)', textAlign: 'center', padding: '24px 20px', fontSize: 13 },
  contact: { background: '#f0f4f8', padding: '40px 20px', textAlign: 'center' },
  contactInfo: { fontSize: 15, color: '#333', marginBottom: 8 },
};

function Home() {
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, sans-serif", background: '#f8f9fa', minHeight: '100vh' }}>
      <div style={s.hero}>
        <div style={s.photoWrap}><img src={process.env.PUBLIC_URL + '/images/michelle.jpg'} alt="Ms. Sismar" style={s.photo} /></div>
        <h1 style={s.name}>Marie Michelle L. Sismar</h1>
        <p style={s.title}>Licensed Professional Teacher</p>
        <p style={s.title}>Libertad National High School, Butuan City</p>
        <div style={s.school}>
          <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="LNHS" style={s.logoSmall} />
          <span style={{ fontSize: 13 }}>Department of Education - Division of Butuan City</span>
        </div>
      </div>

      <div style={s.stats}>
        {[['5','Advisory Sections'],['187','Students'],['6','Subjects'],['S.Y.','2026-2027']].map(([n,l])=>(
          <div style={s.stat} key={l}><div style={s.statNum}>{n}</div><div style={s.statLabel}>{l}</div></div>
        ))}
      </div>

      <div style={s.section}>
        <h2 style={s.sectionTitle}>About the Teacher</h2>
        <div style={s.cards}>
          <div style={s.card}>
            <div style={s.cardIcon}>\u{1F4DA}</div>
            <div style={s.cardTitle}>Teaching Philosophy</div>
            <div style={s.cardText}>Committed to nurturing every student's potential through inclusive, student-centered instruction that builds critical thinking and lifelong learning skills.</div>
          </div>
          <div style={s.card}>
            <div style={s.cardIcon}>\u{1F3AF}</div>
            <div style={s.cardTitle}>Core Competencies</div>
            <div style={s.cardText}>Proficient in curriculum development, classroom management, differentiated instruction, and integrating technology in K-12 education settings.</div>
          </div>
          <div style={s.card}>
            <div style={s.cardIcon}>\u{1F3EB}</div>
            <div style={s.cardTitle}>School Community</div>
            <div style={s.cardText}>Active contributor to school programs, co-curricular activities, and community outreach initiatives at Libertad National High School.</div>
          </div>
        </div>
      </div>

      <div style={{ ...s.section, background: '#fff' }}>
        <h2 style={s.sectionTitle}>Subjects Handled</h2>
        <div style={s.subjectGrid}>
          {['Mathematics','Science','English','Filipino','Araling Panlipunan','Values Education'].map(sub=>(
            <div style={s.subject} key={sub}>{sub}</div>
          ))}
        </div>
      </div>

      <div style={s.contact}>
        <h2 style={{ ...s.sectionTitle, marginBottom: 16 }}>Contact Information</h2>
        <p style={s.contactInfo}>\u{1F4E7} marie.michelle.sismar@deped.gov.ph</p>
        <p style={s.contactInfo}>\u{1F3EB} Libertad National High School, Butuan City</p>
        <p style={s.contactInfo}>\u{1F4CD} Libertad, Butuan City, Agusan del Norte</p>
      </div>

      <div style={s.footer}>\u00A9 2026 Marie Michelle L. Sismar | Libertad National High School</div>
    </div>
  );
}

export default Home;

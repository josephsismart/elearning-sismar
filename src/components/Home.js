import React from 'react';

function Home() {
  const font = "'Poppins', 'Segoe UI', sans-serif";

  return (
    <div style={{ fontFamily: font, background: '#f5f7fa', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ===== HERO SECTION ===== */}
      <div style={{ background: 'linear-gradient(135deg, #f0f4f8 0%, #e8eef5 50%, #dfe7f0 100%)', color: '#1a3a5c', padding: '70px 20px 50px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 250, height: 250, borderRadius: '50%', background: 'rgba(233,69,96,0.06)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(46,125,189,0.06)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Teacher Photo */}
          <div style={{ width: 170, height: 170, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px', border: '4px solid #e94560', boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 0 0 8px rgba(233,69,96,0.1)' }}>
            <img src={process.env.PUBLIC_URL + '/images/michelle.jpg'} alt="Ms. Sismar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <h1 style={{ fontSize: 34, fontWeight: 800, margin: '0 0 6px', letterSpacing: 0.5, color: '#1a3a5c' }}>Marie Michelle L. Sismar</h1>
          <p style={{ fontSize: 15, color: '#555', margin: '0 0 4px', fontWeight: 400 }}>Licensed Professional Teacher</p>
          <p style={{ fontSize: 14, color: '#888', margin: '0 0 16px', fontWeight: 300 }}>Libertad National High School, Butuan City</p>

          {/* School Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 24, padding: '8px 20px', border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="LNHS" style={{ width: 30, height: 30, borderRadius: '50%' }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: '#555' }}>Department of Education &mdash; Division of Butuan City</span>
          </div>
        </div>
      </div>

      {/* ===== STATS BAR ===== */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 0, background: '#fff', padding: 0, borderBottom: '1px solid #e0e0e0' }}>
        {[
          { icon: 'fa-users', num: '5', label: 'Advisory Sections' },
          { icon: 'fa-user-graduate', num: '187', label: 'Students' },
          { icon: 'fa-book-open', num: '6', label: 'Subjects' },
          { icon: 'fa-calendar-alt', num: 'S.Y.', label: '2026-2027' }
        ].map((s) => (
          <div key={s.label} style={{ textAlign: 'center', flex: '1 1 140px', padding: '24px 16px', borderRight: '1px solid #f0f0f0' }}>
            <i className={'fas ' + s.icon} style={{ fontSize: 18, color: '#e94560', marginBottom: 8, display: 'block' }} />
            <div style={{ fontSize: 26, fontWeight: 700, color: '#e94560' }}>{s.num}</div>
            <div style={{ fontSize: 11, color: '#999', marginTop: 4, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ===== WELCOME / MISSION ===== */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '50px 20px 10px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#e94560', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>Welcome</p>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#1a3a5c', margin: '0 0 16px' }}>Shaping Futures, One Student at a Time</h2>
          <div style={{ width: 50, height: 3, background: '#e94560', margin: '0 auto 20px', borderRadius: 2 }} />
          <p style={{ fontSize: 15, color: '#555', lineHeight: 1.8, maxWidth: 700, margin: '0 auto' }}>
            Welcome to the official Teacher Portal of <strong>Ms. Marie Michelle L. Sismar</strong>. This platform serves as a hub for class schedules, learning resources, and school announcements. As an educator at Libertad National High School, I am dedicated to fostering an environment where every learner can thrive and reach their fullest potential.
          </p>
        </div>
      </div>

      {/* ===== ABOUT CARDS ===== */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '10px 20px 50px' }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#e94560', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>About</p>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1a3a5c', margin: 0 }}>About the Teacher</h2>
          <div style={{ width: 50, height: 3, background: '#e94560', margin: '12px auto 0', borderRadius: 2 }} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
          {[
            { icon: 'fa-lightbulb', title: 'Teaching Philosophy', text: 'Committed to nurturing every student\'s potential through inclusive, student-centered instruction that builds critical thinking and lifelong learning skills.', color: '#3b82f6' },
            { icon: 'fa-bullseye', title: 'Core Competencies', text: 'Proficient in curriculum development, classroom management, differentiated instruction, and integrating modern technology in K-12 education settings.', color: '#e94560' },
            { icon: 'fa-school', title: 'School Community', text: 'Active contributor to school programs, co-curricular activities, and community outreach initiatives at Libertad National High School.', color: '#10b981' },
          ].map((c) => (
            <div key={c.title} style={{ flex: '1 1 260px', maxWidth: 300, background: '#fff', borderRadius: 14, padding: '28px 24px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0', transition: 'transform 0.2s' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: c.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <i className={'fas ' + c.icon} style={{ fontSize: 20, color: c.color }} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#1a3a5c', marginBottom: 8 }}>{c.title}</div>
              <div style={{ fontSize: 13.5, color: '#666', lineHeight: 1.7 }}>{c.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== SUBJECTS SECTION ===== */}
      <div style={{ background: '#fff', padding: '50px 20px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#e94560', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>Curriculum</p>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1a3a5c', margin: 0 }}>Subjects Handled</h2>
            <div style={{ width: 50, height: 3, background: '#e94560', margin: '12px auto 0', borderRadius: 2 }} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            {[
              { name: 'Mathematics', icon: 'fa-calculator', color: '#3b82f6' },
              { name: 'Science', icon: 'fa-flask', color: '#10b981' },
              { name: 'English', icon: 'fa-language', color: '#8b5cf6' },
              { name: 'Filipino', icon: 'fa-feather-pointed', color: '#f59e0b' },
              { name: 'Araling Panlipunan', icon: 'fa-globe-asia', color: '#e94560' },
              { name: 'Values Education', icon: 'fa-heart', color: '#ec4899' }
            ].map((sub) => (
              <div key={sub.name} style={{ background: '#f5f7fa', color: '#1a3a5c', borderRadius: 12, padding: '16px 22px', minWidth: 150, textAlign: 'center', fontSize: 13.5, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <i className={'fas ' + sub.icon} style={{ fontSize: 16, color: sub.color }} />
                <span>{sub.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== ADVISORY SECTIONS ===== */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '50px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#e94560', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>Classes</p>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1a3a5c', margin: 0 }}>Advisory Sections</h2>
          <div style={{ width: 50, height: 3, background: '#e94560', margin: '12px auto 0', borderRadius: 2 }} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
          {[
            { section: 'Grade 7 - Sampaguita', students: 38, color: '#3b82f6' },
            { section: 'Grade 7 - Rosal', students: 37, color: '#10b981' },
            { section: 'Grade 8 - Narra', students: 39, color: '#8b5cf6' },
            { section: 'Grade 8 - Molave', students: 36, color: '#f59e0b' },
            { section: 'Grade 9 - Rizal', students: 37, color: '#e94560' },
          ].map((cls) => (
            <div key={cls.section} style={{ flex: '1 1 170px', maxWidth: 200, background: '#fff', borderRadius: 12, padding: '20px 16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0', textAlign: 'center', borderTop: '3px solid ' + cls.color }}>
              <i className="fas fa-chalkboard-teacher" style={{ fontSize: 22, color: cls.color, marginBottom: 10, display: 'block' }} />
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1a3a5c', marginBottom: 4 }}>{cls.section}</div>
              <div style={{ fontSize: 12, color: '#888' }}><i className="fas fa-user" style={{ fontSize: 10, marginRight: 4 }} />{cls.students} students</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== ANNOUNCEMENTS ===== */}
      <div style={{ background: '#fff', padding: '50px 20px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#e94560', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>Updates</p>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1a3a5c', margin: 0 }}>Announcements</h2>
            <div style={{ width: 50, height: 3, background: '#e94560', margin: '12px auto 0', borderRadius: 2 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { date: 'Jul 28, 2026', title: 'First Quarter Examination Schedule Released', text: 'The first quarterly examination will be held from August 11-15, 2026. Students are advised to prepare and review all lessons covered.', icon: 'fa-bullhorn', color: '#e94560' },
              { date: 'Jul 25, 2026', title: 'Submission of Project Requirements', text: 'All project outputs for Mathematics and Science must be submitted on or before August 1, 2026. Late submissions will not be accepted.', icon: 'fa-clipboard-list', color: '#3b82f6' },
              { date: 'Jul 20, 2026', title: 'Nutrition Month Celebration', text: 'In celebration of Nutrition Month, all sections will participate in poster-making and jingle contests. Please coordinate with your class officers.', icon: 'fa-apple-whole', color: '#10b981' },
            ].map((a) => (
              <div key={a.title} style={{ display: 'flex', gap: 16, background: '#fafbfc', borderRadius: 12, padding: '20px 24px', border: '1px solid #f0f0f0', alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: a.color + '12', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className={'fas ' + a.icon} style={{ fontSize: 18, color: a.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: '#999', fontWeight: 500, marginBottom: 4 }}><i className="far fa-calendar" style={{ marginRight: 6 }} />{a.date}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#1a3a5c', marginBottom: 6 }}>{a.title}</div>
                  <div style={{ fontSize: 13.5, color: '#666', lineHeight: 1.6 }}>{a.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== VISION / MISSION ===== */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '50px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#e94560', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>DepEd</p>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1a3a5c', margin: 0 }}>Vision &amp; Mission</h2>
          <div style={{ width: 50, height: 3, background: '#e94560', margin: '12px auto 0', borderRadius: 2 }} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
          <div style={{ flex: '1 1 320px', maxWidth: 440, background: '#fff', borderRadius: 16, padding: '32px 28px', color: '#1a3a5c', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0', borderTop: '4px solid #e94560' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <i className="fas fa-eye" style={{ fontSize: 22, color: '#e94560' }} />
              <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Vision</h3>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#555', margin: 0 }}>
              We dream of Filipinos who passionately love their country and whose values and competencies enable them to realize their full potential and contribute meaningfully to building the nation.
            </p>
          </div>
          <div style={{ flex: '1 1 320px', maxWidth: 440, background: '#fff', borderRadius: 16, padding: '32px 28px', color: '#1a3a5c', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0', borderTop: '4px solid #3b82f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <i className="fas fa-bullseye" style={{ fontSize: 22, color: '#3b82f6' }} />
              <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Mission</h3>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#555', margin: 0 }}>
              To protect and promote the right of every Filipino to quality, equitable, culture-based, and complete basic education through ensuring access, relevance, and governance.
            </p>
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <i className="fas fa-gem" style={{ fontSize: 20, color: '#8b5cf6' }} />
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: '#1a3a5c' }}>Core Values</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['Maka-Diyos', 'Maka-Tao', 'Makakalikasan', 'Makabansa'].map((v) => (
                <span key={v} style={{ background: '#8b5cf615', color: '#8b5cf6', padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
                  <i className="fas fa-check-circle" style={{ marginRight: 6, fontSize: 12 }} />{v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== QUICK LINKS ===== */}
      <div style={{ background: '#fff', padding: '50px 20px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#e94560', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>Resources</p>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1a3a5c', margin: 0 }}>Quick Links</h2>
            <div style={{ width: 50, height: 3, background: '#e94560', margin: '12px auto 0', borderRadius: 2 }} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            {[
              { icon: 'fa-graduation-cap', label: 'DepEd Commons', desc: 'Free learning platform', color: '#3b82f6' },
              { icon: 'fa-laptop-code', label: 'DepEd LMS', desc: 'Learning management', color: '#10b981' },
              { icon: 'fa-file-alt', label: 'Learning Materials', desc: 'Modules & worksheets', color: '#f59e0b' },
              { icon: 'fa-chart-line', label: 'Student Progress', desc: 'Grades & performance', color: '#e94560' },
            ].map((link) => (
              <div key={link.label} style={{ flex: '1 1 180px', maxWidth: 210, background: '#fafbfc', borderRadius: 12, padding: '22px 18px', textAlign: 'center', border: '1px solid #f0f0f0', cursor: 'pointer' }}>
                <div style={{ width: 50, height: 50, borderRadius: '50%', background: link.color + '12', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <i className={'fas ' + link.icon} style={{ fontSize: 20, color: link.color }} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1a3a5c', marginBottom: 4 }}>{link.label}</div>
                <div style={{ fontSize: 12, color: '#888' }}>{link.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== CONTACT SECTION ===== */}
      <div style={{ background: '#f5f7fa', padding: '50px 20px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#e94560', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>Get in Touch</p>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1a3a5c', margin: '0 0 12px' }}>Contact Information</h2>
          <div style={{ width: 50, height: 3, background: '#e94560', margin: '0 auto 30px', borderRadius: 2 }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
            {[
              { icon: 'fa-envelope', label: 'Email', value: 'marie.michelle.sismar@deped.gov.ph', color: '#3b82f6' },
              { icon: 'fa-school', label: 'School', value: 'Libertad National High School, Butuan City', color: '#10b981' },
              { icon: 'fa-map-marker-alt', label: 'Address', value: 'Libertad, Butuan City, Agusan del Norte', color: '#e94560' },
            ].map((c) => (
              <div key={c.label} style={{ flex: '1 1 240px', maxWidth: 280, background: '#fff', borderRadius: 14, padding: '24px 20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: c.color + '12', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <i className={'fas ' + c.icon} style={{ fontSize: 20, color: c.color }} />
                </div>
                <div style={{ fontSize: 12, color: '#999', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600, marginBottom: 6 }}>{c.label}</div>
                <div style={{ fontSize: 13.5, color: '#444', fontWeight: 500 }}>{c.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div style={{ background: '#1a3a5c', color: 'rgba(255,255,255,0.7)', textAlign: 'center', padding: '28px 20px', fontSize: 12, borderTop: '3px solid #e94560' }}>
        <div style={{ marginBottom: 10 }}>
          <i className="fas fa-graduation-cap" style={{ color: '#e94560', marginRight: 8 }} />
          <span style={{ fontWeight: 600, color: '#fff' }}>Teacher Portal</span>
          <span style={{ margin: '0 8px' }}>|</span>
          <span>Libertad National High School</span>
        </div>
        <div>&copy; 2026 Marie Michelle L. Sismar &mdash; All Rights Reserved</div>
      </div>
    </div>
  );
}

export default Home;

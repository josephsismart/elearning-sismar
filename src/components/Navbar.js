import React, { useState, useEffect } from 'react';

function Navbar({ current, onNav }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!document.getElementById('fa-cdn')) {
      const link = document.createElement('link');
      link.id = 'fa-cdn';
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
      document.head.appendChild(link);
    }
    if (!document.getElementById('google-fonts')) {
      const link = document.createElement('link');
      link.id = 'google-fonts';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const nav = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', padding: '0 24px', height: 60, position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(0,0,0,0.08)', flexWrap: 'wrap' };
  const brand = { display: 'flex', alignItems: 'center', gap: 10, color: '#1a3a5c', fontWeight: 700, fontSize: 16, cursor: 'pointer', fontFamily: 'Poppins, sans-serif' };
  const links = { display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' };
  const btn = (active) => ({ background: active ? '#e94560' : 'transparent', color: active ? '#fff' : '#555', border: 'none', padding: '8px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: active ? 600 : 500, fontFamily: 'Poppins, sans-serif', whiteSpace: 'nowrap', transition: 'all 0.2s' });

  const pages = [
    { key: 'home', label: 'Home', icon: 'fa-house' },
    { key: 'schedule', label: 'Schedule', icon: 'fa-calendar-days' },
    { key: 'schoolyear', label: 'School Year', icon: 'fa-graduation-cap' },
    { key: 'enrollment', label: 'Enrollment', icon: 'fa-user-plus' },
    { key: 'attendance', label: 'Attendance', icon: 'fa-clipboard-check' },
    { key: 'grades', label: 'Grades', icon: 'fa-chart-simple' },
    { key: 'sf9report', label: 'SF9 Report', icon: 'fa-file-lines' },
  ];

  return (
    <>
      <style>{`
        .nb-hamburger { display: none; background: none; border: none; color: #1a3a5c; font-size: 22px; cursor: pointer; padding: 4px; }
        .nb-link:hover { background: #f0f4f8 !important; color: #e94560 !important; }
        @media (max-width: 768px) {
          .nb-links { display: ${menuOpen ? 'flex' : 'none'} !important; flex-direction: column; position: absolute; top: 60px; left: 0; right: 0; background: #fff; padding: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 99; }
          .nb-hamburger { display: block !important; }
        }
      `}</style>
      <nav style={nav}>
        <div style={brand} onClick={() => { onNav('home'); setMenuOpen(false); }}>
          <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="LNHS" style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid #e94560' }} />
          <span>Teacher Portal</span>
        </div>
        <button className="nb-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <i className={menuOpen ? 'fas fa-xmark' : 'fas fa-bars'} />
        </button>
        <div className="nb-links" style={links}>
          {pages.map(p => (
            <button key={p.key} className="nb-link" style={btn(current === p.key)} onClick={() => { onNav(p.key); setMenuOpen(false); }}>
              <i className={'fas ' + p.icon} style={{ marginRight: 6, fontSize: 12 }} />{p.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

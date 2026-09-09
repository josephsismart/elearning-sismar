import React, { useState } from 'react';

function Navbar({ current, onNav }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1a1a2e', padding: '0 24px', height: 56, position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', flexWrap: 'wrap' };
  const brand = { display: 'flex', alignItems: 'center', gap: 10, color: '#fff', fontWeight: 700, fontSize: 16, cursor: 'pointer' };
  const links = { display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' };
  const btn = (active) => ({ background: active ? 'rgba(233,69,96,0.2)' : 'transparent', color: active ? '#e94560' : 'rgba(255,255,255,0.7)', border: 'none', padding: '8px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: active ? 600 : 400, fontFamily: 'Poppins, sans-serif', whiteSpace: 'nowrap' });

  const pages = [
    { key: 'home', label: 'Home' },
    { key: 'schedule', label: 'Schedule' },
    { key: 'schoolyear', label: 'School Year' },
    { key: 'enrollment', label: 'Enrollment' },
    { key: 'attendance', label: 'Attendance' },
    { key: 'grades', label: 'Grades' },
    { key: 'sf9report', label: 'SF9 Report' },
  ];

  return (
    <>
      <style>{`
        .nb-hamburger { display: none; background: none; border: none; color: #fff; font-size: 22px; cursor: pointer; padding: 4px; }
        @media (max-width: 768px) {
          .nb-links { display: ${menuOpen ? 'flex' : 'none'} !important; flex-direction: column; position: absolute; top: 56px; left: 0; right: 0; background: #1a1a2e; padding: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 99; }
          .nb-hamburger { display: block !important; }
        }
      `}</style>
      <nav style={nav}>
        <div style={brand} onClick={() => { onNav('home'); setMenuOpen(false); }}>
          <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="LNHS" style={{ width: 32, height: 32, borderRadius: '50%' }} />
          <span>Teacher Portal</span>
        </div>
        <button className="nb-hamburger" onClick={() => setMenuOpen(!menuOpen)}>\u2630</button>
        <div className="nb-links" style={links}>
          {pages.map(p => (
            <button key={p.key} style={btn(current === p.key)} onClick={() => { onNav(p.key); setMenuOpen(false); }}>{p.label}</button>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

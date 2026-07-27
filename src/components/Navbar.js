import React from 'react';

const LOGO = 'data:image/png;base64,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';

function Navbar({ current, onNav }) {
  const nav = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1a1a2e', padding: '0 24px', height: 56, position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' };
  const brand = { display: 'flex', alignItems: 'center', gap: 10, color: '#fff', fontWeight: 700, fontSize: 16 };
  const links = { display: 'flex', gap: 4 };
  const btn = (active) => ({ background: active ? 'rgba(233,69,96,0.2)' : 'transparent', color: active ? '#e94560' : 'rgba(255,255,255,0.7)', border: 'none', padding: '8px 16px', borderRadius: 6, cursor: 'pointer', fontSize: 14, fontWeight: active ? 600 : 400 });
  return (
    <nav style={nav}>
      <div style={brand}>
        <img src={LOGO} alt="LNHS" style={{ width: 32, height: 32, borderRadius: '50%' }} />
        <span>LNHS E-Learning</span>
      </div>
      <div style={links}>
        <button style={btn(current==='home')} onClick={()=>onNav('home')}>Home</button>
        <button style={btn(current==='schedule')} onClick={()=>onNav('schedule')}>Schedule</button>
      </div>
    </nav>
  );
}

export default Navbar;import React, { useState } from 'react';

const styles = {
  nav: {background:'var(--primary)',padding:'0 2rem',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100,boxShadow:'0 2px 8px rgba(0,0,0,.15)'},
  brand: {display:'flex',alignItems:'center',gap:'.75rem',color:'#fff',fontWeight:700,fontSize:'1.1rem'},
  logo: {width:42,height:42,borderRadius:'50%'},
  ul: {listStyle:'none',display:'flex',gap:'.25rem',margin:0,padding:0},
  link: (active) => ({color:active?'#fff':'rgba(255,255,255,.85)',padding:'.9rem 1rem',display:'block',fontSize:'.9rem',fontWeight:500,cursor:'pointer',background:active?'rgba(255,255,255,.12)':'none',borderRadius:'6px 6px 0 0',border:'none',fontFamily:'inherit'}),
  hamburger: {display:'none',background:'none',border:'none',color:'#fff',fontSize:'1.5rem',cursor:'pointer'},
};

export default function Navbar({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const nav = (p) => { setPage(p); setOpen(false); };
  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <span style={{...styles.logo,background:'#fff',color:'#1a3a5c',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:'.55rem',fontWeight:800}}>LNHS</span>
        <span>Teacher Portal</span>
      </div>
      <ul style={{...styles.ul, ...(open ? {display:'flex',flexDirection:'column',position:'absolute',top:'100%',left:0,right:0,background:'var(--primary)',padding:'1rem'} : {})}}>
        {[['home','Home'],['schedule','Schedule'],['attendance','Attendance']].map(([k,v])=>(
          <li key={k}><button style={styles.link(page===k)} onClick={()=>nav(k)}>{v}</button></li>
        ))}
      </ul>
    </nav>
  );
}

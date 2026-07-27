import React, { useState } from 'react';

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

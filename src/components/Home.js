import React from 'react';

const StatCard = ({num, label, type}) => {
  const colors = {total:'#e3f2fd',present:'#e8f5e9',late:'#fff8e1',absent:'#ffebee'};
  const textColors = {total:'#1565c0',present:'#2e7d32',late:'#f57f17',absent:'#c62828'};
  return (
    <div style={{flex:1,minWidth:120,padding:'.75rem 1rem',borderRadius:10,textAlign:'center',background:colors[type],color:textColors[type]}}>
      <div style={{fontSize:'1.5rem',fontWeight:700}}>{num}</div>
      <div style={{fontSize:'.75rem',fontWeight:600,textTransform:'uppercase'}}>{label}</div>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <div style={{background:'linear-gradient(135deg,#1a3a5c 0%,#2a5a8a 50%,#2e7dbd 100%)',color:'#fff',padding:'3rem 2rem'}}>
        <div style={{maxWidth:800,margin:'0 auto',display:'flex',alignItems:'center',gap:'2.5rem',flexWrap:'wrap',justifyContent:'center'}}>
          <div style={{width:180,height:270,borderRadius:12,border:'4px solid rgba(255,255,255,.3)',boxShadow:'0 8px 32px rgba(0,0,0,.3)',background:'linear-gradient(135deg,#2a5a8a,#4a90c4)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'#fff',flexShrink:0}}>
            <div style={{fontSize:'3.5rem',fontWeight:700,lineHeight:1}}>MMS</div>
            <div style={{fontSize:'.7rem',marginTop:8,opacity:.8,letterSpacing:1,textTransform:'uppercase'}}>Professional Teacher</div>
          </div>
          <div>
            <h1 style={{fontSize:'2rem',fontWeight:700,marginBottom:'.25rem'}}>Marie Michelle L. Sismar</h1>
            <div style={{fontSize:'1.1rem',opacity:.9,marginBottom:'.15rem'}}>Licensed Professional Teacher</div>
            <div style={{fontSize:'.95rem',opacity:.75,display:'flex',alignItems:'center',gap:'.5rem',marginBottom:'1rem'}}>
              <span style={{width:28,height:28,borderRadius:'50%',background:'#fff',color:'#1a3a5c',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:'.6rem',fontWeight:700,flexShrink:0}}>LNHS</span>
              Libertad National High School, Butuan City
            </div>
            <div style={{fontSize:'.95rem',opacity:.8,lineHeight:1.5,maxWidth:420}}>
              Dedicated educator committed to nurturing young minds and fostering academic excellence in a supportive learning environment.
            </div>
          </div>
        </div>
      </div>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'1.5rem'}}>
        <h2 style={{fontSize:'1.35rem',fontWeight:700,color:'var(--primary)',marginBottom:'1rem',display:'flex',alignItems:'center',gap:'.5rem'}}>
          <span style={{width:4,height:24,background:'var(--accent)',borderRadius:2,display:'inline-block'}}></span>
          Quick Overview
        </h2>
        <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
          <StatCard num="5" label="Advisory Sections" type="total" />
          <StatCard num="187" label="Total Students" type="present" />
          <StatCard num="6" label="Subjects Taught" type="late" />
          <StatCard num="S.Y. 2026–2027" label="School Year" type="absent" />
        </div>
      </div>
    </div>
  );
}

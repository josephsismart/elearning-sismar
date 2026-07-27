import React, { useState } from 'react';

const scheduleData = {
  Monday: [
    {time:'7:00 â 7:45',subject:'Flag Ceremony / Advisory',section:'Grade 9 â Narra',color:'#1abc9c'},
    {time:'7:45 â 8:45',subject:'Mathematics 9',section:'Grade 9 â Narra',color:'#e74c3c'},
    {time:'8:45 â 9:45',subject:'Mathematics 9',section:'Grade 9 â Molave',color:'#e74c3c'},
    {time:'9:45 â 10:00',subject:'RECESS',section:'â',color:null},
    {time:'10:00 â 11:00',subject:'Science 9',section:'Grade 9 â Acacia',color:'#27ae60'},
    {time:'11:00 â 12:00',subject:'English 9',section:'Grade 9 â Narra',color:'#2e7dbd'},
    {time:'12:00 â 1:00',subject:'LUNCH BREAK',section:'â',color:null},
    {time:'1:00 â 2:00',subject:'Filipino 9',section:'Grade 9 â Ipil',color:'#f39c12'},
    {time:'2:00 â 3:00',subject:'TLE 9',section:'Grade 9 â Yakal',color:'#8e44ad'},
    {time:'3:00 â 4:00',subject:'Mathematics 9',section:'Grade 9 â Acacia',color:'#e74c3c'},
  ],
  Tuesday: [
    {time:'7:00 â 7:45',subject:'Advisory Period',section:'Grade 9 â Narra',color:'#1abc9c'},
    {time:'7:45 â 8:45',subject:'Science 9',section:'Grade 9 â Narra',color:'#27ae60'},
    {time:'8:45 â 9:45',subject:'English 9',section:'Grade 9 â Molave',color:'#2e7dbd'},
    {time:'9:45 â 10:00',subject:'RECESS',section:'â',color:null},
    {time:'10:00 â 11:00',subject:'Mathematics 9',section:'Grade 9 â Ipil',color:'#e74c3c'},
    {time:'11:00 â 12:00',subject:'Filipino 9',section:'Grade 9 â Narra',color:'#f39c12'},
    {time:'12:00 â 1:00',subject:'LUNCH BREAK',section:'â',color:null},
    {time:'1:00 â 2:00',subject:'TLE 9',section:'Grade 9 â Yakal',color:'#8e44ad'},
    {time:'2:00 â 3:00',subject:'Mathematics 9',section:'Grade 9 â Acacia',color:'#e74c3c'},
    {time:'3:00 â 4:00',subject:'Science 9',section:'Grade 9 â Molave',color:'#27ae60'},
  ],
  Wednesday: [
    {time:'7:00 â 7:45',subject:'Advisory Period',section:'Grade 9 â Narra',color:'#1abc9c'},
    {time:'7:45 â 8:45',subject:'Mathematics 9',section:'Grade 9 â Narra',color:'#e74c3c'},
    {time:'8:45 â 9:45',subject:'Filipino 9',section:'Grade 9 â Molave',color:'#f39c12'},
    {time:'9:45 â 10:00',subject:'RECESS',section:'â',color:null},
    {time:'10:00 â 11:00',subject:'English 9',section:'Grade 9 â Acacia',color:'#2e7dbd'},
    {time:'11:00 â 12:00',subject:'TLE 9',section:'Grade 9 â Ipil',color:'#8e44ad'},
    {time:'12:00 â 1:00',subject:'LUNCH BREAK',section:'â',color:null},
    {time:'1:00 â 2:00',subject:'Science 9',section:'Grade 9 â Yakal',color:'#27ae60'},
    {time:'2:00 â 3:00',subject:'Mathematics 9',section:'Grade 9 â Molave',color:'#e74c3c'},
    {time:'3:00 â 4:00',subject:'Filipino 9',section:'Grade 9 â Acacia',color:'#f39c12'},
  ],
  Thursday: [
    {time:'7:00 â 7:45',subject:'Advisory Period',section:'Grade 9 â Narra',color:'#1abc9c'},
    {time:'7:45 â 8:45',subject:'English 9',section:'Grade 9 â Narra',color:'#2e7dbd'},
    {time:'8:45 â 9:45',subject:'Mathematics 9',section:'Grade 9 â Ipil',color:'#e74c3c'},
    {time:'9:45 â 10:00',subject:'RECESS',section:'â',color:null},
    {time:'10:00 â 11:00',subject:'Science 9',section:'Grade 9 â Molave',color:'#27ae60'},
    {time:'11:00 â 12:00',subject:'TLE 9',section:'Grade 9 â Acacia',color:'#8e44ad'},
    {time:'12:00 â 1:00',subject:'LUNCH BREAK',section:'â',color:null},
    {time:'1:00 â 2:00',subject:'Mathematics 9',section:'Grade 9 â Yakal',color:'#e74c3c'},
    {time:'2:00 â 3:00',subject:'Filipino 9',section:'Grade 9 â Narra',color:'#f39c12'},
    {time:'3:00 â 4:00',subject:'English 9',section:'Grade 9 â Ipil',color:'#2e7dbd'},
  ],
  Friday: [
    {time:'7:00 â 7:45',subject:'Flag Retreat / Advisory',section:'Grade 9 â Narra',color:'#1abc9c'},
    {time:'7:45 â 8:45',subject:'Mathematics 9',section:'Grade 9 â Yakal',color:'#e74c3c'},
    {time:'8:45 â 9:45',subject:'Science 9',section:'Grade 9 â Ipil',color:'#27ae60'},
    {time:'9:45 â 10:00',subject:'RECESS',section:'â',color:null},
    {time:'10:00 â 11:00',subject:'Filipino 9',section:'Grade 9 â Yakal',color:'#f39c12'},
    {time:'11:00 â 12:00',subject:'English 9',section:'Grade 9 â Acacia',color:'#2e7dbd'},
    {time:'12:00 â 1:00',subject:'LUNCH BREAK',section:'â',color:null},
    {time:'1:00 â 2:00',subject:'Mathematics 9',section:'Grade 9 â Narra',color:'#e74c3c'},
    {time:'2:00 â 3:00',subject:'TLE 9',section:'Grade 9 â Molave',color:'#8e44ad'},
    {time:'3:00 â 4:00',subject:'Science 9',section:'Grade 9 â Narra',color:'#27ae60'},
  ],
};

const days = Object.keys(scheduleData);

export default function Schedule() {
  const [day, setDay] = useState(days[0]);
  return (
    <div style={{maxWidth:1100,margin:'0 auto',padding:'1.5rem'}}>
      <h2 style={{fontSize:'1.35rem',fontWeight:700,color:'var(--primary)',marginBottom:'1rem',display:'flex',alignItems:'center',gap:'.5rem'}}>
        <span style={{width:4,height:24,background:'var(--accent)',borderRadius:2,display:'inline-block'}}></span>
        Class Schedule
      </h2>
      <div style={{display:'flex',gap:'.5rem',marginBottom:'1.25rem',flexWrap:'wrap'}}>
        {days.map(d=>(
          <button key={d} onClick={()=>setDay(d)} style={{padding:'.5rem 1.25rem',border:`2px solid ${day===d?'var(--accent)':'var(--border)'}`,background:day===d?'var(--accent)':'var(--white)',borderRadius:8,cursor:'pointer',fontSize:'.875rem',fontWeight:600,color:day===d?'#fff':'var(--gray)'}}>{d}</button>
        ))}
      </div>
      <div style={{background:'var(--white)',borderRadius:12,padding:'1.5rem',boxShadow:'0 1px 4px rgba(0,0,0,.06)',border:'1px solid var(--border)'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:'.875rem'}}>
          <thead><tr>{['Time','Subject','Section'].map(h=><th key={h} style={{background:'var(--primary)',color:'#fff',padding:'.65rem .75rem',textAlign:'left',fontWeight:600}}>{h}</th>)}</tr></thead>
          <tbody>
            {scheduleData[day].map((r,i)=>{
              const isBreak = !r.color;
              return (
                <tr key={i} style={isBreak?{background:'#f9f9f9',color:'var(--gray)',fontStyle:'italic'}:{}}>
                  <td style={{padding:'.6rem .75rem',borderBottom:'1px solid var(--border)'}}>{r.time}</td>
                  <td style={{padding:'.6rem .75rem',borderBottom:'1px solid var(--border)'}}>
                    {r.color ? <span style={{display:'inline-block',padding:'.15rem .55rem',borderRadius:20,fontSize:'.75rem',fontWeight:600,color:'#fff',background:r.color}}>{r.subject}</span> : r.subject}
                  </td>
                  <td style={{padding:'.6rem .75rem',borderBottom:'1px solid var(--border)'}}>{r.section}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

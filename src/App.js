import React, { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Schedule from './components/Schedule';
import Attendance from './components/Attendance';

export default function App() {
  const [page, setPage] = useState('home');
  return (
    <div>
      <Navbar page={page} setPage={setPage} />
      {page === 'home' && <Home />}
      {page === 'schedule' && <Schedule />}
      {page === 'attendance' && <Attendance />}
      <footer style={{background:'var(--primary)',color:'rgba(255,255,255,.7)',textAlign:'center',padding:'1.5rem',fontSize:'.8rem',marginTop:'2rem'}}>
        <strong style={{color:'#fff'}}>Libertad National High School</strong> — Libertad, Butuan City<br/>
        &copy; 2026 Marie Michelle L. Sismar &middot; Teacher Portal
      </footer>
    </div>
  );
}

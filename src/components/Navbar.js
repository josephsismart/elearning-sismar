import React from 'react';

const LOGO = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAJ2wjSAAABS1BMVEUVFhsKKDMgIywi3l8cHiUREhcIeIGaHC1ZG1AXG4nKzluMz8sMDspLjkyN01I0cjDwcAk0oFRAZCQasnJq4pqPTxsO/sK61K4YzGB0JubFEkXXazcq+imx/a2a3eHWSq');

function Navbar({ current, onNav }) {
  const nav = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1a1a2e', padding: '0 24px', height: 56, position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' };
  const brand = { display: 'flex', alignItems: 'center', gap: 10, color: '#fff', fontWeight: 700, fontSize: 16 };
  const links = { display: 'flex', gap: 4 };
  const btn = (active) => ({ background: active ? 'rgba(233,69,96,0.2)' : 'transparent', color: active ? '#e94560' : 'rgba(255,255,255,0.7)', border: 'none', padding: '8px 16px', borderRadius: 6, cursor: 'pointer', fontSize: 14, fontWeight: active ? 600 : 400 });
  return (
    <nav style={nav}>
      <div style={brand}>
        <img src={LOGO} alt="LNHS" style={{ width: 32, height: 32, borderRadius: '50%' }} />
        <span>Teacher Portal</span>
      </div>
      <div style={links}>
        <button style={btn(current==='home')} onClick={()=>onNav('home')}>Home</button>
        <button style={btn(current==='schedule')} onClick={()=>onNav('schedule')}>Schedule</button>
      </div>
    </nav>
  );
}

export default Navbar;

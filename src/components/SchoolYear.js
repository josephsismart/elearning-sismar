import React, { useState, useEffect } from 'react';
import { getSchoolYears, createSchoolYear, selectSchoolYear, deleteSchoolYear, getCurrentSY, GRADE_LEVELS } from '../services/dataService';

const s = {
  wrap: { minHeight: '100vh', background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)', padding: '32px 16px', fontFamily: 'Poppins, sans-serif', color: '#fff' },
  container: { maxWidth: 900, margin: '0 auto' },
  title: { fontSize: 28, fontWeight: 700, marginBottom: 24, textAlign: 'center' },
  card: { background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 24, marginBottom: 16, border: '1px solid rgba(255,255,255,0.1)' },
  label: { display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 4, marginTop: 12 },
  input: { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 14, boxSizing: 'border-box', fontFamily: 'Poppins, sans-serif' },
  select: { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 14, boxSizing: 'border-box', fontFamily: 'Poppins, sans-serif' },
  row: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  col: { flex: '1 1 200px', minWidth: 0 },
  btn: { padding: '10px 24px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'Poppins, sans-serif' },
  btnPrimary: { background: '#e94560', color: '#fff' },
  btnDanger: { background: 'transparent', color: '#ff6b6b', border: '1px solid #ff6b6b' },
  btnSmall: { padding: '6px 14px', fontSize: 12 },
  syItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', marginBottom: 8, border: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap', gap: 8 },
  syActive: { border: '1px solid #e94560', background: 'rgba(233,69,96,0.1)' },
  badge: { background: '#e94560', color: '#fff', fontSize: 11, padding: '2px 8px', borderRadius: 10, fontWeight: 600 },
  empty: { textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.4)', fontSize: 15 },
};

function SchoolYear({ onNav }) {
  const [years, setYears] = useState([]);
  const [current, setCurrent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', schoolName: '', region: '', division: '', city: '', district: '', schoolId: '', schoolHead: '', adviser: '', gradeLevel: 7, section: '' });

  const reload = () => { setYears(getSchoolYears()); setCurrent(getCurrentSY()); };
  useEffect(reload, []);

  const handleCreate = () => {
    if (!form.name || !form.section) return alert('School Year and Section are required.');
    const r = createSchoolYear({ ...form, gradeLevel: Number(form.gradeLevel) });
    if (!r) return alert('This School Year + Grade + Section already exists.');
    setShowForm(false);
    setForm({ name: '', schoolName: '', region: '', division: '', city: '', district: '', schoolId: '', schoolHead: '', adviser: '', gradeLevel: 7, section: '' });
    reload();
  };

  const handleSelect = (id) => { selectSchoolYear(id); reload(); if (onNav) onNav('enrollment'); };
  const handleDelete = (id) => { if (window.confirm('Delete this school year and all its data?')) { deleteSchoolYear(id); reload(); } };

  return (
    <div style={s.wrap}>
      <div style={s.container}>
        <h1 style={s.title}>School Year Management</h1>
        <div style={{ textAlign: 'right', marginBottom: 16 }}>
          <button style={{ ...s.btn, ...s.btnPrimary }} onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ New School Year'}
          </button>
        </div>

        {showForm && (
          <div style={s.card}>
            <h3 style={{ margin: '0 0 12px', fontSize: 18 }}>Create School Year</h3>
            <div style={s.row}>
              <div style={s.col}><label style={s.label}>School Year *</label><input style={s.input} placeholder="e.g. 2026-2027" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div style={s.col}><label style={s.label}>Grade Level *</label><select style={s.select} value={form.gradeLevel} onChange={e => setForm({ ...form, gradeLevel: e.target.value })}>{GRADE_LEVELS.map(g => <option key={g} value={g}>Grade {g}</option>)}</select></div>
              <div style={s.col}><label style={s.label}>Section *</label><input style={s.input} placeholder="e.g. Narra" value={form.section} onChange={e => setForm({ ...form, section: e.target.value })} /></div>
            </div>
            <div style={s.row}>
              <div style={s.col}><label style={s.label}>School Name</label><input style={s.input} value={form.schoolName} onChange={e => setForm({ ...form, schoolName: e.target.value })} /></div>
              <div style={s.col}><label style={s.label}>School ID</label><input style={s.input} value={form.schoolId} onChange={e => setForm({ ...form, schoolId: e.target.value })} /></div>
            </div>
            <div style={s.row}>
              <div style={s.col}><label style={s.label}>Region</label><input style={s.input} value={form.region} onChange={e => setForm({ ...form, region: e.target.value })} /></div>
              <div style={s.col}><label style={s.label}>Division</label><input style={s.input} value={form.division} onChange={e => setForm({ ...form, division: e.target.value })} /></div>
              <div style={s.col}><label style={s.label}>City/Municipality</label><input style={s.input} value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} /></div>
            </div>
            <div style={s.row}>
              <div style={s.col}><label style={s.label}>District</label><input style={s.input} value={form.district} onChange={e => setForm({ ...form, district: e.target.value })} /></div>
              <div style={s.col}><label style={s.label}>School Head</label><input style={s.input} value={form.schoolHead} onChange={e => setForm({ ...form, schoolHead: e.target.value })} /></div>
              <div style={s.col}><label style={s.label}>Adviser</label><input style={s.input} value={form.adviser} onChange={e => setForm({ ...form, adviser: e.target.value })} /></div>
            </div>
            <div style={{ marginTop: 16 }}><button style={{ ...s.btn, ...s.btnPrimary }} onClick={handleCreate}>Create School Year</button></div>
          </div>
        )}

        {years.length === 0 && !showForm && (<div style={s.empty}>No school years yet. Click "New School Year" to get started.</div>)}

        {years.map(sy => (
          <div key={sy.id} style={{ ...s.syItem, ...(sy.id === current ? s.syActive : {}) }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 16 }}>SY {sy.name} - Grade {sy.gradeLevel} - {sy.section}{sy.id === current && <span style={{ ...s.badge, marginLeft: 8 }}>ACTIVE</span>}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{sy.schoolName || 'No school name'} - {sy.students.length} students</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button style={{ ...s.btn, ...s.btnPrimary, ...s.btnSmall }} onClick={() => handleSelect(sy.id)}>Select & Enroll</button>
              <button style={{ ...s.btn, ...s.btnDanger, ...s.btnSmall }} onClick={() => handleDelete(sy.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SchoolYear;

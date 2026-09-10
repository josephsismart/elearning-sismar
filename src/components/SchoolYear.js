import React, { useState, useEffect } from 'react';
import { getSchoolYears, createSchoolYear, selectSchoolYear, deleteSchoolYear, getCurrentSY, GRADE_LEVELS } from '../services/dataService';

const s = {
  wrap: { minHeight: '100vh', background: '#f5f7fa', padding: '32px 16px', fontFamily: 'Poppins, sans-serif', color: '#333' },
  container: { maxWidth: 900, margin: '0 auto' },
  title: { fontSize: 28, fontWeight: 700, marginBottom: 24, textAlign: 'center', color: '#1a3a5c' },
  card: { background: '#fff', borderRadius: 12, padding: 24, marginBottom: 16, border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
  label: { display: 'block', fontSize: 13, color: '#888', marginBottom: 4, marginTop: 12, fontWeight: 500 },
  input: { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #d0d5dd', background: '#fff', color: '#333', fontSize: 14, boxSizing: 'border-box', fontFamily: 'Poppins, sans-serif' },
  select: { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #d0d5dd', background: '#fff', color: '#333', fontSize: 14, boxSizing: 'border-box', fontFamily: 'Poppins, sans-serif' },
  row: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  col: { flex: '1 1 200px', minWidth: 0 },
  btn: { padding: '10px 24px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'Poppins, sans-serif' },
  btnPrimary: { background: '#e94560', color: '#fff' },
  btnOutline: { background: 'transparent', color: '#e94560', border: '1px solid #e94560' },
  btnDanger: { background: 'transparent', color: '#dc3545', border: '1px solid #dc3545' },
  btnSmall: { padding: '6px 14px', fontSize: 12 },
  syItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderRadius: 10, background: '#fafbfc', marginBottom: 8, border: '1px solid #e0e0e0', flexWrap: 'wrap', gap: 8 },
  syActive: { border: '2px solid #e94560', background: '#fef2f4' },
  badge: { background: '#e94560', color: '#fff', fontSize: 11, padding: '2px 8px', borderRadius: 10, fontWeight: 600 },
  empty: { textAlign: 'center', padding: 40, color: '#999', fontSize: 15 },
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
        <h1 style={s.title}><i className="fas fa-calendar-alt" style={{ color: '#e94560', marginRight: 10 }} />School Year Management</h1>
        <div style={{ textAlign: 'right', marginBottom: 16 }}>
          <button style={{ ...s.btn, ...s.btnPrimary }} onClick={() => setShowForm(!showForm)}>
            <i className={showForm ? 'fas fa-xmark' : 'fas fa-plus'} style={{ marginRight: 6 }} />
            {showForm ? 'Cancel' : 'New School Year'}
          </button>
        </div>

        {showForm && (
          <div style={s.card}>
            <h3 style={{ margin: '0 0 12px', fontSize: 18, color: '#1a3a5c' }}>Create School Year</h3>
            <div style={s.row}>
              <div style={s.col}>
                <label style={s.label}>School Year *</label>
                <input style={s.input} placeholder="e.g. 2026-2027" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div style={s.col}>
                <label style={s.label}>Grade Level *</label>
                <select style={s.select} value={form.gradeLevel} onChange={e => setForm({ ...form, gradeLevel: e.target.value })}>
                  {GRADE_LEVELS.map(g => <option key={g} value={g}>Grade {g}</option>)}
                </select>
              </div>
              <div style={s.col}>
                <label style={s.label}>Section *</label>
                <input style={s.input} placeholder="e.g. Narra" value={form.section} onChange={e => setForm({ ...form, section: e.target.value })} />
              </div>
            </div>
            <div style={s.row}>
              <div style={s.col}>
                <label style={s.label}>School Name</label>
                <input style={s.input} value={form.schoolName} onChange={e => setForm({ ...form, schoolName: e.target.value })} />
              </div>
              <div style={s.col}>
                <label style={s.label}>School ID</label>
                <input style={s.input} value={form.schoolId} onChange={e => setForm({ ...form, schoolId: e.target.value })} />
              </div>
            </div>
            <div style={s.row}>
              <div style={s.col}>
                <label style={s.label}>Region</label>
                <input style={s.input} value={form.region} onChange={e => setForm({ ...form, region: e.target.value })} />
              </div>
              <div style={s.col}>
                <label style={s.label}>Division</label>
                <input style={s.input} value={form.division} onChange={e => setForm({ ...form, division: e.target.value })} />
              </div>
              <div style={s.col}>
                <label style={s.label}>City/Municipality</label>
                <input style={s.input} value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
              </div>
            </div>
            <div style={s.row}>
              <div style={s.col}>
                <label style={s.label}>District</label>
                <input style={s.input} value={form.district} onChange={e => setForm({ ...form, district: e.target.value })} />
              </div>
              <div style={s.col}>
                <label style={s.label}>School Head</label>
                <input style={s.input} value={form.schoolHead} onChange={e => setForm({ ...form, schoolHead: e.target.value })} />
              </div>
              <div style={s.col}>
                <label style={s.label}>Adviser</label>
                <input style={s.input} value={form.adviser} onChange={e => setForm({ ...form, adviser: e.target.value })} />
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <button style={{ ...s.btn, ...s.btnPrimary }} onClick={handleCreate}><i className="fas fa-plus" style={{ marginRight: 6 }} />Create School Year</button>
            </div>
          </div>
        )}

        {years.length === 0 && !showForm && (
          <div style={s.empty}><i className="fas fa-folder-open" style={{ fontSize: 32, color: '#ccc', display: 'block', marginBottom: 12 }} />No school years yet. Click "New School Year" to get started.</div>
        )}

        {years.map(sy => (
          <div key={sy.id} style={{ ...s.syItem, ...(sy.id === current ? s.syActive : {}) }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 16, color: '#1a3a5c' }}>
                <i className="fas fa-graduation-cap" style={{ color: '#e94560', marginRight: 8 }} />
                SY {sy.name}{' \u2014 '}Grade {sy.gradeLevel} - {sy.section}
                {sy.id === current && <span style={{ ...s.badge, marginLeft: 8 }}>ACTIVE</span>}
              </div>
              <div style={{ fontSize: 13, color: '#999', marginTop: 2 }}>
                {sy.schoolName || 'No school name'} Â· {sy.students.length} student{sy.students.length !== 1 ? 's' : ''}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button style={{ ...s.btn, ...s.btnPrimary, ...s.btnSmall }} onClick={() => handleSelect(sy.id)}>
                <i className="fas fa-arrow-right" style={{ marginRight: 4 }} />Select & Enroll
              </button>
              <button style={{ ...s.btn, ...s.btnDanger, ...s.btnSmall }} onClick={() => handleDelete(sy.id)}><i className="fas fa-trash" style={{ marginRight: 4 }} />Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SchoolYear;

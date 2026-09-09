import React, { useState, useEffect } from 'react';
import { getSY, getCurrentSY, getStudents, addStudent, updateStudent, removeStudent, computeAge } from '../services/dataService';

const s = {
  wrap: { minHeight: '100vh', background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)', padding: '32px 16px', fontFamily: 'Poppins, sans-serif', color: '#fff' },
  container: { maxWidth: 1100, margin: '0 auto' },
  title: { fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' },
  sub: { textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 24 },
  card: { background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 24, marginBottom: 16, border: '1px solid rgba(255,255,255,0.1)' },
  label: { display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 4, marginTop: 12 },
  input: { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 14, boxSizing: 'border-box', fontFamily: 'Poppins, sans-serif' },
  row: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  col: { flex: '1 1 160px', minWidth: 0 },
  btn: { padding: '10px 24px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'Poppins, sans-serif' },
  btnPrimary: { background: '#e94560', color: '#fff' },
  btnSmall: { padding: '5px 12px', fontSize: 12 },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: { padding: '10px 8px', textAlign: 'left', borderBottom: '2px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  td: { padding: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  sexBadge: (sex) => ({ display: 'inline-block', padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 600, background: sex === 'M' ? 'rgba(52,152,219,0.2)' : 'rgba(233,69,96,0.2)', color: sex === 'M' ? '#3498db' : '#e94560' }),
  empty: { textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.4)', fontSize: 15 },
  sectionHeader: { background: 'rgba(233,69,96,0.15)', padding: '8px 12px', fontWeight: 600, fontSize: 13, color: '#e94560', borderRadius: 6, marginTop: 8 },
};

const blankForm = { lastName: '', firstName: '', middleName: '', lrn: '', birthdate: '', sex: 'M' };

function Enrollment({ onNav }) {
  const [syId, setSyId] = useState(null);
  const [sy, setSy] = useState(null);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ ...blankForm });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const reload = () => {
    const id = getCurrentSY();
    setSyId(id);
    if (id) { setSy(getSY(id)); setStudents(getStudents(id)); }
  };
  useEffect(reload, []);

  if (!syId) return (
    <div style={s.wrap}>
      <div style={s.container}>
        <div style={s.empty}>
          No school year selected. <button style={{ ...s.btn, ...s.btnPrimary, marginLeft: 8 }} onClick={() => onNav('schoolyear')}>Go to School Years</button>
        </div>
      </div>
    </div>
  );

  const handleSubmit = () => {
    if (!form.lastName || !form.firstName) return alert('Last Name and First Name are required.');
    if (editId) {
      updateStudent(syId, editId, form);
      setEditId(null);
    } else {
      addStudent(syId, form);
    }
    setForm({ ...blankForm });
    setShowForm(false);
    reload();
  };

  const handleEdit = (st) => {
    setForm({ lastName: st.lastName, firstName: st.firstName, middleName: st.middleName || '', lrn: st.lrn || '', birthdate: st.birthdate || '', sex: st.sex });
    setEditId(st.id);
    setShowForm(true);
  };

  const handleRemove = (id) => { if (window.confirm('Remove student?')) { removeStudent(syId, id); reload(); } };

  const males = students.filter(x => x.sex === 'M');
  const females = students.filter(x => x.sex === 'F');

  return (
    <div style={s.wrap}>
      <div style={s.container}>
        <h1 style={s.title}>ð Student Enrollment</h1>
        <p style={s.sub}>SY {sy?.name} â Grade {sy?.gradeLevel} - {sy?.section}</p>

        <div style={{ textAlign: 'right', marginBottom: 16 }}>
          <button style={{ ...s.btn, ...s.btnPrimary }} onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ ...blankForm }); }}>
            {showForm ? 'â Cancel' : 'ï¼ Add Student'}
          </button>
        </div>

        {showForm && (
          <div style={s.card}>
            <h3 style={{ margin: '0 0 8px', fontSize: 18 }}>{editId ? 'Edit Student' : 'Enroll Student'}</h3>
            <div style={s.row}>
              <div style={s.col}><label style={s.label}>Last Name *</label><input style={s.input} value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} /></div>
              <div style={s.col}><label style={s.label}>First Name *</label><input style={s.input} value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} /></div>
              <div style={s.col}><label style={s.label}>Middle Name</label><input style={s.input} value={form.middleName} onChange={e => setForm({ ...form, middleName: e.target.value })} /></div>
            </div>
            <div style={s.row}>
              <div style={s.col}><label style={s.label}>LRN</label><input style={s.input} value={form.lrn} onChange={e => setForm({ ...form, lrn: e.target.value })} /></div>
              <div style={s.col}><label style={s.label}>Birthdate</label><input style={s.input} type="date" value={form.birthdate} onChange={e => setForm({ ...form, birthdate: e.target.value })} /></div>
              <div style={s.col}>
                <label style={s.label}>Sex *</label>
                <select style={s.input} value={form.sex} onChange={e => setForm({ ...form, sex: e.target.value })}>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <button style={{ ...s.btn, ...s.btnPrimary }} onClick={handleSubmit}>{editId ? 'Update' : 'Enroll'}</button>
            </div>
          </div>
        )}

        <div style={s.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18 }}>Enrolled Students</h3>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{students.length} total ({males.length}M / {females.length}F)</span>
          </div>

          {students.length === 0 ? <div style={s.empty}>No students enrolled yet.</div> : (
            <div style={{ overflowX: 'auto' }}>
              <table style={s.table}>
                <thead>
                  <tr>
                    <th style={s.th}>#</th>
                    <th style={s.th}>Name</th>
                    <th style={s.th}>LRN</th>
                    <th style={s.th}>Sex</th>
                    <th style={s.th}>Birthdate</th>
                    <th style={s.th}>Age</th>
                    <th style={s.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[{ label: `MALE (${males.length})`, list: males }, { label: `FEMALE (${females.length})`, list: females }].map(group => (
                    <React.Fragment key={group.label}>
                      <tr><td colSpan={7} style={{ padding: 0 }}><div style={s.sectionHeader}>{group.label}</div></td></tr>
                      {group.list.map((st, i) => (
                        <tr key={st.id} style={{ background: i % 2 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                          <td style={s.td}>{i + 1}</td>
                          <td style={{ ...s.td, fontWeight: 500 }}>{st.lastName}, {st.firstName} {st.middleName || ''}</td>
                          <td style={s.td}>{st.lrn || 'â'}</td>
                          <td style={s.td}><span style={s.sexBadge(st.sex)}>{st.sex}</span></td>
                          <td style={s.td}>{st.birthdate || 'â'}</td>
                          <td style={s.td}>{computeAge(st.birthdate) || 'â'}</td>
                          <td style={s.td}>
                            <button style={{ ...s.btn, ...s.btnSmall, color: '#3498db', background: 'rgba(52,152,219,0.15)', marginRight: 4 }} onClick={() => handleEdit(st)}>Edit</button>
                            <button style={{ ...s.btn, ...s.btnSmall, color: '#ff6b6b', background: 'rgba(255,107,107,0.15)' }} onClick={() => handleRemove(st.id)}>Remove</button>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Enrollment;

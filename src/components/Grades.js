import React, { useState, useEffect } from 'react';
import { getSY, getCurrentSY, getStudents, getGrades, setGrade, computeMapehTerm, computeFinalGrade, computeGeneralAvg, computeRanks, SUBJECTS_G4_10, MAPEH_SUBS, TERMS } from '../services/dataService';

const s = {
  wrap: { minHeight: '100vh', background: '#f5f7fa', padding: '32px 16px', fontFamily: 'Poppins, sans-serif', color: '#333' },
  container: { maxWidth: 1300, margin: '0 auto' },
  title: { fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center', color: '#1a3a5c' },
  sub: { textAlign: 'center', color: '#888', fontSize: 14, marginBottom: 16 },
  card: { background: '#fff', borderRadius: 12, padding: 20, marginBottom: 16, border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
  tabs: { display: 'flex', gap: 4, marginBottom: 16, flexWrap: 'wrap' },
  tab: (active) => ({ padding: '8px 18px', borderRadius: 8, fontWeight: active ? 600 : 400, fontSize: 13, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', background: active ? '#e94560' : '#fff', color: active ? '#fff' : '#555', boxShadow: active ? 'none' : '0 1px 3px rgba(0,0,0,0.08)', border: active ? 'none' : '1px solid #e0e0e0' }),
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 12 },
  th: { padding: '8px 4px', textAlign: 'center', borderBottom: '2px solid #e0e0e0', color: '#888', fontWeight: 600, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.3 },
  td: { padding: '4px 2px', borderBottom: '1px solid #f0f0f0', textAlign: 'center' },
  inp: { width: 40, padding: '5px 2px', borderRadius: 6, border: '1px solid #d0d5dd', background: '#fff', color: '#333', fontSize: 12, textAlign: 'center', fontFamily: 'Poppins, sans-serif' },
  computed: { fontWeight: 600, color: '#e94560', fontSize: 12 },
  pass: { color: '#10b981', fontWeight: 600 },
  fail: { color: '#dc3545', fontWeight: 600 },
  sectionHeader: { background: '#fef2f4', padding: '6px 12px', fontWeight: 600, fontSize: 12, color: '#e94560', borderRadius: 6, marginTop: 4 },
  btn: { padding: '10px 24px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', background: '#e94560', color: '#fff' },
  empty: { textAlign: 'center', padding: 40, color: '#999', fontSize: 15 },
};

function Grades({ onNav }) {
  const [syId, setSyId] = useState(null);
  const [sy, setSy] = useState(null);
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState({});
  const [term, setTerm] = useState(1);
  const [, setTick] = useState(0);

  const reload = () => {
    const id = getCurrentSY();
    setSyId(id);
    if (id) { setSy(getSY(id)); setStudents(getStudents(id)); setGrades(getGrades(id)); }
  };
  useEffect(reload, []);

  if (!syId) return (
    <div style={s.wrap}><div style={s.container}><div style={s.empty}><i className="fas fa-folder-open" style={{ fontSize: 32, color: '#ccc', display: 'block', marginBottom: 12 }} />No school year selected. <button style={s.btn} onClick={() => onNav('schoolyear')}>Go to School Years</button></div></div></div>
  );

  const handleGrade = (studentId, subject, val) => {
    setGrade(syId, studentId, subject, term, val);
    setGrades(prev => {
      const next = { ...prev };
      if (!next[studentId]) next[studentId] = {};
      if (!next[studentId][subject]) next[studentId][subject] = {};
      next[studentId][subject][term] = val === '' ? null : Number(val);
      return next;
    });
    setTick(t => t + 1);
  };

  const ranks = computeRanks(syId);
  const males = students.filter(x => x.sex === 'M');
  const females = students.filter(x => x.sex === 'F');

  const colHeaders = [];
  SUBJECTS_G4_10.forEach(sub => {
    if (sub === 'MAPEH') {
      MAPEH_SUBS.forEach(ms => colHeaders.push({ key: ms, label: ms, isMapehSub: true }));
      colHeaders.push({ key: 'MAPEH', label: 'MAPEH', computed: true });
    } else {
      colHeaders.push({ key: sub, label: sub });
    }
  });

  const renderRow = (st, idx) => {
    const sg = grades[st.id] || {};
    const genAvg = computeGeneralAvg(sg);
    return (
      <tr key={st.id} style={{ background: idx % 2 ? '#fafbfc' : '#fff' }}>
        <td style={{ ...s.td, textAlign: 'left', fontWeight: 500, whiteSpace: 'nowrap', fontSize: 11, color: '#1a3a5c' }}>{idx + 1}. {st.lastName}, {st.firstName}</td>
        {colHeaders.map(col => {
          if (col.computed) {
            const v = computeMapehTerm(sg, term);
            return <td key={col.key} style={{ ...s.td, ...s.computed }}>{v ?? '\u2014'}</td>;
          }
          return (
            <td key={col.key} style={s.td}>
              <input style={s.inp} type="number" min="60" max="100" value={sg[col.key]?.[term] ?? ''} onChange={e => handleGrade(st.id, col.key, e.target.value)} />
            </td>
          );
        })}
        <td style={{ ...s.td, ...s.computed }}>{genAvg ?? '\u2014'}</td>
        <td style={{ ...s.td, ...(genAvg != null ? (genAvg >= 75 ? s.pass : s.fail) : {}) }}>{genAvg != null ? (genAvg >= 75 ? 'Passed' : 'Failed') : '\u2014'}</td>
        <td style={{ ...s.td, ...s.computed }}>{ranks[st.id] != null ? ranks[st.id] % 1 === 0 ? ranks[st.id] : ranks[st.id].toFixed(1) : '\u2014'}</td>
      </tr>
    );
  };

  return (
    <div style={s.wrap}>
      <div style={s.container}>
        <h1 style={s.title}><i className="fas fa-chart-simple" style={{ color: '#e94560', marginRight: 10 }} />Grades</h1>
        <p style={s.sub}>SY {sy?.name}{' \u2014 '}Grade {sy?.gradeLevel} - {sy?.section}</p>

        <div style={s.tabs}>
          {TERMS.map(t => <button key={t} style={s.tab(term === t)} onClick={() => { setTerm(t); reload(); }}><i className="fas fa-pen" style={{ marginRight: 6 }} />Term {t}</button>)}
          <button style={s.tab(term === 'summary')} onClick={() => setTerm('summary')}><i className="fas fa-table-list" style={{ marginRight: 6 }} />Summary</button>
        </div>

        {students.length === 0 ? (
          <div style={s.empty}><i className="fas fa-user-slash" style={{ fontSize: 32, color: '#ccc', display: 'block', marginBottom: 12 }} />No students enrolled. <button style={s.btn} onClick={() => onNav('enrollment')}>Enroll Students</button></div>
        ) : term === 'summary' ? (
          <SummaryView students={students} grades={grades} ranks={ranks} males={males} females={females} />
        ) : (
          <div style={s.card}>
            <div style={{ overflowX: 'auto' }}>
              <table style={s.table}>
                <thead>
                  <tr>
                    <th style={{ ...s.th, textAlign: 'left', minWidth: 130 }}>Student</th>
                    {colHeaders.map(c => <th key={c.key} style={{ ...s.th, ...(c.computed ? { color: '#e94560' } : {}) }}>{c.label}</th>)}
                    <th style={{ ...s.th, color: '#e94560' }}>Gen Avg</th>
                    <th style={s.th}>Remarks</th>
                    <th style={s.th}>Rank</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td colSpan={colHeaders.length + 4} style={{ padding: 0 }}><div style={s.sectionHeader}><i className="fas fa-mars" style={{ marginRight: 6 }} />MALE ({males.length})</div></td></tr>
                  {males.map((st, i) => renderRow(st, i))}
                  <tr><td colSpan={colHeaders.length + 4} style={{ padding: 0 }}><div style={s.sectionHeader}><i className="fas fa-venus" style={{ marginRight: 6 }} />FEMALE ({females.length})</div></td></tr>
                  {females.map((st, i) => renderRow(st, i))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryView({ students, grades, ranks, males, females }) {
  const renderSummaryRow = (st, idx) => {
    const sg = grades[st.id] || {};
    const genAvg = computeGeneralAvg(sg);
    return (
      <tr key={st.id} style={{ background: idx % 2 ? '#fafbfc' : '#fff' }}>
        <td style={{ ...s.td, textAlign: 'left', fontWeight: 500, whiteSpace: 'nowrap', fontSize: 11, color: '#1a3a5c' }}>{idx + 1}. {st.lastName}, {st.firstName}</td>
        {SUBJECTS_G4_10.map(sub => {
          const fg = computeFinalGrade(sg, sub);
          return <td key={sub} style={{ ...s.td, fontWeight: 500 }}>{fg ?? '\u2014'}</td>;
        })}
        <td style={{ ...s.td, ...s.computed }}>{genAvg ?? '\u2014'}</td>
        <td style={{ ...s.td, ...(genAvg != null ? (genAvg >= 75 ? s.pass : s.fail) : {}) }}>{genAvg != null ? (genAvg >= 75 ? 'Passed' : 'Failed') : '\u2014'}</td>
        <td style={{ ...s.td, ...s.computed }}>{ranks[st.id] != null ? ranks[st.id] % 1 === 0 ? ranks[st.id] : ranks[st.id].toFixed(1) : '\u2014'}</td>
      </tr>
    );
  };

  return (
    <div style={s.card}>
      <h3 style={{ margin: '0 0 12px', fontSize: 16, color: '#e94560' }}><i className="fas fa-table-list" style={{ marginRight: 8 }} />Final Grades Summary (Average of 3 Terms)</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={{ ...s.th, textAlign: 'left', minWidth: 130 }}>Student</th>
              {SUBJECTS_G4_10.map(sub => <th key={sub} style={s.th}>{sub}</th>)}
              <th style={{ ...s.th, color: '#e94560' }}>Gen Avg</th>
              <th style={s.th}>Remarks</th>
              <th style={s.th}>Rank</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={SUBJECTS_G4_10.length + 4} style={{ padding: 0 }}><div style={s.sectionHeader}><i className="fas fa-mars" style={{ marginRight: 6 }} />MALE ({males.length})</div></td></tr>
            {males.map((st, i) => renderSummaryRow(st, i))}
            <tr><td colSpan={SUBJECTS_G4_10.length + 4} style={{ padding: 0 }}><div style={s.sectionHeader}><i className="fas fa-venus" style={{ marginRight: 6 }} />FEMALE ({females.length})</div></td></tr>
            {females.map((st, i) => renderSummaryRow(st, i))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Grades;

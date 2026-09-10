import React, { useState, useEffect } from 'react';
import { getSY, getCurrentSY, getStudents, getAttendance, getClassDays, setClassDays, setDaysPresent, MONTHS } from '../services/dataService';

const s = {
  wrap: { minHeight: '100vh', background: '#f5f7fa', padding: '32px 16px', fontFamily: 'Poppins, sans-serif', color: '#333' },
  container: { maxWidth: 1200, margin: '0 auto' },
  title: { fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center', color: '#1a3a5c' },
  sub: { textAlign: 'center', color: '#888', fontSize: 14, marginBottom: 24 },
  card: { background: '#fff', borderRadius: 12, padding: 20, marginBottom: 16, border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 12 },
  th: { padding: '8px 4px', textAlign: 'center', borderBottom: '2px solid #e0e0e0', color: '#888', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', position: 'sticky', top: 0, background: '#fff', zIndex: 1 },
  thName: { textAlign: 'left', minWidth: 140 },
  td: { padding: '4px 2px', borderBottom: '1px solid #f0f0f0', textAlign: 'center' },
  inp: { width: 38, padding: '5px 2px', borderRadius: 6, border: '1px solid #d0d5dd', background: '#fff', color: '#333', fontSize: 12, textAlign: 'center', fontFamily: 'Poppins, sans-serif' },
  sectionHeader: { background: '#fef2f4', padding: '6px 12px', fontWeight: 600, fontSize: 12, color: '#e94560', borderRadius: 6, marginTop: 4 },
  totalCell: { fontWeight: 600, color: '#e94560' },
  btn: { padding: '10px 24px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', background: '#e94560', color: '#fff' },
  empty: { textAlign: 'center', padding: 40, color: '#999', fontSize: 15 },
};

function AttendanceSF9({ onNav }) {
  const [syId, setSyId] = useState(null);
  const [sy, setSy] = useState(null);
  const [students, setStudents] = useState([]);
  const [att, setAtt] = useState({});
  const [cd, setCd] = useState({});
  const [, setTick] = useState(0);

  const reload = () => {
    const id = getCurrentSY();
    setSyId(id);
    if (id) { setSy(getSY(id)); setStudents(getStudents(id)); setAtt(getAttendance(id)); setCd(getClassDays(id)); }
  };
  useEffect(reload, []);

  if (!syId) return (
    <div style={s.wrap}><div style={s.container}><div style={s.empty}><i className="fas fa-folder-open" style={{ fontSize: 32, color: '#ccc', display: 'block', marginBottom: 12 }} />No school year selected. <button style={s.btn} onClick={() => onNav('schoolyear')}>Go to School Years</button></div></div></div>
  );

  const handleClassDays = (month, val) => { setClassDays(syId, month, val); setCd({ ...cd, [month]: val === '' ? null : Number(val) }); };
  const handlePresent = (studentId, month, val) => {
    setDaysPresent(syId, studentId, month, val);
    setAtt(prev => ({ ...prev, [studentId]: { ...prev[studentId], [month]: val === '' ? null : Number(val) } }));
    setTick(t => t + 1);
  };

  const totalPresent = (studentId) => MONTHS.reduce((sum, m) => sum + (att[studentId]?.[m] || 0), 0);
  const totalClassDays = () => MONTHS.reduce((sum, m) => sum + (cd[m] || 0), 0);
  const totalAbsent = (studentId) => totalClassDays() - totalPresent(studentId);

  const males = students.filter(x => x.sex === 'M');
  const females = students.filter(x => x.sex === 'F');

  const renderRows = (list, startIdx) => list.map((st, i) => (
    <tr key={st.id} style={{ background: i % 2 ? '#fafbfc' : '#fff' }}>
      <td style={{ ...s.td, textAlign: 'left', fontWeight: 500, whiteSpace: 'nowrap', color: '#1a3a5c' }}>{startIdx + i + 1}. {st.lastName}, {st.firstName}</td>
      {MONTHS.map(m => (
        <td key={m} style={s.td}>
          <input style={s.inp} type="number" min="0" max={cd[m] || 31} value={att[st.id]?.[m] ?? ''} onChange={e => handlePresent(st.id, m, e.target.value)} />
        </td>
      ))}
      <td style={{ ...s.td, ...s.totalCell }}>{totalPresent(st.id)}</td>
      <td style={{ ...s.td, color: totalAbsent(st.id) > 0 ? '#dc3545' : '#999' }}>{totalAbsent(st.id)}</td>
    </tr>
  ));

  return (
    <div style={s.wrap}>
      <div style={s.container}>
        <h1 style={s.title}><i className="fas fa-clipboard-check" style={{ color: '#e94560', marginRight: 10 }} />Attendance Record</h1>
        <p style={s.sub}>SY {sy?.name}{' \u2014 '}Grade {sy?.gradeLevel} - {sy?.section}</p>

        {students.length === 0 ? (
          <div style={s.empty}><i className="fas fa-user-slash" style={{ fontSize: 32, color: '#ccc', display: 'block', marginBottom: 12 }} />No students enrolled. <button style={s.btn} onClick={() => onNav('enrollment')}>Enroll Students</button></div>
        ) : (
          <div style={s.card}>
            <div style={{ overflowX: 'auto' }}>
              <table style={s.table}>
                <thead>
                  <tr>
                    <th style={{ ...s.th, ...s.thName }}>Student Name</th>
                    {MONTHS.map(m => <th key={m} style={s.th}>{m}</th>)}
                    <th style={s.th}>Total Present</th>
                    <th style={s.th}>Total Absent</th>
                  </tr>
                  <tr style={{ background: '#fef2f4' }}>
                    <td style={{ ...s.td, textAlign: 'left', fontWeight: 600, fontSize: 11, color: '#e94560' }}><i className="fas fa-calendar-days" style={{ marginRight: 4 }} />Class Days</td>
                    {MONTHS.map(m => (
                      <td key={m} style={s.td}>
                        <input style={{ ...s.inp, borderColor: '#e94560' }} type="number" min="0" max="31" value={cd[m] ?? ''} onChange={e => handleClassDays(m, e.target.value)} />
                      </td>
                    ))}
                    <td style={{ ...s.td, ...s.totalCell }}>{totalClassDays()}</td>
                    <td style={s.td}>{' \u2014 '}</td>
                  </tr>
                </thead>
                <tbody>
                  <tr><td colSpan={MONTHS.length + 3} style={{ padding: 0 }}><div style={s.sectionHeader}><i className="fas fa-mars" style={{ marginRight: 6 }} />MALE ({males.length})</div></td></tr>
                  {renderRows(males, 0)}
                  <tr><td colSpan={MONTHS.length + 3} style={{ padding: 0 }}><div style={s.sectionHeader}><i className="fas fa-venus" style={{ marginRight: 6 }} />FEMALE ({females.length})</div></td></tr>
                  {renderRows(females, males.length)}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AttendanceSF9;

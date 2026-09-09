import React, { useState, useEffect } from 'react';
import { getSY, getCurrentSY, getStudents, getAttendance, getClassDays, setClassDays, setDaysPresent, MONTHS } from '../services/dataService';

const s = {
  wrap: { minHeight: '100vh', background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)', padding: '32px 16px', fontFamily: 'Poppins, sans-serif', color: '#fff' },
  container: { maxWidth: 1200, margin: '0 auto' },
  title: { fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' },
  sub: { textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 24 },
  card: { background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 20, marginBottom: 16, border: '1px solid rgba(255,255,255,0.1)' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 12 },
  th: { padding: '8px 4px', textAlign: 'center', borderBottom: '2px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', position: 'sticky', top: 0, background: '#1a1a2e', zIndex: 1 },
  thName: { textAlign: 'left', minWidth: 140 },
  td: { padding: '4px 2px', borderBottom: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' },
  inp: { width: 38, padding: '5px 2px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: 12, textAlign: 'center', fontFamily: 'Poppins, sans-serif' },
  sectionHeader: { background: 'rgba(233,69,96,0.15)', padding: '6px 12px', fontWeight: 600, fontSize: 12, color: '#e94560', borderRadius: 6, marginTop: 4 },
  totalCell: { fontWeight: 600, color: '#e94560' },
  btn: { padding: '10px 24px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', background: '#e94560', color: '#fff' },
  empty: { textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.4)', fontSize: 15 },
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
    <div style={s.wrap}><div style={s.container}><div style={s.empty}>No school year selected. <button style={s.btn} onClick={() => onNav('schoolyear')}>Go to School Years</button></div></div></div>
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
    <tr key={st.id} style={{ background: i % 2 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
      <td style={{ ...s.td, textAlign: 'left', fontWeight: 500, whiteSpace: 'nowrap' }}>{startIdx + i + 1}. {st.lastName}, {st.firstName}</td>
      {MONTHS.map(m => (
        <td key={m} style={s.td}>
          <input style={s.inp} type="number" min="0" max={cd[m] || 31} value={att[st.id]?.[m] ?? ''} onChange={e => handlePresent(st.id, m, e.target.value)} />
        </td>
      ))}
      <td style={{ ...s.td, ...s.totalCell }}>{totalPresent(st.id)}</td>
      <td style={{ ...s.td, color: totalAbsent(st.id) > 0 ? '#ff6b6b' : 'rgba(255,255,255,0.5)' }}>{totalAbsent(st.id)}</td>
    </tr>
  ));

  return (
    <div style={s.wrap}>
      <div style={s.container}>
        <h1 style={s.title}>ð Attendance Record</h1>
        <p style={s.sub}>SY {sy?.name} â Grade {sy?.gradeLevel} - {sy?.section}</p>

        {students.length === 0 ? (
          <div style={s.empty}>No students enrolled. <button style={s.btn} onClick={() => onNav('enrollment')}>Enroll Students</button></div>
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
                  <tr style={{ background: 'rgba(233,69,96,0.08)' }}>
                    <td style={{ ...s.td, textAlign: 'left', fontWeight: 600, fontSize: 11, color: '#e94560' }}>Class Days</td>
                    {MONTHS.map(m => (
                      <td key={m} style={s.td}>
                        <input style={{ ...s.inp, borderColor: 'rgba(233,69,96,0.4)' }} type="number" min="0" max="31" value={cd[m] ?? ''} onChange={e => handleClassDays(m, e.target.value)} />
                      </td>
                    ))}
                    <td style={{ ...s.td, ...s.totalCell }}>{totalClassDays()}</td>
                    <td style={s.td}>â</td>
                  </tr>
                </thead>
                <tbody>
                  <tr><td colSpan={MONTHS.length + 3} style={{ padding: 0 }}><div style={s.sectionHeader}>MALE ({males.length})</div></td></tr>
                  {renderRows(males, 0)}
                  <tr><td colSpan={MONTHS.length + 3} style={{ padding: 0 }}><div style={s.sectionHeader}>FEMALE ({females.length})</div></td></tr>
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

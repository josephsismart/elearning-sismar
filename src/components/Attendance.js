import React, { useState, useMemo } from 'react';

const sections = ['Grade 9 â Narra','Grade 9 â Molave','Grade 9 â Acacia','Grade 9 â Ipil','Grade 9 â Yakal'];
const firstNames = ['Juan','Maria','Jose','Ana','Pedro','Sofia','Carlos','Isabella','Miguel','Gabriella','Rafael','Carmen','Antonio','Elena','Francisco','Lourdes','Ricardo','Teresa','Fernando','Patricia','Diego','Rosa','Alejandro','Beatriz','Manuel','Lucia','Daniel','Andrea','Gabriel','Victoria','Marco','Cristina','Eduardo','Angela','Roberto','Camila','Andres','Nicole','Sebastian','Jasmine','Mateo','Bianca','Nathan','Althea','Joshua','Mariel','Kenneth','Kyla','Renz','Janelle'];
const lastNames = ['Santos','Reyes','Cruz','Garcia','Torres','Ramos','Lopez','Gonzales','Hernandez','Martinez','Rivera','Flores','Bautista','Villanueva','Mendoza','Aquino','Castillo','Dela Cruz','Navarro','Mercado','Pascual','Salvador','Soriano','Domingo','Aguilar','Manalo','Espinosa','Magno','Tolentino','Ignacio','Dimaculangan','Lim','Tan','Ong','Chua','Sy','Que','Go','Yap','Lee'];

function generateStudents(sec) {
  const count = 35 + (sec.charCodeAt(10) % 5);
  const list = [];
  for (let i = 0; i < count; i++) {
    const fn = firstNames[(i * 7 + sec.charCodeAt(9)) % firstNames.length];
    const ln = lastNames[(i * 3 + sec.charCodeAt(11)) % lastNames.length];
    list.push({ name: `${ln}, ${fn}`, status: 'Present' });
  }
  return list.sort((a, b) => a.name.localeCompare(b.name));
}

const formatDate = (d) => d.toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const StatCard = ({ num, label, type }) => {
  const bg = { total: '#e3f2fd', present: '#e8f5e9', absent: '#ffebee', late: '#fff8e1' };
  const fg = { total: '#1565c0', present: '#2e7d32', absent: '#c62828', late: '#f57f17' };
  return (
    <div style={{ flex: 1, minWidth: 120, padding: '.75rem 1rem', borderRadius: 10, textAlign: 'center', background: bg[type], color: fg[type] }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{num}</div>
      <div style={{ fontSize: '.75rem', fontWeight: 600, textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
};

export default function Attendance() {
  const [section, setSection] = useState(sections[0]);
  const [date, setDate] = useState(new Date());
  const [search, setSearch] = useState('');

  const initialStudents = useMemo(() => {
    const map = {};
    sections.forEach(s => { map[s] = generateStudents(s); });
    return map;
  }, []);

  const [students, setStudents] = useState(initialStudents);

  const updateStatus = (idx, val) => {
    setStudents(prev => {
      const copy = { ...prev, [section]: prev[section].map((s, i) => i === idx ? { ...s, status: val } : s) };
      return copy;
    });
  };

  const markAll = (status) => {
    setStudents(prev => ({ ...prev, [section]: prev[section].map(s => ({ ...s, status })) }));
  };

  const saveAttendance = () => {
    const data = students[section].map(s => ({ name: s.name, status: s.status }));
    const blob = new Blob([JSON.stringify({ section, date: formatDate(date), records: data }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `attendance_${section.replace(/\s+/g, '_')}_${date.toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const list = students[section];
  const filtered = list.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const p = list.filter(s => s.status === 'Present').length;
  const a = list.filter(s => s.status === 'Absent').length;
  const l = list.filter(s => s.status === 'Late').length;

  const statusColor = { Present: 'var(--success)', Absent: '#e74c3c', Late: '#f39c12' };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
        <span style={{ width: 4, height: 24, background: 'var(--accent)', borderRadius: 2, display: 'inline-block' }}></span>
        Attendance Tracker
      </h2>
      <div style={{ background: 'var(--white)', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,.06)', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '.75rem' }}>
          <div>
            <label style={{ fontWeight: 600, fontSize: '.875rem', marginRight: '.5rem' }}>Section:</label>
            <select value={section} onChange={e => setSection(e.target.value)} style={{ padding: '.4rem .6rem', border: '2px solid var(--accent)', borderRadius: 6, fontSize: '.8rem', fontWeight: 600, color: 'var(--primary)', cursor: 'pointer' }}>
              {sections.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <button onClick={() => setDate(d => { const n = new Date(d); n.setDate(n.getDate() - 1); return n; })} style={{ background: 'var(--accent)', color: '#fff', border: 'none', padding: '.4rem .75rem', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>&larr;</button>
            <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--primary)', minWidth: 160, textAlign: 'center' }}>{formatDate(date)}</span>
            <button onClick={() => setDate(d => { const n = new Date(d); n.setDate(n.getDate() + 1); return n; })} style={{ background: 'var(--accent)', color: '#fff', border: 'none', padding: '.4rem .75rem', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>&rarr;</button>
          </div>
          <input type="text" placeholder="Search student..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: '.5rem .75rem', border: '2px solid var(--border)', borderRadius: 8, fontSize: '.875rem', width: 220 }} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <StatCard num={list.length} label="Total" type="total" />
          <StatCard num={p} label="Present" type="present" />
          <StatCard num={a} label="Absent" type="absent" />
          <StatCard num={l} label="Late" type="late" />
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.875rem' }}>
          <thead><tr>{['#', 'Student Name', 'Status'].map(h => <th key={h} style={{ background: 'var(--primary)', color: '#fff', padding: '.65rem .75rem', textAlign: 'left', fontWeight: 600 }}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={s.name} style={{ background: i % 2 === 0 ? '#fff' : '#fafbfc' }}>
                <td style={{ padding: '.6rem .75rem', borderBottom: '1px solid var(--border)' }}>{i + 1}</td>
                <td style={{ padding: '.6rem .75rem', borderBottom: '1px solid var(--border)' }}>{s.name}</td>
                <td style={{ padding: '.6rem .75rem', borderBottom: '1px solid var(--border)' }}>
                  <select value={s.status} onChange={e => updateStatus(list.indexOf(s), e.target.value)} style={{ padding: '.3rem .5rem', border: `2px solid ${statusColor[s.status]}`, borderRadius: 6, fontSize: '.8rem', fontWeight: 600, color: statusColor[s.status], cursor: 'pointer' }}>
                    <option>Present</option><option>Absent</option><option>Late</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'flex-end', marginTop: '1rem', flexWrap: 'wrap' }}>
          <button onClick={() => markAll('Present')} style={{ padding: '.5rem 1.25rem', border: '2px solid var(--accent)', background: '#fff', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: '.875rem', color: 'var(--accent)' }}>All Present</button>
          <button onClick={saveAttendance} style={{ padding: '.5rem 1.25rem', border: 'none', background: 'var(--accent)', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: '.875rem', color: '#fff' }}>Save Attendance</button>
        </div>
      </div>
    </div>
  );
}

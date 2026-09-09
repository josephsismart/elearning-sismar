import React, { useState, useEffect, useRef } from 'react';
import { getSY, getCurrentSY, getStudents, getGrades, getAttendance, getClassDays, getComments, setComment, computeMapehTerm, computeFinalGrade, computeGeneralAvg, computeAge, SUBJECTS_G4_10, MAPEH_SUBS, MONTHS, TERMS } from '../services/dataService';

const ps = {
  page: { width: '210mm', minHeight: '297mm', margin: '0 auto', padding: '12mm 14mm', background: '#fff', color: '#000', fontSize: '9pt', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box', pageBreakAfter: 'always' },
  header: { textAlign: 'center', marginBottom: 8 },
  headerLine: { fontSize: '8pt', margin: 0, lineHeight: 1.4 },
  schoolName: { fontSize: '12pt', fontWeight: 700, margin: '4px 0' },
  formTitle: { fontSize: '11pt', fontWeight: 700, margin: '8px 0 4px', textAlign: 'center' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '8pt' },
  th: { border: '1px solid #000', padding: '3px 4px', fontWeight: 700, textAlign: 'center', fontSize: '7pt', background: '#f0f0f0' },
  td: { border: '1px solid #000', padding: '2px 4px', textAlign: 'center', fontSize: '8pt' },
  tdLeft: { border: '1px solid #000', padding: '2px 4px', textAlign: 'left', fontSize: '8pt' },
  infoRow: { display: 'flex', justifyContent: 'space-between', fontSize: '8pt', marginBottom: 2, flexWrap: 'wrap', gap: 4 },
  infoItem: { display: 'flex', gap: 4 },
  label: { fontWeight: 700 },
  sectionTitle: { fontWeight: 700, fontSize: '9pt', margin: '8px 0 4px', borderBottom: '1px solid #000', paddingBottom: 2 },
  sigLine: { borderBottom: '1px solid #000', width: 160, display: 'inline-block', marginLeft: 6 },
  commentBox: { border: '1px solid #000', padding: 4, minHeight: 30, fontSize: '8pt', margin: '2px 0' },
};

function SF9Report({ onNav }) {
  const [syId, setSyId] = useState(null);
  const [sy, setSy] = useState(null);
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState({});
  const [att, setAtt] = useState({});
  const [cd, setCd] = useState({});
  const [comments, setComments] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [editComments, setEditComments] = useState(false);
  const printRef = useRef();

  const reload = () => {
    const id = getCurrentSY();
    setSyId(id);
    if (id) {
      const s = getSY(id);
      setSy(s);
      setStudents(getStudents(id));
      setGrades(getGrades(id));
      setAtt(getAttendance(id));
      setCd(getClassDays(id));
      setComments(getComments(id));
    }
  };
  useEffect(reload, []);

  if (!syId) return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)', padding: '32px 16px', fontFamily: 'Poppins, sans-serif', color: '#fff', textAlign: 'center', paddingTop: 80 }}>
      No school year selected. <button style={{ padding: '10px 24px', borderRadius: 8, border: 'none', fontWeight: 600, background: '#e94560', color: '#fff', cursor: 'pointer', marginLeft: 8 }} onClick={() => onNav('schoolyear')}>Go to School Years</button>
    </div>
  );

  const handlePrint = () => {
    const content = printRef.current;
    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html><html><head><title>SF9 Report Card</title><style>
      @page { size: A4; margin: 8mm; }
      @media print { body { margin:0; } .page { page-break-after: always; } .page:last-child { page-break-after: auto; } }
      body { font-family: Arial, sans-serif; font-size: 9pt; color: #000; }
      table { border-collapse: collapse; width: 100%; } th, td { border: 1px solid #000; padding: 2px 4px; }
      th { background: #f0f0f0; font-size: 7pt; } .no-print { display: none; }
    </style></head><body>${content.innerHTML}</body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 500);
  };

  const handleCommentChange = (studentId, term, text) => {
    setComment(syId, studentId, term, text);
    setComments(prev => ({ ...prev, [studentId]: { ...prev[studentId], [term]: text } }));
  };

  const studentsToRender = selectedId ? students.filter(x => x.id === selectedId) : students;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)', padding: '32px 16px', fontFamily: 'Poppins, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>SF9 Report Card</h1>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 16 }}>SY {sy?.name} — Grade {sy?.gradeLevel} - {sy?.section}</p>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
          <select style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 14, fontFamily: 'Poppins, sans-serif' }}
            value={selectedId || ''} onChange={e => setSelectedId(e.target.value || null)}>
            <option value="">All Students ({students.length})</option>
            {students.map(st => <option key={st.id} value={st.id}>{st.lastName}, {st.firstName}</option>)}
          </select>
          <button onClick={() => setEditComments(!editComments)} style={{ padding: '8px 18px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: editComments ? '#e94560' : 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 14, cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }}>
            {editComments ? 'Done Editing' : 'Edit Comments'}
          </button>
          <button onClick={handlePrint} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: '#e94560', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }}>
            Print
          </button>
        </div>

        <div ref={printRef}>
          {studentsToRender.map(st => (
            <ReportCard key={st.id} student={st} sy={sy} grades={grades[st.id] || {}} attendance={att[st.id] || {}} classDays={cd} comments={comments[st.id] || {}} editComments={editComments} onCommentChange={(term, text) => handleCommentChange(st.id, term, text)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportCard({ student, sy, grades, attendance, classDays, comments, editComments, onCommentChange }) {
  const st = student;
  const genAvg = computeGeneralAvg(grades);
  const totalPresent = MONTHS.reduce((sum, m) => sum + (attendance[m] || 0), 0);
  const totalClassDays = MONTHS.reduce((sum, m) => sum + (classDays[m] || 0), 0);

  return (
    <div className="page" style={ps.page}>
      {/* Header */}
      <div style={ps.header}>
        <p style={ps.headerLine}>Republic of the Philippines</p>
        <p style={ps.headerLine}>Department of Education</p>
        <p style={ps.headerLine}>{sy?.region || 'Region'} — {sy?.division || 'Division'}</p>
        <p style={ps.headerLine}>{sy?.district || 'District'}</p>
        <p style={ps.schoolName}>{sy?.schoolName || 'School Name'}</p>
        <p style={{ ...ps.headerLine, fontSize: '7pt' }}>School ID: {sy?.schoolId || '______'}</p>
      </div>

      <div style={ps.formTitle}>SCHOOL FORM 9 (SF9) LEARNER'S PROGRESS REPORT CARD</div>

      {/* Student Info */}
      <div style={{ border: '1px solid #000', padding: 6, marginBottom: 6 }}>
        <div style={ps.infoRow}>
          <div style={ps.infoItem}><span style={ps.label}>Name:</span> {st.lastName}, {st.firstName} {st.middleName || ''}</div>
          <div style={ps.infoItem}><span style={ps.label}>Age:</span> {computeAge(st.birthdate)}</div>
          <div style={ps.infoItem}><span style={ps.label}>Sex:</span> {st.sex === 'M' ? 'Male' : 'Female'}</div>
        </div>
        <div style={ps.infoRow}>
          <div style={ps.infoItem}><span style={ps.label}>LRN:</span> {st.lrn || '____________'}</div>
          <div style={ps.infoItem}><span style={ps.label}>Grade:</span> {sy?.gradeLevel}</div>
          <div style={ps.infoItem}><span style={ps.label}>Section:</span> {sy?.section}</div>
          <div style={ps.infoItem}><span style={ps.label}>School Year:</span> {sy?.name}</div>
        </div>
      </div>

      {/* Attendance */}
      <div style={ps.sectionTitle}>REPORT ON ATTENDANCE</div>
      <table style={ps.table}>
        <thead>
          <tr>
            <th style={ps.th}></th>
            {MONTHS.map(m => <th key={m} style={ps.th}>{m}</th>)}
            <th style={ps.th}>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ ...ps.tdLeft, fontWeight: 700, fontSize: '7pt' }}>No. of School Days</td>
            {MONTHS.map(m => <td key={m} style={ps.td}>{classDays[m] || ''}</td>)}
            <td style={{ ...ps.td, fontWeight: 700 }}>{totalClassDays || ''}</td>
          </tr>
          <tr>
            <td style={{ ...ps.tdLeft, fontWeight: 700, fontSize: '7pt' }}>No. of Days Present</td>
            {MONTHS.map(m => <td key={m} style={ps.td}>{attendance[m] || ''}</td>)}
            <td style={{ ...ps.td, fontWeight: 700 }}>{totalPresent || ''}</td>
          </tr>
          <tr>
            <td style={{ ...ps.tdLeft, fontWeight: 700, fontSize: '7pt' }}>No. of Days Absent</td>
            {MONTHS.map(m => {
              const d = (classDays[m] || 0) - (attendance[m] || 0);
              return <td key={m} style={ps.td}>{d > 0 ? d : ''}</td>;
            })}
            <td style={{ ...ps.td, fontWeight: 700 }}>{totalClassDays - totalPresent > 0 ? totalClassDays - totalPresent : ''}</td>
          </tr>
        </tbody>
      </table>

      {/* Grades */}
      <div style={ps.sectionTitle}>LEARNER'S PROGRESS REPORT</div>
      <table style={ps.table}>
        <thead>
          <tr>
            <th style={{ ...ps.th, textAlign: 'left' }}>Learning Areas</th>
            <th style={ps.th}>Term 1</th>
            <th style={ps.th}>Term 2</th>
            <th style={ps.th}>Term 3</th>
            <th style={ps.th}>Final Grade</th>
            <th style={ps.th}>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {SUBJECTS_G4_10.map(sub => {
            const fg = computeFinalGrade(grades, sub);
            return (
              <React.Fragment key={sub}>
                <tr>
                  <td style={{ ...ps.tdLeft, fontWeight: sub === 'MAPEH' ? 700 : 400 }}>{sub}</td>
                  {TERMS.map(t => {
                    const v = sub === 'MAPEH' ? computeMapehTerm(grades, t) : grades[sub]?.[t];
                    return <td key={t} style={ps.td}>{v ?? ''}</td>;
                  })}
                  <td style={{ ...ps.td, fontWeight: 700 }}>{fg ?? ''}</td>
                  <td style={{ ...ps.td, fontWeight: 600, color: fg != null ? (fg >= 75 ? '#228B22' : '#CC0000') : '#000' }}>{fg != null ? (fg >= 75 ? 'Passed' : 'Failed') : ''}</td>
                </tr>
                {sub === 'MAPEH' && MAPEH_SUBS.map(ms => (
                  <tr key={ms} style={{ background: '#fafafa' }}>
                    <td style={{ ...ps.tdLeft, paddingLeft: 16, fontSize: '7pt', color: '#555' }}>{ms === 'MA' ? 'Music & Arts' : 'PE & Health'}</td>
                    {TERMS.map(t => <td key={t} style={{ ...ps.td, color: '#555', fontSize: '7pt' }}>{grades[ms]?.[t] ?? ''}</td>)}
                    <td style={ps.td}></td><td style={ps.td}></td>
                  </tr>
                ))}
              </React.Fragment>
            );
          })}
          <tr style={{ background: '#e8e8e8' }}>
            <td style={{ ...ps.tdLeft, fontWeight: 700 }}>General Average</td>
            <td colSpan={3} style={ps.td}></td>
            <td style={{ ...ps.td, fontWeight: 700, fontSize: '10pt' }}>{genAvg ?? ''}</td>
            <td style={{ ...ps.td, fontWeight: 700, color: genAvg != null ? (genAvg >= 75 ? '#228B22' : '#CC0000') : '#000' }}>{genAvg != null ? (genAvg >= 75 ? 'Passed' : 'Failed') : ''}</td>
          </tr>
        </tbody>
      </table>

      {/* Teacher Comments */}
      <div style={ps.sectionTitle}>TEACHER'S COMMENTS</div>
      {TERMS.map(t => (
        <div key={t} style={{ marginBottom: 4 }}>
          <span style={{ fontWeight: 700, fontSize: '8pt' }}>Term {t}: </span>
          {editComments ? (
            <input value={comments[t] || ''} onChange={e => onCommentChange(t, e.target.value)}
              style={{ width: '80%', padding: 3, fontSize: '8pt', border: '1px solid #999', borderRadius: 3 }} />
          ) : (
            <span style={{ fontSize: '8pt' }}>{comments[t] || '________________________________________'}</span>
          )}
        </div>
      ))}

      {/* Signatures */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, fontSize: '8pt' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={ps.sigLine}>{sy?.adviser || ''}</div>
          <div style={{ fontWeight: 700, marginTop: 2 }}>Class Adviser</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={ps.sigLine}></div>
          <div style={{ fontWeight: 700, marginTop: 2 }}>Parent/Guardian</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={ps.sigLine}>{sy?.schoolHead || ''}</div>
          <div style={{ fontWeight: 700, marginTop: 2 }}>School Head</div>
        </div>
      </div>
    </div>
  );
}

export default SF9Report;

import React, { useState, useEffect, useRef } from 'react';
import { getSY, getCurrentSY, getStudents, getGrades, getAttendance, getClassDays, getComments, setComment, computeMapehTerm, computeFinalGrade, computeGeneralAvg, computeAge, SUBJECTS_G4_10, MAPEH_SUBS, MONTHS, TERMS } from '../services/dataService';

const DESCRIPTORS = [
  { range: '90-100', descriptor: 'Outstanding' },
  { range: '85-89', descriptor: 'Very Satisfactory' },
  { range: '80-84', descriptor: 'Satisfactory' },
  { range: '75-79', descriptor: 'Fairly Satisfactory' },
  { range: 'Below 75', descriptor: 'Did Not Meet Expectations' },
];

const ps = {
  page: { width: '210mm', minHeight: '297mm', margin: '0 auto', padding: '10mm 12mm', background: '#fff', color: '#000', fontSize: '8pt', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box', pageBreakAfter: 'always' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '7.5pt' },
  th: { border: '1px solid #000', padding: '2px 3px', fontWeight: 700, textAlign: 'center', fontSize: '6.5pt', background: '#f5f5f5' },
  td: { border: '1px solid #000', padding: '1px 3px', textAlign: 'center', fontSize: '7.5pt' },
  tdLeft: { border: '1px solid #000', padding: '1px 4px', textAlign: 'left', fontSize: '7.5pt' },
  label: { fontWeight: 700, fontSize: '7pt' },
  sigLine: { borderBottom: '1px solid #000', width: 140, display: 'inline-block', marginLeft: 4 },
};

const ws = {
  wrap: { minHeight: '100vh', background: '#f5f7fa', padding: '32px 16px', fontFamily: 'Poppins, sans-serif', color: '#333' },
  container: { maxWidth: 1100, margin: '0 auto' },
  title: { fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center', color: '#1a3a5c' },
  sub: { textAlign: 'center', color: '#888', fontSize: 14, marginBottom: 16 },
  controls: { display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 },
  select: { padding: '8px 12px', borderRadius: 8, border: '1px solid #d0d5dd', background: '#fff', color: '#333', fontSize: 14, fontFamily: 'Poppins, sans-serif' },
  btn: { padding: '8px 18px', borderRadius: 8, border: 'none', fontSize: 14, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontWeight: 600 },
  btnPrimary: { background: '#e94560', color: '#fff' },
  btnOutline: { background: '#fff', color: '#555', border: '1px solid #d0d5dd' },
  btnActive: { background: '#e94560', color: '#fff', border: 'none' },
  empty: { textAlign: 'center', padding: 40, color: '#999', fontSize: 15 },
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
    <div style={ws.wrap}><div style={ws.container}><div style={ws.empty}><i className="fas fa-folder-open" style={{ fontSize: 32, color: '#ccc', display: 'block', marginBottom: 12 }} />No school year selected. <button style={{ ...ws.btn, ...ws.btnPrimary, marginLeft: 8 }} onClick={() => onNav('schoolyear')}>Go to School Years</button></div></div></div>
  );

  const handlePrint = () => {
    const content = printRef.current;
    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html><html><head><title>SF9 Report Card - ${sy?.name || ''}</title><style>
      @page { size: A4 landscape; margin: 6mm; }
      @media print { body { margin:0; } .page { page-break-after: always; } .page:last-child { page-break-after: auto; } }
      body { font-family: Arial, sans-serif; font-size: 8pt; color: #000; margin: 0; }
      table { border-collapse: collapse; width: 100%; } th, td { border: 1px solid #000; padding: 2px 3px; }
      th { background: #f5f5f5; font-size: 6.5pt; } .no-print { display: none; }
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
    <div style={ws.wrap}>
      <div style={ws.container}>
        <h1 style={ws.title}><i className="fas fa-file-lines" style={{ color: '#e94560', marginRight: 10 }} />SF9 Report Card</h1>
        <p style={ws.sub}>SY {sy?.name} {'â'} Grade {sy?.gradeLevel} - {sy?.section}</p>

        <div style={ws.controls}>
          <select style={ws.select} value={selectedId || ''} onChange={e => setSelectedId(e.target.value || null)}>
            <option value="">All Students ({students.length})</option>
            {students.map(st => <option key={st.id} value={st.id}>{st.lastName}, {st.firstName}</option>)}
          </select>
          <button onClick={() => setEditComments(!editComments)} style={{ ...ws.btn, ...(editComments ? ws.btnActive : ws.btnOutline) }}>
            <i className={editComments ? 'fas fa-check' : 'fas fa-pen'} style={{ marginRight: 6 }} />
            {editComments ? 'Done Editing' : 'Edit Comments'}
          </button>
          <button onClick={handlePrint} style={{ ...ws.btn, ...ws.btnPrimary }}>
            <i className="fas fa-print" style={{ marginRight: 6 }} />Print
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
  const totalAbsent = totalClassDays - totalPresent;

  return (
    <div className="page" style={{ ...ps.page, display: 'flex', gap: '8mm' }}>
      {/* LEFT SIDE - Student Info + Grades + Descriptors */}
      <div style={{ flex: '1 1 50%', minWidth: 0 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 6 }}>
          <p style={{ margin: 0, fontSize: '7pt', lineHeight: 1.3 }}>Republic of the Philippines</p>
          <p style={{ margin: 0, fontSize: '7pt', fontWeight: 700 }}>Department of Education</p>
          <p style={{ margin: '3px 0', fontSize: '10pt', fontWeight: 700 }}>LEARNER'S PROGRESS REPORT CARD</p>
          <p style={{ margin: 0, fontSize: '7pt' }}>(DepEd Order No. 8, s. 2015)</p>
        </div>

        {/* Student Info */}
        <div style={{ border: '1px solid #000', padding: '4px 6px', marginBottom: 6, fontSize: '7.5pt' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 2 }}>
            <span><b>School:</b> {sy?.schoolName || '________'}</span>
            <span><b>School ID:</b> {sy?.schoolId || '________'}</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 2 }}>
            <span><b>Name:</b> {st.lastName}, {st.firstName} {st.middleName || ''}</span>
            <span><b>Sex:</b> {st.sex === 'M' ? 'Male' : 'Female'}</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 2 }}>
            <span><b>Grade & Section:</b> {sy?.gradeLevel} - {sy?.section}</span>
            <span><b>SY:</b> {sy?.name}</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span><b>LRN:</b> {st.lrn || '____________'}</span>
            <span><b>Age:</b> {computeAge(st.birthdate)}</span>
          </div>
        </div>

        {/* Learning Progress Table */}
        <p style={{ margin: '4px 0 2px', fontWeight: 700, fontSize: '8pt', textAlign: 'center' }}>REPORT ON LEARNING PROGRESS AND ACHIEVEMENT</p>
        <table style={ps.table}>
          <thead>
            <tr>
              <th style={{ ...ps.th, textAlign: 'left', width: '30%' }}>Learning Areas</th>
              {TERMS.map(t => <th key={t} style={ps.th}>Q{t}</th>)}
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
                    <td style={{ ...ps.td, fontSize: '6.5pt', fontWeight: 600, color: fg != null ? (fg >= 75 ? '#228B22' : '#CC0000') : '#000' }}>{fg != null ? (fg >= 75 ? 'Passed' : 'Failed') : ''}</td>
                  </tr>
                  {sub === 'MAPEH' && MAPEH_SUBS.map(ms => (
                    <tr key={ms} style={{ background: '#fafafa' }}>
                      <td style={{ ...ps.tdLeft, paddingLeft: 14, fontSize: '6.5pt', color: '#444' }}>{ms === 'MA' ? 'Music & Arts' : 'PE & Health'}</td>
                      {TERMS.map(t => <td key={t} style={{ ...ps.td, color: '#555', fontSize: '6.5pt' }}>{grades[ms]?.[t] ?? ''}</td>)}
                      <td style={ps.td}></td><td style={ps.td}></td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
            <tr style={{ background: '#e8e8e8' }}>
              <td style={{ ...ps.tdLeft, fontWeight: 700 }}>General Average</td>
              {TERMS.map(t => <td key={t} style={ps.td}></td>)}
              <td style={{ ...ps.td, fontWeight: 700, fontSize: '9pt' }}>{genAvg ?? ''}</td>
              <td style={{ ...ps.td, fontWeight: 700, fontSize: '6.5pt', color: genAvg != null ? (genAvg >= 75 ? '#228B22' : '#CC0000') : '#000' }}>{genAvg != null ? (genAvg >= 75 ? 'Passed' : 'Failed') : ''}</td>
            </tr>
          </tbody>
        </table>

        {/* Descriptors */}
        <p style={{ margin: '6px 0 2px', fontWeight: 700, fontSize: '7.5pt' }}>Learner's Observed Values</p>
        <table style={ps.table}>
          <thead>
            <tr>
              <th style={ps.th}>Grading Scale</th>
              <th style={ps.th}>Descriptor</th>
            </tr>
          </thead>
          <tbody>
            {DESCRIPTORS.map(d => (
              <tr key={d.range}>
                <td style={{ ...ps.td, fontSize: '7pt' }}>{d.range}</td>
                <td style={{ ...ps.td, fontSize: '7pt' }}>{d.descriptor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RIGHT SIDE - Attendance + Comments + Signatures + Certificate */}
      <div style={{ flex: '1 1 50%', minWidth: 0 }}>
        {/* Attendance */}
        <p style={{ margin: '0 0 2px', fontWeight: 700, fontSize: '8pt', textAlign: 'center' }}>REPORT ON ATTENDANCE</p>
        <table style={ps.table}>
          <thead>
            <tr>
              <th style={ps.th}>Month</th>
              <th style={ps.th}>No. of School Days</th>
              <th style={ps.th}>No. of Days Present</th>
              <th style={ps.th}>No. of Days Absent</th>
            </tr>
          </thead>
          <tbody>
            {MONTHS.map(m => {
              const days = classDays[m] || 0;
              const present = attendance[m] || 0;
              const absent = days - present;
              return (
                <tr key={m}>
                  <td style={{ ...ps.tdLeft, fontWeight: 500, fontSize: '7pt' }}>{m}</td>
                  <td style={ps.td}>{days || ''}</td>
                  <td style={ps.td}>{present || ''}</td>
                  <td style={ps.td}>{absent > 0 ? absent : ''}</td>
                </tr>
              );
            })}
            <tr style={{ background: '#e8e8e8' }}>
              <td style={{ ...ps.tdLeft, fontWeight: 700 }}>TOTAL</td>
              <td style={{ ...ps.td, fontWeight: 700 }}>{totalClassDays || ''}</td>
              <td style={{ ...ps.td, fontWeight: 700 }}>{totalPresent || ''}</td>
              <td style={{ ...ps.td, fontWeight: 700 }}>{totalAbsent > 0 ? totalAbsent : ''}</td>
            </tr>
          </tbody>
        </table>

        {/* Teacher's Comments */}
        <p style={{ margin: '8px 0 2px', fontWeight: 700, fontSize: '7.5pt' }}>TEACHER'S COMMENTS</p>
        <div style={{ border: '1px solid #000', padding: 4, marginBottom: 6 }}>
          {TERMS.map(t => (
            <div key={t} style={{ marginBottom: 3, fontSize: '7.5pt' }}>
              <span style={{ fontWeight: 700 }}>Quarter {t}: </span>
              {editComments ? (
                <input value={comments[t] || ''} onChange={e => onCommentChange(t, e.target.value)}
                  style={{ width: '75%', padding: 2, fontSize: '7.5pt', border: '1px solid #999', borderRadius: 2 }} />
              ) : (
                <span>{comments[t] || '________________________________________'}</span>
              )}
            </div>
          ))}
        </div>

        {/* Signatures */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: '7pt' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={ps.sigLine}>{sy?.adviser || ''}</div>
            <div style={{ fontWeight: 700, marginTop: 2 }}>Class Adviser</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={ps.sigLine}>{sy?.schoolHead || ''}</div>
            <div style={{ fontWeight: 700, marginTop: 2 }}>School Head</div>
          </div>
        </div>

        {/* Parent/Guardian Signature */}
        <p style={{ margin: '10px 0 2px', fontWeight: 700, fontSize: '7.5pt' }}>PARENT/GUARDIAN'S SIGNATURE</p>
        <table style={ps.table}>
          <thead>
            <tr>
              <th style={ps.th}>Quarter</th>
              <th style={ps.th}>Signature Over Printed Name</th>
              <th style={ps.th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {TERMS.map(t => (
              <tr key={t}>
                <td style={{ ...ps.td, fontSize: '7pt' }}>Q{t}</td>
                <td style={{ ...ps.td, minWidth: 80, height: 16 }}></td>
                <td style={{ ...ps.td, minWidth: 50 }}></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Certificate of Transfer */}
        <div style={{ border: '1px solid #000', padding: '4px 6px', marginTop: 8, fontSize: '7pt' }}>
          <p style={{ margin: '0 0 3px', fontWeight: 700, fontSize: '7.5pt' }}>CERTIFICATE OF TRANSFER</p>
          <p style={{ margin: '2px 0' }}>Admitted to Grade _____ Section _____ </p>
          <p style={{ margin: '2px 0' }}>Eligible for admission to Grade _____</p>
          <p style={{ margin: '2px 0' }}>Approved:</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={ps.sigLine}></div>
              <div style={{ fontWeight: 700, marginTop: 2, fontSize: '6.5pt' }}>Principal/School Head</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={ps.sigLine}></div>
              <div style={{ fontWeight: 700, marginTop: 2, fontSize: '6.5pt' }}>Date</div>
            </div>
          </div>
        </div>

        {/* Cancellation of Eligibility */}
        <div style={{ border: '1px solid #000', padding: '4px 6px', marginTop: 4, fontSize: '7pt' }}>
          <p style={{ margin: '0 0 3px', fontWeight: 700, fontSize: '7.5pt' }}>CANCELLATION OF ELIGIBILITY TO TRANSFER</p>
          <p style={{ margin: '2px 0' }}>Admitted to: ______________________________</p>
          <p style={{ margin: '2px 0' }}>Date: _______________</p>
          <div style={{ textAlign: 'center', marginTop: 6 }}>
            <div style={ps.sigLine}></div>
            <div style={{ fontWeight: 700, marginTop: 2, fontSize: '6.5pt' }}>Principal/School Head</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SF9Report;

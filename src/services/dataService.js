// SF9 Data Service - localStorage-based persistence for DepEd School Form 9
// Supports Grades 4-10, 3-term grading, MAPEH sub-components, attendance Jun-Apr

const STORAGE_KEY = 'sf9_data';

const SUBJECTS_G4_10 = ['Filipino', 'English', 'Mathematics', 'Science', 'AP', 'GMRC/VE', 'EPP/TLE', 'MAPEH'];
const MAPEH_SUBS = ['MA', 'PEH'];
const MONTHS = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
const TERMS = [1, 2, 3];
const GRADE_LEVELS = [4, 5, 6, 7, 8, 9, 10];

// ===== SEED DATA from SF1 (School Form 1) =====
const SEED_STUDENTS = [
  { id: '1', lrn: '472508170011', lastName: 'ACERO', firstName: 'ETHAN JAMES', middleName: 'CASTILLO', sex: 'M', birthdate: '2011-10-20' },
  { id: '2', lrn: '132111170034', lastName: 'ALBARACIN', firstName: 'KINON', middleName: 'DEPAY', sex: 'M', birthdate: '2010-10-05' },
  { id: '3', lrn: '132115170006', lastName: 'ALCANTARA', firstName: 'BRYAN', middleName: 'SALON', sex: 'M', birthdate: '2011-11-11' },
  { id: '4', lrn: '405969150052', lastName: 'ARQUIZA', firstName: 'DALE DAN', middleName: 'BENITO', sex: 'M', birthdate: '2011-09-01' },
  { id: '5', lrn: '409068170001', lastName: 'ATILLO', firstName: 'EDDIE BERL', middleName: 'LOPENA', sex: 'M', birthdate: '2011-10-15' },
  { id: '6', lrn: '132118170122', lastName: 'ATO', firstName: 'BRENT JAMES', middleName: 'BONGO', sex: 'M', birthdate: '2011-10-21' },
  { id: '7', lrn: '132025170255', lastName: 'BAGATCHOLON', firstName: 'SIMON JAMES', middleName: 'MONDEJAR', sex: 'M', birthdate: '2010-10-28' },
  { id: '8', lrn: '132118160065', lastName: 'BETITA', firstName: 'JOHN-DREXLER', middleName: 'LUZA', sex: 'M', birthdate: '2009-12-10' },
  { id: '9', lrn: '132117170016', lastName: 'BRASE', firstName: 'JERENZ', middleName: 'BULAT-AG', sex: 'M', birthdate: '2010-12-13' },
  { id: '10', lrn: '132118170036', lastName: 'CAINGLES', firstName: 'JUNEL', middleName: 'SEGOVIA', sex: 'M', birthdate: '2011-07-27' },
  { id: '11', lrn: '212503170004', lastName: 'CANTERO', firstName: 'TRISTIAN', middleName: 'CELEDIO', sex: 'M', birthdate: '2012-01-18' },
  { id: '12', lrn: '212503170005', lastName: 'CERIAL', firstName: 'JOHN LLOYD', middleName: 'VENDER', sex: 'M', birthdate: '2011-06-13' },
  { id: '13', lrn: '212502170155', lastName: 'DALAPU', firstName: 'CALEB MYRRH', middleName: '', sex: 'M', birthdate: '2012-04-01' },
  { id: '14', lrn: '472517170003', lastName: 'DAPAR', firstName: 'BRAZEN', middleName: 'SUMATRA', sex: 'M', birthdate: '2011-12-19' },
  { id: '15', lrn: '472513170005', lastName: 'FORTUN', firstName: 'NASH EMMANUEL', middleName: 'ADORMEO', sex: 'M', birthdate: '2011-12-31' },
  { id: '16', lrn: '132118170214', lastName: 'GABOR', firstName: 'JOHN KING', middleName: 'BARRIOS', sex: 'M', birthdate: '2011-12-11' },
  { id: '17', lrn: '132118160103', lastName: 'GACULA', firstName: 'ANDRIE STAR', middleName: 'ASPILI', sex: 'M', birthdate: '2010-11-16' },
  { id: '18', lrn: '132118170096', lastName: 'GALINATO', firstName: 'MELJUNE', middleName: 'GABOR', sex: 'M', birthdate: '2012-05-31' },
  { id: '19', lrn: '132084170032', lastName: 'GUINSOD', firstName: 'ALVIN', middleName: 'OMAC', sex: 'M', birthdate: '2012-03-13' },
  { id: '20', lrn: '132112170059', lastName: 'LABOR', firstName: 'BLAKE LEBRON', middleName: 'CURILAN', sex: 'M', birthdate: '2012-04-11' },
  { id: '21', lrn: '132057170264', lastName: 'LACAR', firstName: 'KEVIN MISHLEY', middleName: 'SEGOVIA', sex: 'M', birthdate: '2012-07-23' },
  { id: '22', lrn: '132112170044', lastName: 'MENDEZ', firstName: 'STEVE', middleName: '', sex: 'M', birthdate: '2012-03-01' },
  { id: '23', lrn: '132123170042', lastName: 'ORTEGA', firstName: 'RAFAEL', middleName: 'MONGADO', sex: 'M', birthdate: '2011-12-18' },
  { id: '24', lrn: '212503160008', lastName: 'PACUDAN', firstName: 'JENARD', middleName: 'RODRIGUEZ', sex: 'M', birthdate: '2008-01-29' },
  { id: '25', lrn: '212503170020', lastName: 'PAGULA', firstName: 'JAROSE', middleName: 'RELOSA', sex: 'M', birthdate: '2011-08-15' },
  { id: '26', lrn: '132112170031', lastName: 'PLAZA', firstName: 'ANDREW', middleName: 'ASTRONOMO', sex: 'M', birthdate: '2012-09-08' },
  { id: '27', lrn: '132230170034', lastName: 'ROCULAS', firstName: 'CALIX', middleName: 'SUGIAN', sex: 'M', birthdate: '2011-11-17' },
  { id: '28', lrn: '132531170013', lastName: 'SULAPAS', firstName: 'MARC CHRISTIAN', middleName: 'CAMPOS', sex: 'M', birthdate: '2012-01-19' },
  { id: '29', lrn: '405969170030', lastName: 'TABARES', firstName: 'STEVEN ZAIRE', middleName: 'DEMAIN', sex: 'M', birthdate: '2011-10-03' },
  { id: '30', lrn: '132118170074', lastName: 'TIBULONG', firstName: 'JASON', middleName: 'BAYOCBOC', sex: 'M', birthdate: '2011-12-04' },
  { id: '31', lrn: '132118160072', lastName: 'TIMSAY', firstName: 'RODEL', middleName: 'JR TRILLO', sex: 'M', birthdate: '2010-12-12' },
  { id: '32', lrn: '500047170078', lastName: 'VILLASEÃOR', firstName: 'KEAN', middleName: 'DOMOSMOG', sex: 'M', birthdate: '2011-11-03' },
  { id: '33', lrn: '132112170043', lastName: 'AMPER', firstName: 'REMEIA QUEEN', middleName: '', sex: 'F', birthdate: '2012-01-10' },
  { id: '34', lrn: '472513170035', lastName: 'BUQUE', firstName: 'KHEXIA FAYE', middleName: 'LOR', sex: 'F', birthdate: '2012-02-04' },
  { id: '35', lrn: '132115170021', lastName: 'CIMAGALA', firstName: 'MARIAN VE', middleName: 'ESPINOSA', sex: 'F', birthdate: '2011-09-27' },
  { id: '36', lrn: '132118170158', lastName: 'CLEMENTE', firstName: 'CHERRY MAE', middleName: 'LISO', sex: 'F', birthdate: '2011-09-02' },
  { id: '37', lrn: '127693170011', lastName: 'CORPUZ', firstName: 'DANIAH FRANCINE', middleName: 'JAGONAL', sex: 'F', birthdate: '2012-02-01' },
  { id: '38', lrn: '212503170040', lastName: 'DELISO', firstName: 'JANE MEA', middleName: 'FLORENDO', sex: 'F', birthdate: '2012-07-06' },
  { id: '39', lrn: '132117170017', lastName: 'FAJARDO', firstName: 'MARIA SOPHIA', middleName: 'PIGTE', sex: 'F', birthdate: '2011-11-12' },
  { id: '40', lrn: '132118170139', lastName: 'GUBATON', firstName: 'MIKAELA NICOLE', middleName: 'BIZAR', sex: 'F', birthdate: '2012-05-30' },
  { id: '41', lrn: '132117170025', lastName: 'HIANGAN', firstName: 'CYREL', middleName: 'BAQUIRAN', sex: 'F', birthdate: '2012-03-17' },
  { id: '42', lrn: '132115170027', lastName: 'LLAGAS', firstName: 'JESSIECA JANE', middleName: 'GAZMIN', sex: 'F', birthdate: '2012-08-26' },
  { id: '43', lrn: '132118170152', lastName: 'MEDINA', firstName: 'APRIL JANE', middleName: 'MUSICO', sex: 'F', birthdate: '2012-04-20' },
  { id: '44', lrn: '132112170033', lastName: 'NOJA', firstName: 'JUANNA', middleName: 'LIMATO', sex: 'F', birthdate: '2012-01-17' },
  { id: '45', lrn: '406698170041', lastName: 'PAMAT', firstName: 'GIVEN GRACE', middleName: 'SILVANO', sex: 'F', birthdate: '2012-04-27' },
  { id: '46', lrn: '132054170068', lastName: 'POGADO', firstName: 'ANGEL SOFIA', middleName: 'CACAL', sex: 'F', birthdate: '2011-08-13' },
  { id: '47', lrn: '405969170026', lastName: 'RADAZA', firstName: 'PRECIOUS AMHEY', middleName: 'NAMANAS', sex: 'F', birthdate: '2011-12-28' },
  { id: '48', lrn: '132118170210', lastName: 'REBUYON', firstName: 'KATE CHOLINE', middleName: 'RACINES', sex: 'F', birthdate: '2011-08-04' },
  { id: '49', lrn: '119997170482', lastName: 'ROSARIO', firstName: 'APRIL ROSE', middleName: 'SULLANO', sex: 'F', birthdate: '2012-04-01' },
  { id: '50', lrn: '131580170134', lastName: 'SAGUSAY', firstName: 'MIDORI', middleName: 'CULOB', sex: 'F', birthdate: '2012-08-30' },
  { id: '51', lrn: '132118160245', lastName: 'SENDICO', firstName: 'CHELSEA', middleName: 'ORTEGA', sex: 'F', birthdate: '2011-04-15' },
];

const SEED_SY = {
  id: 'sy2026-mercury',
  name: '2026 - 2027',
  schoolName: 'Libertad National High School',
  schoolId: '304763',
  region: 'CARAGA',
  division: 'Butuan City',
  city: 'Butuan City',
  district: '',
  schoolHead: '',
  adviser: 'Marie Michelle L. Sismar',
  gradeLevel: 9,
  section: 'Mercury',
  students: SEED_STUDENTS,
  attendance: {},
  grades: {},
  comments: {},
  classDaysConfig: {},
};

const SEED_VERSION = 'sf1_v2';

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : null;
    if (data && data.seedVersion === SEED_VERSION) return data;
    // Auto-seed or re-seed with real SF1 data
    const seeded = {
      schoolYears: [{ ...SEED_SY }],
      currentSY: SEED_SY.id,
      seedVersion: SEED_VERSION,
    };
    saveData(seeded);
    return seeded;
  } catch {
    const seeded = {
      schoolYears: [{ ...SEED_SY }],
      currentSY: SEED_SY.id,
      seedVersion: SEED_VERSION,
    };
    saveData(seeded);
    return seeded;
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getSchoolYears() { return loadData().schoolYears; }
export function getCurrentSY() { return loadData().currentSY; }

export function createSchoolYear(sy) {
  const data = loadData();
  if (data.schoolYears.find(s => s.name === sy.name && s.gradeLevel === sy.gradeLevel && s.section === sy.section)) return null;
  const entry = { ...sy, id: Date.now().toString(), students: [], attendance: {}, grades: {}, comments: {} };
  data.schoolYears.push(entry);
  if (!data.currentSY) data.currentSY = entry.id;
  saveData(data);
  return entry;
}

export function selectSchoolYear(id) { const data = loadData(); data.currentSY = id; saveData(data); }

export function deleteSchoolYear(id) {
  const data = loadData();
  data.schoolYears = data.schoolYears.filter(s => s.id !== id);
  if (data.currentSY === id) data.currentSY = data.schoolYears.length ? data.schoolYears[0].id : null;
  saveData(data);
}

export function getSY(id) { return loadData().schoolYears.find(s => s.id === id) || null; }

export function updateSYInfo(id, info) {
  const data = loadData();
  const sy = data.schoolYears.find(s => s.id === id);
  if (!sy) return;
  Object.assign(sy, info);
  saveData(data);
}

export function getStudents(syId) { const sy = getSY(syId); return sy ? sy.students : []; }

export function addStudent(syId, student) {
  const data = loadData();
  const sy = data.schoolYears.find(s => s.id === syId);
  if (!sy) return null;
  const s = { ...student, id: Date.now().toString() + Math.random().toString(36).slice(2, 6) };
  sy.students.push(s);
  sy.students.sort((a, b) => { if (a.sex !== b.sex) return a.sex === 'M' ? -1 : 1; return (a.lastName+a.firstName).localeCompare(b.lastName+b.firstName); });
  saveData(data);
  return s;
}

export function updateStudent(syId, studentId, updates) {
  const data = loadData();
  const sy = data.schoolYears.find(s => s.id === syId);
  if (!sy) return;
  const idx = sy.students.findIndex(s => s.id === studentId);
  if (idx >= 0) { Object.assign(sy.students[idx], updates); saveData(data); }
}

export function removeStudent(syId, studentId) {
  const data = loadData();
  const sy = data.schoolYears.find(s => s.id === syId);
  if (!sy) return;
  sy.students = sy.students.filter(s => s.id !== studentId);
  delete sy.grades[studentId]; delete sy.attendance[studentId]; delete sy.comments[studentId];
  saveData(data);
}

export function getGrades(syId) { const sy = getSY(syId); return sy ? sy.grades : {}; }

export function setGrade(syId, studentId, subject, term, value) {
  const data = loadData();
  const sy = data.schoolYears.find(s => s.id === syId);
  if (!sy) return;
  if (!sy.grades[studentId]) sy.grades[studentId] = {};
  if (!sy.grades[studentId][subject]) sy.grades[studentId][subject] = {};
  sy.grades[studentId][subject][term] = value === '' ? null : Number(value);
  saveData(data);
}

export function computeMapehTerm(sg, term) {
  const ma = sg?.MA?.[term]; const peh = sg?.PEH?.[term];
  if (ma != null && peh != null) return Math.round((ma + peh) / 2);
  return null;
}

export function computeFinalGrade(sg, subject) {
  let total = 0, count = 0;
  for (const t of TERMS) {
    let g = subject === 'MAPEH' ? computeMapehTerm(sg, t) : sg?.[subject]?.[t];
    if (g != null) { total += g; count++; }
  }
  return count === 3 ? Math.round(total / 3) : null;
}

export function computeGeneralAvg(sg) {
  let total = 0, count = 0;
  for (const sub of SUBJECTS_G4_10) { const fg = computeFinalGrade(sg, sub); if (fg != null) { total += fg; count++; } }
  return count === SUBJECTS_G4_10.length ? Math.round(total / count) : null;
}

export function computeRanks(syId) {
  const sy = getSY(syId);
  if (!sy) return {};
  const avgs = {};
  sy.students.forEach(s => { avgs[s.id] = computeGeneralAvg(sy.grades[s.id]); });
  const sorted = Object.entries(avgs).filter(([, v]) => v != null).sort((a, b) => b[1] - a[1]);
  const ranks = {};
  sorted.forEach(([id, avg]) => {
    const sameAvg = sorted.filter(([, v]) => v === avg);
    const firstIdx = sorted.findIndex(([, v]) => v === avg);
    ranks[id] = sameAvg.reduce((sum, _, j) => sum + firstIdx + j + 1, 0) / sameAvg.length;
  });
  return ranks;
}

export function getAttendance(syId) { const sy = getSY(syId); return sy ? sy.attendance : {}; }

export function setClassDays(syId, month, value) {
  const data = loadData();
  const sy = data.schoolYears.find(s => s.id === syId);
  if (!sy) return;
  if (!sy.classDaysConfig) sy.classDaysConfig = {};
  sy.classDaysConfig[month] = value === '' ? null : Number(value);
  saveData(data);
}

export function getClassDays(syId) { const sy = getSY(syId); return sy?.classDaysConfig || {}; }

export function setDaysPresent(syId, studentId, month, value) {
  const data = loadData();
  const sy = data.schoolYears.find(s => s.id === syId);
  if (!sy) return;
  if (!sy.attendance[studentId]) sy.attendance[studentId] = {};
  sy.attendance[studentId][month] = value === '' ? null : Number(value);
  saveData(data);
}

export function getComments(syId) { const sy = getSY(syId); return sy ? sy.comments : {}; }

export function setComment(syId, studentId, term, text) {
  const data = loadData();
  const sy = data.schoolYears.find(s => s.id === syId);
  if (!sy) return;
  if (!sy.comments[studentId]) sy.comments[studentId] = {};
  sy.comments[studentId][term] = text;
  saveData(data);
}

export function computeAge(birthdate) {
  if (!birthdate) return '';
  const b = new Date(birthdate); const now = new Date();
  let age = now.getFullYear() - b.getFullYear();
  if (now.getMonth() < b.getMonth() || (now.getMonth() === b.getMonth() && now.getDate() < b.getDate())) age--;
  return age;
}

export { SUBJECTS_G4_10, MAPEH_SUBS, MONTHS, TERMS, GRADE_LEVELS };

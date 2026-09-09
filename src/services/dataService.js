// SF9 Data Service - localStorage-based persistence for DepEd School Form 9
// Supports Grades 4-10, 3-term grading, MAPEH sub-components, attendance Jun-Apr

const STORAGE_KEY = 'sf9_data';

const SUBJECTS_G4_10 = ['Filipino', 'English', 'Mathematics', 'Science', 'AP', 'GMRC/VE', 'EPP/TLE', 'MAPEH'];
const MAPEH_SUBS = ['MA', 'PEH'];
const MONTHS = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
const TERMS = [1, 2, 3];
const GRADE_LEVELS = [4, 5, 6, 7, 8, 9, 10];

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { schoolYears: [], currentSY: null };
  } catch { return { schoolYears: [], currentSY: null }; }
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

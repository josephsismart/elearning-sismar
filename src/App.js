import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Schedule from './components/Schedule';
import SchoolYear from './components/SchoolYear';
import Enrollment from './components/Enrollment';
import AttendanceSF9 from './components/AttendanceSF9';
import Grades from './components/Grades';
import SF9Report from './components/SF9Report';

function App() {
  const [page, setPage] = useState('home');
  return (
    <div>
      <Navbar current={page} onNav={setPage} />
      {page === 'home' && <Home />}
      {page === 'schedule' && <Schedule />}
      {page === 'schoolyear' && <SchoolYear onNav={setPage} />}
      {page === 'enrollment' && <Enrollment onNav={setPage} />}
      {page === 'attendance' && <AttendanceSF9 onNav={setPage} />}
      {page === 'grades' && <Grades onNav={setPage} />}
      {page === 'sf9report' && <SF9Report onNav={setPage} />}
    </div>
  );
}

export default App;

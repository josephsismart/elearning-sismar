import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Schedule from './components/Schedule';

function App() {
  const [page, setPage] = useState('home');
  return (
    <div>
      <Navbar current={page} onNav={setPage} />
      {page === 'home' && <Home />}
      {page === 'schedule' && <Schedule />}
    </div>
  );
}

export default App;

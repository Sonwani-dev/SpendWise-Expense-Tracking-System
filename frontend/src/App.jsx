import React, { useState } from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import AddExpense from './pages/AddExpense/AddExpense';

function App() {
  const [currentPage, setCurrentPage] = useState('add-expense');

  return (
    <>
      {currentPage === 'dashboard' && <Dashboard currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      {currentPage === 'add-expense' && <AddExpense currentPage={currentPage} setCurrentPage={setCurrentPage} />}
    </>
  );
}

export default App;

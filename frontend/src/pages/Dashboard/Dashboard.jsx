import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import WeeklyExpenseChart from '../../components/WeeklyExpenseChart';

const Dashboard = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="flex min-h-screen font-sans bg-white">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <div className="flex-1 flex flex-col w-full ml-[260px]">
        <Header />
        
        {/* Main Content Area */}
        <main className="flex-1 p-8 bg-white">
          <div className="max-w-[1100px] mx-auto pt-4">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-[28px] font-bold text-slate-900 mb-2 tracking-tight">Dashboard Overview</h1>
                <p className="text-slate-500 text-[15px]">Real-time analysis of corporate spending trends for the current week.</p>
              </div>
              <div className="flex bg-slate-50 border border-slate-200 rounded-lg p-1">
                <button className="bg-white text-primary font-medium px-6 py-2 rounded shadow-sm text-sm border border-slate-200">
                  Last 7 Days
                </button>
                <button className="text-slate-500 font-medium px-6 py-2 rounded text-sm hover:text-slate-800 transition-colors">
                  Monthly View
                </button>
              </div>
            </div>
            
            <WeeklyExpenseChart />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

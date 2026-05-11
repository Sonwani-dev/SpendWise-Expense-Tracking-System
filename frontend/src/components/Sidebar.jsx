import React from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  History,
  HelpCircle,
  LogOut
} from 'lucide-react';

const Sidebar = ({ currentPage, onNavigate }) => {
  return (
    <aside className="w-[260px] h-screen fixed left-0 top-0 border-r border-slate-200 bg-white flex flex-col px-5 py-6">
      <div className="mb-10 pl-3">
        <div className="text-primary text-[22px] font-bold tracking-tight leading-none mb-1">
          SpendWise
        </div>
        <div className="text-slate-500 text-[13px] font-medium">
          Corporate Finance
        </div>
      </div>

      <ul className="flex flex-col gap-2 flex-1 list-none">
        <li 
          onClick={() => onNavigate('dashboard')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all relative ${currentPage === 'dashboard' ? 'bg-sidebar-activeBg text-sidebar-activeText' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          {currentPage === 'dashboard' && <div className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-r-md"></div>}
          <LayoutDashboard size={20} strokeWidth={currentPage === 'dashboard' ? 2.5 : 2} />
          <span className={`font-medium text-[15px] ${currentPage === 'dashboard' ? 'font-semibold' : ''}`}>Dashboard</span>
        </li>
        <li 
          onClick={() => onNavigate('add-expense')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all relative ${currentPage === 'add-expense' ? 'bg-sidebar-activeBg text-sidebar-activeText' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          {currentPage === 'add-expense' && <div className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-r-md"></div>}
          <PlusCircle size={20} strokeWidth={currentPage === 'add-expense' ? 2.5 : 2} />
          <span className={`font-medium text-[15px] ${currentPage === 'add-expense' ? 'font-semibold' : ''}`}>Add Expense</span>
        </li>
        <li className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 font-medium text-[15px] cursor-pointer hover:bg-slate-50 transition-all">
          <History size={20} />
          <span>View Expenses</span>
        </li>
      </ul>

      <div className="mt-auto border-t border-slate-200 pt-4">
        <ul className="flex flex-col gap-2 list-none">
          <li className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 font-medium text-[15px] cursor-pointer hover:bg-slate-50 transition-all">
            <HelpCircle size={20} />
            <span>Help Center</span>
          </li>
          <li className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 font-medium text-[15px] cursor-pointer hover:bg-slate-50 transition-all">
            <LogOut size={20} />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

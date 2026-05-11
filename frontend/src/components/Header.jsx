import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import avatarImg from '../assets/avatar.png';

const Header = () => {
  return (
    <header className="h-[76px] border-b border-slate-200 bg-white flex items-center justify-between px-8 sticky top-0 z-10 w-full">
      <div className="relative w-96">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search data..." 
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      <div className="flex items-center gap-6">
        <nav className="flex items-center gap-6 mr-4">
          <a href="#" className="text-primary font-semibold text-[15px] border-b-2 border-primary py-6">Overview</a>
          <a href="#" className="text-slate-500 hover:text-slate-800 font-medium text-[15px] py-6 transition-colors">Analytics</a>
          <a href="#" className="text-slate-500 hover:text-slate-800 font-medium text-[15px] py-6 transition-colors">Export</a>
        </nav>
        
        <button className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm">
          New Report
        </button>

        <div className="flex items-center gap-4 ml-2 border-l border-slate-200 pl-6">
          <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={avatarImg} alt="User Avatar" className="w-9 h-9 rounded-full object-cover border border-slate-200" />
            <ChevronDown size={16} className="text-slate-500" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

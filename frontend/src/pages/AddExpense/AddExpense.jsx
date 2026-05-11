import React, { useState } from 'react';
import { 
  Bell, 
  ChevronDown, 
  Calendar, 
  Lightbulb, 
  CloudUpload,
  TrendingUp
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import avatarImg from '../../assets/avatar.png';

const AddExpense = ({ currentPage, setCurrentPage }) => {
  const [formData, setFormData] = useState({
    expenseName: '',
    amount: '',
    category: '',
    date: '',
    merchant: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Amount needs to be a number
      const payload = {
        ...formData,
        amount: Number(formData.amount)
      };

      const response = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        alert('Expense added successfully!');
        setFormData({
          expenseName: '',
          amount: '',
          category: '',
          date: '',
          merchant: '',
          description: ''
        });
      } else {
        const errorMsg = result.errors ? result.errors.map(err => err.message).join('\n') : result.message;
        alert(`Failed to add expense:\n${errorMsg}`);
      }
    } catch (error) {
      alert(`Network error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-slate-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <div className="flex-1 flex flex-col w-full ml-[260px]">
        {/* Customized Header for Add Expense */}
        <header className="h-[76px] border-b border-slate-200 bg-white flex items-center justify-between px-8 sticky top-0 z-10 w-full">
          <div>
            <h1 className="text-primary text-[22px] font-bold tracking-tight">Add New Expense</h1>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
              <Bell size={20} />
            </button>
            
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6 cursor-pointer">
              <div className="text-right hidden sm:block">
                <div className="text-[14px] font-semibold text-slate-900 leading-tight">Alex Thompson</div>
                <div className="text-[12px] text-slate-500 font-medium">Senior Accountant</div>
              </div>
              <img src={avatarImg} alt="User Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-slate-100" />
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 p-8">
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Form Card */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-8">
              <div className="mb-8">
                <h2 className="text-[20px] font-bold text-slate-900 mb-1">Expense Details</h2>
                <p className="text-slate-500 text-[14px]">Complete the information below to log a new corporate expenditure.</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-[13px] font-medium text-slate-600 mb-1.5">Expense Name</label>
                  <input 
                    type="text" 
                    name="expenseName"
                    value={formData.expenseName}
                    onChange={handleChange}
                    placeholder="e.g., Client Dinner at The Ritz"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-800 placeholder-slate-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[13px] font-medium text-slate-600 mb-1.5">Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                      <input 
                        type="number" 
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-slate-600 mb-1.5">Category</label>
                    <div className="relative">
                      <select 
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-600 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select Category</option>
                        <option value="Operations">Operations</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Meals & Entertainment">Meals & Entertainment</option>
                        <option value="Travel">Travel</option>
                        <option value="Software & Subscriptions">Software & Subscriptions</option>
                        <option value="Office Supplies">Office Supplies</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[13px] font-medium text-slate-600 mb-1.5">Date</label>
                    <div className="relative">
                      <input 
                        type="date" 
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-slate-600 mb-1.5">Merchant</label>
                    <input 
                      type="text" 
                      name="merchant"
                      value={formData.merchant}
                      onChange={handleChange}
                      placeholder="Vendor Name"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-800 placeholder-slate-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-slate-600 mb-1.5">Description</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Briefly explain the purpose of this expense..."
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-800 placeholder-slate-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  ></textarea>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-4">
                  <button 
                    type="button" 
                    onClick={() => setFormData({ expenseName: '', amount: '', category: '', date: '', merchant: '', description: '' })}
                    className="px-6 py-2.5 text-[14px] font-semibold text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    Clear Form
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="px-6 py-2.5 bg-primary hover:bg-primary-hover disabled:bg-slate-300 text-white text-[14px] font-semibold rounded-lg shadow-sm transition-colors"
                  >
                    {loading ? 'Submitting...' : 'Submit Expense'}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Widgets */}
            <div className="space-y-6">
              
              {/* Financial Tip Card */}
              <div className="bg-primary rounded-xl p-6 text-white relative overflow-hidden shadow-sm">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4 text-white/90">
                    <Lightbulb size={18} />
                    <span className="font-semibold text-[14px]">Financial Tip</span>
                  </div>
                  <p className="text-[14px] leading-relaxed mb-6 text-white/90">
                    "Did you know? Reviewing your recurring SaaS subscriptions monthly can save up to 12% in unnecessary corporate overhead."
                  </p>
                  <button className="px-4 py-1.5 bg-white text-primary text-[13px] font-semibold rounded-full hover:bg-slate-50 transition-colors">
                    Learn More
                  </button>
                </div>
                {/* Decorative background element */}
                <TrendingUp size={120} className="absolute -bottom-8 -right-8 text-white/10" strokeWidth={1.5} />
              </div>

              {/* Fast Upload Card */}
              <div className="bg-[#eff4ff] rounded-xl p-8 border border-dashed border-[#b1c7fb] text-center shadow-sm">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600 shadow-sm">
                  <CloudUpload size={24} />
                </div>
                <h3 className="font-bold text-slate-800 text-[15px] mb-2">Fast Upload</h3>
                <p className="text-slate-500 text-[13px] leading-relaxed mb-6">
                  Drag and drop receipts here to auto-fill expense fields.
                </p>
                <button className="w-full py-2.5 bg-[#e2ecff] text-primary hover:bg-[#d4e1ff] text-[14px] font-semibold rounded-lg transition-colors border border-[#b1c7fb]">
                  Select Files
                </button>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddExpense;

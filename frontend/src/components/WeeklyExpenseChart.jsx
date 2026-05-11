import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, ArrowUp } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const emptyWeekData = [
  { name: 'Mon', operations: 0, marketing: 0 },
  { name: 'Tue', operations: 0, marketing: 0 },
  { name: 'Wed', operations: 0, marketing: 0 },
  { name: 'Thu', operations: 0, marketing: 0 },
  { name: 'Fri', operations: 0, marketing: 0 },
  { name: 'Sat', operations: 0, marketing: 0 },
  { name: 'Sun', operations: 0, marketing: 0 },
];

const dayNames = {
  'Mon': 'Monday',
  'Tue': 'Tuesday',
  'Wed': 'Wednesday',
  'Thu': 'Thursday',
  'Fri': 'Friday',
  'Sat': 'Saturday',
  'Sun': 'Sunday'
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-slate-200 shadow-lg rounded-lg">
        <p className="font-semibold text-slate-800 mb-2">{dayNames[label]}</p>
        <p className="text-sm text-primary">Operations: ${payload[0].value.toLocaleString()}</p>
        <p className="text-sm text-chart-marketing">Marketing: ${payload[1].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const WeeklyExpenseChart = () => {
  const [data, setData] = useState(emptyWeekData);
  const [loading, setLoading] = useState(true);

  // Dynamically calculate the total weekly expense
  const weeklyTotal = useMemo(() => {
    return data.reduce((acc, day) => acc + day.operations + day.marketing, 0);
  }, [data]);

  // Dynamically find the highest expenditure day
  const highestDay = useMemo(() => {
    return data.reduce((max, day) => 
      (day.operations + day.marketing > max.operations + max.marketing) ? day : max
    , data[0]);
  }, [data]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/expenses');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const result = await response.json();
        
        if (result.success && result.data) {
          // Initialize fresh week data
          const weekData = [
            { name: 'Mon', operations: 0, marketing: 0 },
            { name: 'Tue', operations: 0, marketing: 0 },
            { name: 'Wed', operations: 0, marketing: 0 },
            { name: 'Thu', operations: 0, marketing: 0 },
            { name: 'Fri', operations: 0, marketing: 0 },
            { name: 'Sat', operations: 0, marketing: 0 },
            { name: 'Sun', operations: 0, marketing: 0 },
          ];

          // Aggregate expenses by day and category
          result.data.forEach(expense => {
            if (!expense.date) return;
            const expenseDate = new Date(expense.date);
            // map getDay() (0=Sun) to index (0=Mon, 6=Sun)
            const dayIndex = (expenseDate.getDay() + 6) % 7;
            
            const category = expense.category ? expense.category.toLowerCase() : '';
            const amount = expense.amount || 0;

            if (category === 'operations') {
              weekData[dayIndex].operations += amount;
            } else if (category === 'marketing') {
              weekData[dayIndex].marketing += amount;
            } else {
               // Default to operations if category doesn't match
               weekData[dayIndex].operations += amount;
            }
          });

          setData(weekData);
        }
      } catch (error) {
        console.error('Failed to fetch expenses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
    // Poll every 5 seconds for live updates
    const intervalId = setInterval(fetchExpenses, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] w-full relative">
      {loading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
          <div className="text-primary font-medium">Loading live data...</div>
        </div>
      )}
      
      <div className="flex justify-between items-start mb-10">
        <div>
          <h3 className="text-[22px] font-bold text-slate-900 mb-2">Weekly Expense Analysis</h3>
          <div className="flex items-center text-emerald-500 font-medium text-[15px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            <span>Live Server Data</span>
            <span className="text-slate-500 ml-2">Connected</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary"></span>
            <span className="text-slate-600">Operations</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-chart-marketing"></span>
            <span className="text-slate-600">Marketing</span>
          </div>
        </div>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            barSize={44}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickFormatter={(value) => value === 0 ? '$0' : `$${value / 1000}k`}
              domain={[0, 'auto']}
            />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
            <Bar dataKey="operations" stackId="a" fill="var(--color-chart-operations)" />
            <Bar dataKey="marketing" stackId="a" fill="var(--color-chart-marketing)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-end">
        <div className="flex gap-20">
          <div>
            <div className="text-slate-500 text-xs font-semibold tracking-wider mb-1">HIGHEST EXPENDITURE DAY</div>
            <div className="text-slate-900 font-medium text-[15px]">{highestDay ? dayNames[highestDay.name] : 'N/A'}</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs font-semibold tracking-wider mb-1">WEEKLY TOTAL</div>
            <div className="text-slate-900 font-medium text-[15px]">${weeklyTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
        </div>
        <button className="flex items-center gap-1 text-primary font-medium hover:text-primary-hover transition-colors text-sm">
          View Transaction Ledger
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default WeeklyExpenseChart;

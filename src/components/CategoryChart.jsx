import React from 'react';
import { cn } from '../utils';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', 
  '#8b5cf6', '#06b6d4', '#ec4899', '#6366f1'
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-2xl p-4 rounded-2xl border border-white/10 shadow-2xl min-w-[160px] animate-in scale-in duration-200">
        <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-1.5">{data.name}</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].color }}></div>
          <span className="text-xl font-black text-white tracking-tight">${data.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2">Total Expenditure</p>
      </div>
    );
  }
  return null;
};

const CategoryChart = ({ data, isLoading }) => {
  return (
    <div className={cn(
      "glass-card p-8 rounded-3xl h-[450px] flex flex-col relative overflow-hidden group",
      !isLoading && "animate-in slide-up delay-300"
    )}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          {isLoading ? (
            <>
              <div className="w-40 h-6 skeleton rounded mb-2"></div>
              <div className="w-28 h-4 skeleton rounded"></div>
            </>
          ) : (
            <>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Spending Breakdown</h3>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Expenses by category</p>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 w-full relative z-10">
        {isLoading ? (
          <div className="w-full h-full skeleton rounded-full max-h-[300px] aspect-square mx-auto"></div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart key={JSON.stringify(data)}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={105}
                fill="#8884d8"
                paddingAngle={8}
                dataKey="value"
                nameKey="name"
                animationDuration={800}
                animationBegin={0}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={2}
                    className="hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                iconType="circle" 
                verticalAlign="bottom" 
                align="center"
                wrapperStyle={{ 
                  paddingTop: '30px',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>


  );
};

export default CategoryChart;

import React from 'react';
import { cn } from '../utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

const BalanceChart = ({ data, isLoading }) => {
  return (
    <div className={cn(
      "glass-card p-8 rounded-3xl h-[450px] flex flex-col relative overflow-hidden group",
      !isLoading && "animate-in slide-up delay-200"
    )}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          {isLoading ? (
            <>
              <div className="w-32 h-6 skeleton rounded mb-2"></div>
              <div className="w-24 h-4 skeleton rounded"></div>
            </>
          ) : (
            <>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Balance Trend</h3>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Net worth over time</p>
            </>
          )}
        </div>
        {!isLoading && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600 shadow-lg shadow-blue-500/50 animate-pulse"></div>
            <span className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Live Feed</span>
          </div>
        )}
      </div>

      <div className="flex-1 w-full relative z-10">
        {isLoading ? (
          <div className="w-full h-full skeleton rounded-2xl"></div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--chart-text)', fontSize: 10, fontWeight: 700 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--chart-text)', fontSize: 10, fontWeight: 700 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                cursor={{ stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5 5' }}
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                  padding: '16px',
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  color: '#fff',
                  backdropFilter: 'blur(12px)'
                }}
                itemStyle={{ fontWeight: 800, fontSize: '14px' }}
                labelStyle={{ color: '#94a3b8', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '4px' }}
              />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke="#3b82f6" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorBalance)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>


  );
};

export default BalanceChart;

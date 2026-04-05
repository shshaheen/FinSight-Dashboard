import React from 'react';
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

const CategoryChart = ({ data }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm h-[400px] transition-colors">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Spending Breakdown</h3>
      <div className="w-full h-full pb-8">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={4} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `$${value.toFixed(2)}`}
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                padding: '12px',
                backgroundColor: 'var(--chart-tooltip-bg)',
                color: 'var(--chart-tooltip-text)',
                backdropFilter: 'blur(8px)'
              }}
            />
            <Legend 
              iconType="circle" 
              verticalAlign="bottom" 
              align="center"
              wrapperStyle={{ paddingTop: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryChart;

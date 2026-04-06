import React from 'react';
import { Lightbulb, TrendingDown, Target, Info } from 'lucide-react';
import { cn } from '../utils';

const InsightsPanel = ({ transactions, isLoading }) => {
  // Logic to find highest spending category
  const expenses = transactions.filter(t => t.type === 'Expense');
  const catMap = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const highestCat = Object.entries(catMap).sort((a, b) => b[1] - a[1])[0] || ['None', 0];
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0;

  const insights = [
    {
      title: 'Highest Spending',
      value: highestCat[0],
      sub: `$${highestCat[1].toLocaleString()} spent this month`,
      icon: <TrendingDown className="w-5 h-5" />,
      color: 'bg-red-50 text-red-600',
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate}%`,
      sub: 'of income saved after expenses',
      icon: <Target className="w-5 h-5" />,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Financial Health',
      value: totalIncome > totalExpenses ? 'Positive' : 'Warning',
      sub: totalIncome > totalExpenses ? 'You are living within your means.' : 'Expenses exceed income this month.',
      icon: <Info className="w-5 h-5" />,
      color: totalIncome > totalExpenses ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className={cn(
      "glass-card p-10 rounded-[2.5rem] mt-12 overflow-hidden relative group",
      !isLoading && "animate-in slide-up delay-500"
    )}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
      
      <div className="flex items-center gap-4 mb-10 relative z-10 transition-all duration-500">
        <div className={cn(
          "p-3 rounded-2xl border transition-all duration-500",
          isLoading ? "skeleton w-12 h-12" : "bg-amber-500/10 dark:bg-amber-400/10 border-amber-500/20"
        )}>
          {!isLoading && <Lightbulb className="w-6 h-6 text-amber-500" />}
        </div>
        <div>
          {isLoading ? (
            <>
              <div className="w-32 h-6 skeleton rounded mb-2"></div>
              <div className="w-48 h-4 skeleton rounded"></div>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Financial Insights</h3>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Smart analysis of your data</p>
            </>
          )}
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 p-6 rounded-3xl border border-white/10 dark:border-white/5 bg-white/10 dark:bg-slate-800/20">
              <div className="w-14 h-14 skeleton rounded-2xl"></div>
              <div className="flex-1">
                <div className="w-20 h-3 skeleton rounded mb-2"></div>
                <div className="w-32 h-6 skeleton rounded mb-1"></div>
                <div className="w-40 h-3 skeleton rounded"></div>
              </div>
            </div>
          ))
        ) : (
          insights.map((insight, idx) => (
            <div key={idx} className={cn(
              "flex items-center gap-6 p-6 rounded-3xl border border-white/10 dark:border-white/5 bg-white/10 dark:bg-slate-800/20 hover:bg-white/30 dark:hover:bg-slate-800/40 hover:-translate-y-1 transition-all duration-300 group/item animate-in slide-up",
              idx === 0 ? "delay-100" : idx === 1 ? "delay-200" : "delay-300"
            )}>
              <div className={cn(
                "p-4 rounded-2xl shadow-lg transition-transform group-hover/item:scale-110 duration-500", 
                insight.color.replace('bg-', 'bg-opacity-20 bg-')
              )}>
                {React.cloneElement(insight.icon, { className: 'w-6 h-6' })}
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2">{insight.title}</p>
                <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-1">{insight.value}</h4>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 italic opacity-80">{insight.sub}</p>
              </div>
            </div>
          ))
        )}
      </div>
      
      {!isLoading && (
        <div className="mt-10 p-6 bg-blue-600/5 dark:bg-blue-400/5 rounded-3xl border border-blue-500/10 relative overflow-hidden group/tip animate-in fade-in delay-500">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full -mr-12 -mt-12 blur-xl"></div>
          <div className="flex gap-4 relative z-10">
            <Info className="w-6 h-6 text-blue-500 flex-shrink-0" />
            <p className="text-xs font-bold leading-relaxed text-slate-600 dark:text-slate-400">
              Based on your recent transactions, your spending in <span className="text-blue-600 dark:text-blue-400 font-black">{highestCat[0]}</span> accounts for <span className="text-blue-600 dark:text-blue-400 font-black">{totalExpenses > 0 ? ((highestCat[1] / totalExpenses) * 100).toFixed(0) : 0}%</span> of total monthly expenditure.
            </p>
          </div>
        </div>
      )}
    </div>


  );
};

export default InsightsPanel;

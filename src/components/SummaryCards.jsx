import React from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../utils';

const SummaryCards = ({ totalBalance, totalIncome, totalExpenses, isLoading }) => {
  const cards = [
    {
      title: 'Total Balance',
      amount: totalBalance,
      icon: <Wallet className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-900',
    },
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-900',
    },
    {
      title: 'Total Expenses',
      amount: totalExpenses,
      icon: <TrendingDown className="w-6 h-6 text-red-600" />,
      bgColor: 'bg-red-50',
      textColor: 'text-red-900',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {cards.map((card, idx) => (
        <div 
          key={idx} 
          className={cn(
            "glass-card-interactive p-8 rounded-3xl flex items-center justify-between group overflow-hidden relative transition-all duration-500",
            isLoading ? "opacity-100" : "animate-in slide-up",
            idx === 1 ? "delay-150" : idx === 2 ? "delay-200" : "delay-100"
          )}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-400/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 blur-2xl"></div>
          <div className="relative z-10 flex-1">
            {isLoading ? (
              <>
                <div className="w-20 h-4 skeleton rounded mb-2"></div>
                <div className="w-32 h-8 skeleton rounded"></div>
              </>
            ) : (
              <>
                <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 opacity-80 group-hover:opacity-100 transition-opacity">{card.title}</p>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  <span className="text-blue-600 dark:text-blue-400 opacity-60 mr-1">$</span>
                  {card.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h3>
              </>
            )}
          </div>
          <div className={cn(
            "relative z-10 p-4 rounded-2xl shadow-xl border transition-all duration-500",
            isLoading ? "w-16 h-16 skeleton" : "bg-white/40 dark:bg-slate-800/40 border-white/50 dark:border-white/5 group-hover:rotate-12 group-hover:scale-110"
          )}>
            {!isLoading && React.cloneElement(card.icon, { className: 'w-8 h-8' })}
          </div>
        </div>
      ))}
    </div>


  );
};

export default SummaryCards;

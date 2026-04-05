import React from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

const SummaryCards = ({ totalBalance, totalIncome, totalExpenses }) => {
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, idx) => (
        <div key={idx} className={`${card.bgColor} p-6 rounded-2xl border border-white/50 shadow-sm flex items-center justify-between`}>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{card.title}</p>
            <h3 className={`text-2xl font-bold ${card.textColor}`}>
              ${card.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="p-3 bg-white/80 rounded-full shadow-inner">
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;

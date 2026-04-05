import React from 'react';
import { Lightbulb, TrendingDown, Target, Info } from 'lucide-react';
import { cn } from './TransactionsTable';

const InsightsPanel = ({ transactions }) => {
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
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        <h3 className="text-lg font-bold text-gray-800">Financial Insights</h3>
      </div>
      <div className="space-y-4">
        {insights.map((insight, idx) => (
          <div key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:border-gray-100 transition-all">
            <div className={cn("p-2 rounded-lg", insight.color)}>
              {insight.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">{insight.title}</p>
              <h4 className="text-lg font-extrabold text-gray-800 leading-none mb-1">{insight.value}</h4>
              <p className="text-xs font-medium text-gray-500 italic">{insight.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsPanel;

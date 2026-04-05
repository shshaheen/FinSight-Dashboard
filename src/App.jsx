import React, { useState, useMemo } from 'react';
import SummaryCards from './components/SummaryCards';
import BalanceChart from './components/BalanceChart';
import CategoryChart from './components/CategoryChart';
import TransactionsTable from './components/TransactionsTable';
import RoleSwitcher from './components/RoleSwitcher';
import InsightsPanel from './components/InsightsPanel';
import { mockTransactions } from './data/mockTransactions';
import { Wallet2, BarChart3, PieChartIcon, Table2, InfoIcon, Moon, Sun } from 'lucide-react';

function App() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [role, setRole] = useState('Viewer');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrefs = window.localStorage.getItem('color-theme');
      if (typeof storedPrefs === 'string') return storedPrefs;
      const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if (userMedia.matches) return 'dark';
    }
    return 'light';
  });

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('color-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  // Stats
  const { totalIncome, totalExpenses, totalBalance } = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      totalIncome: income,
      totalExpenses: expenses,
      totalBalance: income - expenses,
    };
  }, [transactions]);

  // Chart Data: Balance Trend
  const balanceTrendData = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    let runningBalance = 0;
    return sorted.map(t => {
      runningBalance += t.type === 'Income' ? t.amount : -t.amount;
      return { date: t.date, balance: runningBalance };
    });
  }, [transactions]);

  // Chart Data: Category Breakdown (Expenses only)
  const categoryData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'Expense');
    const grouped = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  // CRUD Actions
  const handleAddTransaction = (newT) => {
    setTransactions(prev => [newT, ...prev]);
  };

  const handleUpdateTransaction = (updatedT) => {
    setTransactions(prev => prev.map(t => t.id === updatedT.id ? updatedT : t));
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg shadow-blue-500/20">
              <Wallet2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1">FinSight</h1>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Intelligence Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <RoleSwitcher selectedRole={role} setSelectedRole={setRole} />
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Top Summary Section */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both">
          <SummaryCards 
            totalBalance={totalBalance} 
            totalIncome={totalIncome} 
            totalExpenses={totalExpenses} 
          />
        </section>

        {/* Visualizations & Insights */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <section className="xl:col-span-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 fill-mode-both">
            <BalanceChart data={balanceTrendData} />
          </section>
          
          <section className="xl:col-span-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 fill-mode-both">
            <CategoryChart data={categoryData} />
          </section>

          <section className="xl:col-span-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-400 fill-mode-both">
            <TransactionsTable 
              transactions={transactions}
              role={role}
              onAdd={handleAddTransaction}
              onUpdate={handleUpdateTransaction}
              onDelete={handleDeleteTransaction}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterType={filterType}
              setFilterType={setFilterType}
            />
          </section>

          <section className="xl:col-span-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500 fill-mode-both">
            <InsightsPanel transactions={transactions} />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 grayscale dark:grayscale-[0.5] opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default group">
            <Wallet2 className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">© 2026 FinSight Dashboard</span>
          </div>
          <div className="flex items-center gap-8 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            <span className="text-slate-400 dark:text-slate-500">Built for Zorvyn Frontend Assignment</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

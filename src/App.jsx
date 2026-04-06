import React, { useState, useMemo } from 'react';
import { cn } from './utils';
import SummaryCards from './components/SummaryCards';
import BalanceChart from './components/BalanceChart';
import CategoryChart from './components/CategoryChart';
import TransactionsTable from './components/TransactionsTable';
import RoleSwitcher from './components/RoleSwitcher';
import InsightsPanel from './components/InsightsPanel';
import { mockTransactions } from './data/mockTransactions';
import { Wallet2, Moon, Sun } from 'lucide-react';

function App() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [role, setRole] = useState('Viewer');
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrefs = window.localStorage.getItem('color-theme');
      if (typeof storedPrefs === 'string') return storedPrefs;
      const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if (userMedia.matches) return 'dark';
    }
    return 'light';
  });

  const [isChangingRole, setIsChangingRole] = useState(false);

  React.useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

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

  const handleRoleChange = (newRole) => {
    setIsChangingRole(true);
    setTimeout(() => {
      setRole(newRole);
      setIsChangingRole(false);
    }, 200);
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
    <div className="min-h-screen selection:bg-blue-500/30 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/10 dark:bg-slate-900/10 backdrop-blur-2xl border-b border-white/20 dark:border-white/5 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-sm shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500">
              <Wallet2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-1 drop-shadow-sm">
                Fin<span className="text-blue-600 dark:text-blue-400">Sight</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] leading-none opacity-80">Intelligence Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="p-3 rounded-2xl bg-white/20 dark:bg-slate-800/20 text-slate-700 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-700/40 transition-all border border-white/30 dark:border-white/10 shadow-lg active:scale-95"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <RoleSwitcher selectedRole={role} setSelectedRole={handleRoleChange} />
          </div>
        </div>
      </header>

      <main className={cn(
        "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 space-y-8 transition-all duration-300",
        isChangingRole ? "role-exit" : "role-enter"
      )}>
        {/* Top Summary Section */}
        <section className="animate-in slide-up delay-100">
          <SummaryCards 
            totalBalance={totalBalance} 
            totalIncome={totalIncome} 
            totalExpenses={totalExpenses} 
            isLoading={isLoading}
          />
        </section>

        {/* Visualizations & Insights */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          <section className="xl:col-span-8 animate-in slide-up delay-200">
            <BalanceChart data={balanceTrendData} isLoading={isLoading} />
          </section>
          
          <section className="xl:col-span-4 animate-in slide-up delay-300">
            <CategoryChart data={categoryData} isLoading={isLoading} />
          </section>

          <section className="xl:col-span-8 animate-in slide-up delay-400">
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
              isLoading={isLoading}
            />
          </section>

          <section className="xl:col-span-4 animate-in slide-up delay-500">
            <InsightsPanel transactions={transactions} isLoading={isLoading} />
          </section>
        </div>
      </main>


      {/* Footer */}
      <footer className="py-6 border-t border-white/20 dark:border-white/5 bg-white/5 dark:bg-slate-900/5 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-all duration-500 cursor-default group">
            <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors duration-500">
              <Wallet2 className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-600 dark:text-slate-400 transition-colors">© 2026 FinSight Dashboard</span>
          </div>
          <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em]">
            Built for Zorvyn Frontend Assignment
          </div>
        </div>
      </footer>
    </div>

  );
}

export default App;

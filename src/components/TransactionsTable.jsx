import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, SlidersHorizontal, ArrowUpRight, ArrowDownLeft, Download } from 'lucide-react';
import { cn } from '../utils';

const TransactionsTable = ({ 
  transactions, 
  role, 
  onAdd, 
  onUpdate, 
  onDelete, 
  searchQuery, 
  setSearchQuery, 
  filterType, 
  setFilterType,
  isLoading
}) => {
  const isAdmin = role === 'Admin';
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ date: '', category: '', type: 'Expense', amount: '' });
  
  const getCategoryColor = (category) => {
    const map = {
      'Salaries': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      'Rent': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      'Food & Dining': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      'Freelance': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
      'Transport': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      'Shopping': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      'Utilities': 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
      'Subscriptions': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      'Investment Profit': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    };

    if (map[category]) return map[category];
    
    // Generate a consistent color based on string hash for unknown categories
    const colors = [
      'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
      'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400',
      'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-400'
    ];
    let hash = 0;
    for (let i = 0; i < category.length; i++) {
        hash = category.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Category', 'Type', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => [t.date, t.category, t.type, t.amount].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = transactions.filter(t => {
    const matchesSearch = t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'All' || t.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onUpdate({ ...formData, id: editingId });
      setEditingId(null);
    } else {
      onAdd({ ...formData, id: Date.now() });
      setIsAdding(false);
    }
    setFormData({ date: '', category: '', type: 'Expense', amount: '' });
  };

  const startEdit = (t) => {
    setFormData({ date: t.date, category: t.category, type: t.type, amount: t.amount });
    setEditingId(t.id);
    setIsAdding(true);
  };

  const cancelAction = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ date: '', category: '', type: 'Expense', amount: '' });
  };

  return (
    <div className={cn(
      "glass-card p-6 rounded-[2.5rem] mt-0 overflow-hidden relative group",
      !isLoading && "animate-in slide-up delay-400"
    )}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-8 relative z-10">
        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Recent Transactions</h3>
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">Activity log & history</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto">
          {/* Search */}
          <div className="relative group/search flex-1 min-w-[280px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within/search:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 bg-white/20 dark:bg-slate-800/20 backdrop-blur-md border border-white/30 dark:border-white/5 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-400 font-medium"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-1.5 bg-white/10 dark:bg-slate-800/10 backdrop-blur-md border border-white/20 dark:border-white/5 p-1.5 rounded-2xl shadow-inner">
            {['All', 'Income', 'Expense'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={cn(
                  "px-5 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-300",
                  filterType === type 
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xl shadow-blue-500/10 scale-105" 
                    : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-200"
                )}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Export Button */}
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 px-5 py-3.5 bg-white/10 dark:bg-slate-800/20 backdrop-blur-md border border-white/30 dark:border-white/5 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-700 dark:text-white hover:bg-white/30 dark:hover:bg-slate-700/40 transition-all shadow-lg group/export whitespace-nowrap active:scale-95"
            title="Download CSV"
          >
            <Download className="w-4 h-4 text-blue-500 group-hover/export:scale-110 transition-transform" />
            <span>Export CSV</span>
          </button>

          {/* Add Button */}
          <div className={cn(
            "transition-all duration-500 overflow-hidden flex items-center",
            isAdmin ? "w-[180px] opacity-100" : "w-0 opacity-0 pointer-events-none"
          )}>
            <button 
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center gap-3 bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-6 py-3.5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-2xl shadow-blue-600/30 active:scale-95 group/btn whitespace-nowrap"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              New Record
            </button>
          </div>
        </div>
      </div>

      {isAdding && isAdmin && (
        <form onSubmit={handleSubmit} className="mb-6 p-6 glass-card border-blue-500/20 rounded-3xl animate-in scale-in duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            <div className="animate-in slide-up delay-100">
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-[0.2em]">Transaction Date</label>
              <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full p-3.5 glass-button rounded-xl outline-none focus:border-blue-500/50 text-slate-900 dark:text-white font-medium" />
            </div>
            <div className="animate-in slide-up delay-150">
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-[0.2em]">Category Label</label>
              <input required type="text" placeholder="e.g. Salary, Rent" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-3.5 glass-button rounded-xl outline-none focus:border-blue-500/50 text-slate-900 dark:text-white font-medium placeholder:text-slate-400/50" />
            </div>
            <div className="animate-in slide-up delay-200">
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-[0.2em]">Flow Direction</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full p-3.5 glass-button rounded-xl outline-none focus:border-blue-500/50 text-slate-900 dark:text-white font-medium appearance-none">
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
            <div className="animate-in slide-up delay-250">
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-[0.2em]">Total Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input required type="number" step="0.01" placeholder="0.00" value={formData.amount} onChange={e => setFormData({...formData, amount: parseFloat(e.target.value)})} className="w-full pl-8 pr-4 py-3.5 glass-button rounded-xl outline-none focus:border-blue-500/50 text-slate-900 dark:text-white font-medium placeholder:text-slate-400/50" />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-8 relative z-10 border-t border-white/10 dark:border-white/5 pt-6 animate-in fade-in delay-300">
            <button type="button" onClick={cancelAction} className="px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all">Cancel</button>
            <button type="submit" className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
              {editingId ? 'Confirm Update' : 'Commit Entry'}
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto relative z-10">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="pb-4 pt-0 font-black text-slate-300 dark:text-slate-600 text-[10px] uppercase tracking-[0.3em]">Date Activity</th>
              <th className="pb-4 pt-0 font-black text-slate-300 dark:text-slate-600 text-[10px] uppercase tracking-[0.3em]">Category Description</th>
              <th className="pb-4 pt-0 font-black text-slate-300 dark:text-slate-600 text-[10px] uppercase tracking-[0.3em]">Flow Type</th>
              <th className="pb-4 pt-0 font-black text-slate-300 dark:text-slate-600 text-[10px] uppercase tracking-[0.3em]">Value Amount</th>
              {isAdmin && <th className="pb-4 pt-0 font-black text-slate-300 dark:text-slate-600 text-[10px] uppercase tracking-[0.3em] text-right">Process Controls</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 dark:divide-white/5">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td className="py-6"><div className="w-24 h-4 skeleton rounded"></div></td>
                  <td className="py-6"><div className="w-32 h-6 skeleton rounded mb-1"></div><div className="w-20 h-3 skeleton rounded"></div></td>
                  <td className="py-6"><div className="w-16 h-6 skeleton rounded-xl"></div></td>
                  <td className="py-6"><div className="w-20 h-6 skeleton rounded"></div></td>
                  {isAdmin && <td className="py-6"><div className="w-20 h-8 skeleton rounded-xl ml-auto"></div></td>}
                </tr>
              ))
            ) : filtered.length > 0 ? (
              filtered.map((t, idx) => (
                 <tr 
                  key={t.id} 
                  className={cn(
                    "group/row hover:bg-white/5 dark:hover:bg-slate-800/10 transition-all duration-300 animate-in slide-up",
                    idx === 0 ? "delay-100" : idx === 1 ? "delay-150" : idx === 2 ? "delay-200" : "delay-300"
                  )}
                >
                  <td className="py-3.5 text-sm font-bold text-slate-500 dark:text-slate-400 group-hover/row:text-slate-900 dark:group-hover/row:text-white transition-colors">{t.date}</td>
                  <td className="py-3.5 border-none">
                    <div className="flex flex-col items-start gap-1">
                      <span className={cn(
                        "px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-[0.5rem] shadow-sm transition-all group-hover/row:scale-105 origin-left",
                        getCategoryColor(t.category)
                      )}>
                        {t.category}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">General Record</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-sm border-none">
                    <span className={cn(
                      "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] shadow-sm",
                      t.type === 'Income' 
                        ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20" 
                        : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                    )}>
                      {t.type === 'Income' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownLeft className="w-3 h-3" />}
                      {t.type}
                    </span>
                  </td>
                  <td className={cn(
                    "py-6 text-lg font-black border-none transition-all group-hover/row:scale-110 origin-left",
                    t.type === 'Income' ? "text-green-600 dark:text-green-400" : "text-slate-900 dark:text-white"
                  )}>
                    {t.type === 'Income' ? '+' : '-'}${Math.abs(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  {isAdmin && (
                    <td className="py-3.5 text-right border-none">
                      <div className="flex justify-end gap-3 opacity-0 group-hover/row:opacity-100 transition-all translate-x-4 group-hover/row:translate-x-0">
                        <button onClick={() => startEdit(t)} className="p-2.5 glass-button text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all transform hover:-rotate-12 shadow-lg shadow-blue-500/0 hover:shadow-blue-500/20" title="Modify Entry">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => onDelete(t.id)} className="p-2.5 glass-button text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all transform hover:rotate-12 shadow-lg shadow-red-500/0 hover:shadow-red-500/20" title="Remove Record">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isAdmin ? 5 : 4} className="py-32 text-center">
                  <div className="flex flex-col items-center justify-center animate-in scale-in duration-500">
                    <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-[2rem] mb-6 shadow-inner">
                      <SlidersHorizontal className="w-16 h-16 text-slate-300 dark:text-slate-600 group-hover:rotate-180 transition-transform duration-1000" />
                    </div>
                    <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.2em] text-sm">No synchronized records found</p>
                    <p className="text-xs font-bold text-slate-300 dark:text-slate-600 mt-2">Try adjusting your filters or search query</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>


  );
};

export default TransactionsTable;

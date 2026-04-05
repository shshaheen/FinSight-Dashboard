import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, SlidersHorizontal, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for Tailwind classes
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const TransactionsTable = ({ 
  transactions, 
  role, 
  onAdd, 
  onUpdate, 
  onDelete, 
  searchQuery, 
  setSearchQuery, 
  filterType, 
  setFilterType 
}) => {
  const isAdmin = role === 'Admin';
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Local form state
  const [formData, setFormData] = useState({ date: '', category: '', type: 'Expense', amount: '' });

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
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm mt-8 overflow-hidden transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Recent Transactions</h3>
        
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 bg-gray-50/50 border border-gray-200 p-1 rounded-xl">
            {['All', 'Income', 'Expense'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-lg transition-all",
                  filterType === type ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm" : "text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"
                )}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Add Button */}
          {isAdmin && (
            <button 
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-600/20"
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </button>
          )}
        </div>
      </div>

      {isAdding && isAdmin && (
        <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 mb-1 uppercase tracking-wider">Date</label>
              <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full p-2 border dark:border-slate-700 rounded-lg focus:ring-2 ring-blue-500/20 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 mb-1 uppercase tracking-wider">Category</label>
              <input required type="text" placeholder="e.g. Shopping" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 border dark:border-slate-700 rounded-lg focus:ring-2 ring-blue-500/20 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 mb-1 uppercase tracking-wider">Type</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full p-2 border dark:border-slate-700 rounded-lg focus:ring-2 ring-blue-500/20 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                <option>Income</option>
                <option>Expense</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 mb-1 uppercase tracking-wider">Amount</label>
              <input required type="number" step="0.01" placeholder="0.00" value={formData.amount} onChange={e => setFormData({...formData, amount: parseFloat(e.target.value)})} className="w-full p-2 border dark:border-slate-700 rounded-lg focus:ring-2 ring-blue-500/20 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={cancelAction} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200/50 rounded-lg transition-all">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20">
              {editingId ? 'Update' : 'Save'} Transaction
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 dark:border-slate-800">
              <th className="pb-4 pt-0 font-semibold text-gray-400 text-sm italic tracking-wider">DATE</th>
              <th className="pb-4 pt-0 font-semibold text-gray-400 text-sm italic tracking-wider">CATEGORY</th>
              <th className="pb-4 pt-0 font-semibold text-gray-400 text-sm italic tracking-wider">TYPE</th>
              <th className="pb-4 pt-0 font-semibold text-gray-400 text-sm italic tracking-wider">AMOUNT</th>
              {isAdmin && <th className="pb-4 pt-0 font-semibold text-gray-400 text-sm italic tracking-wider text-right">ACTIONS</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length > 0 ? (
              filtered.map((t) => (
                <tr key={t.id} className="group hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 text-sm font-medium text-gray-600 dark:text-slate-400 border-none">{t.date}</td>
                  <td className="py-4 text-sm font-bold text-gray-800 dark:text-slate-200 border-none">{t.category}</td>
                  <td className="py-4 text-sm border-none">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold leading-none",
                      t.type === 'Income' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    )}>
                      {t.type === 'Income' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownLeft className="w-3 h-3" />}
                      {t.type}
                    </span>
                  </td>
                  <td className={cn(
                    "py-4 text-sm font-extrabold border-none transition-colors",
                    t.type === 'Income' ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-slate-100"
                  )}>
                    {t.type === 'Income' ? '+' : '-'}${Math.abs(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  {isAdmin && (
                    <td className="py-4 text-right border-none">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        <button onClick={() => startEdit(t)} className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => onDelete(t.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isAdmin ? 5 : 4} className="py-20 text-center">
                  <div className="flex flex-col items-center justify-center grayscale opacity-50">
                    <SlidersHorizontal className="w-12 h-12 text-gray-300 mb-4" />
                    <p className="text-gray-400 font-medium">No transactions found matching your criteria</p>
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

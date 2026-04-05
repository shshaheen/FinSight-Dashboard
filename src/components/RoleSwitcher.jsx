import React from 'react';
import { User, ShieldCheck, ChevronDown } from 'lucide-react';
import { cn } from './TransactionsTable';

const RoleSwitcher = ({ selectedRole, setSelectedRole }) => {
  return (
    <div className="relative group">
      <div className="flex items-center gap-3 bg-white border border-gray-100 p-1.5 pr-4 pl-2 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer">
        <div className={cn(
          "p-2 rounded-xl shadow-inner",
          selectedRole === 'Admin' ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
        )}>
          {selectedRole === 'Admin' ? <ShieldCheck className="w-5 h-5" /> : <User className="w-5 h-5" />}
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-0.5">Access Level</span>
          <select 
            value={selectedRole} 
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-transparent text-sm font-extrabold text-gray-800 outline-none cursor-pointer appearance-none pr-6"
          >
            <option value="Viewer">Viewer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-300 absolute right-4 pointer-events-none group-hover:text-blue-500 transition-colors" />
      </div>
    </div>
  );
};

export default RoleSwitcher;

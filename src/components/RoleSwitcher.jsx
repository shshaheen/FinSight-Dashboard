import React from 'react';
import { User, ShieldCheck, ChevronDown } from 'lucide-react';
import { cn } from '../utils';

const RoleSwitcher = ({ selectedRole, setSelectedRole }) => {
  return (
    <div className="relative group">
      <div className="flex items-center gap-4 bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl border border-white/30 dark:border-white/5 p-2 pr-6 pl-2.5 rounded-[1.25rem] shadow-xl hover:shadow-blue-500/10 hover:border-white/50 dark:hover:border-white/10 transition-all duration-300 cursor-pointer group/switch overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 to-blue-500/5 group-hover/switch:to-blue-500/10 transition-colors"></div>
        <div className={cn(
          "relative z-10 p-2.5 rounded-[0.875rem] shadow-2xl transition-transform group-hover/switch:scale-110 duration-500",
          selectedRole === 'Admin' 
            ? "bg-amber-500 text-white shadow-amber-500/20" 
            : "bg-blue-600 text-white shadow-blue-600/20"
        )}>
          {selectedRole === 'Admin' ? <ShieldCheck className="w-5 h-5" /> : <User className="w-5 h-5" />}
        </div>
        <div className="relative z-10 flex flex-col">
          <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] leading-none mb-1.5 opacity-80">Access Tier</span>
          <div className="relative flex items-center">
            <select 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-transparent text-sm font-black text-slate-900 dark:text-white outline-none cursor-pointer appearance-none pr-8 tracking-tight"
            >
              <option value="Viewer" className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white">Viewer Account</option>
              <option value="Admin" className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white">Admin Privileges</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute right-0 pointer-events-none group-hover/switch:text-blue-500 transition-all group-hover/switch:translate-y-0.5" />
          </div>
        </div>
      </div>
    </div>

  );
};

export default RoleSwitcher;

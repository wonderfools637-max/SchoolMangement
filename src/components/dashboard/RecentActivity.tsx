import React from 'react';
import {
  CreditCard,
  UserPlus,
  CalendarCheck,
  Award,
  UserCheck,
  Megaphone,
  ArrowRight,
} from 'lucide-react';
import { RECENT_ACTIVITIES } from '../../data/mockData';
import { useSchool } from '../../context/SchoolContext';

export const RecentActivity: React.FC = () => {
  const { setActiveTab } = useSchool();

  const getIcon = (type: string) => {
    switch (type) {
      case 'fee':
        return <CreditCard className="w-4 h-4 text-emerald-600" />;
      case 'student':
        return <UserPlus className="w-4 h-4 text-blue-600" />;
      case 'attendance':
        return <CalendarCheck className="w-4 h-4 text-indigo-600" />;
      case 'result':
        return <Award className="w-4 h-4 text-amber-600" />;
      case 'teacher':
        return <UserCheck className="w-4 h-4 text-purple-600" />;
      case 'announcement':
        return <Megaphone className="w-4 h-4 text-rose-600" />;
      default:
        return <CalendarCheck className="w-4 h-4 text-slate-600" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'fee':
        return 'bg-emerald-50 border-emerald-100';
      case 'student':
        return 'bg-blue-50 border-blue-100';
      case 'attendance':
        return 'bg-indigo-50 border-indigo-100';
      case 'result':
        return 'bg-amber-50 border-amber-100';
      case 'teacher':
        return 'bg-purple-50 border-purple-100';
      case 'announcement':
        return 'bg-rose-50 border-rose-100';
      default:
        return 'bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Recent Institutional Activity</h2>
            <p className="text-xs text-slate-500 mt-0.5">Real-time audit log of campus transactions</p>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Live Feed</span>
        </div>

        {/* Activity Timeline List */}
        <div className="mt-4 space-y-3.5">
          {RECENT_ACTIVITIES.map((act) => (
            <div key={act.id} className="flex items-start gap-3 group">
              <div
                className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${getIconBg(
                  act.type
                )}`}
              >
                {getIcon(act.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                    {act.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">{act.timestamp}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                  {act.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        <button
          onClick={() => setActiveTab('user-management')}
          className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          <span>View Complete System Audit Log</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

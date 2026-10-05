import React from 'react';
import {
  GraduationCap,
  Users,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  Receipt,
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export const StatCards: React.FC = () => {
  const { setActiveTab } = useSchool();

  const stats = [
    {
      id: 'students',
      label: 'Total Enrolled Students',
      value: '2,458',
      change: '+8.4%',
      trendLabel: 'vs last term',
      isPositive: true,
      icon: GraduationCap,
      accentColor: 'text-blue-600 bg-blue-50 border-blue-100',
      actionTab: 'students',
    },
    {
      id: 'teachers',
      label: 'Teaching Faculty & Staff',
      value: '126',
      change: '+4.2%',
      trendLabel: '14 depts',
      isPositive: true,
      icon: Users,
      accentColor: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      actionTab: 'teachers',
    },
    {
      id: 'attendance',
      label: "Today's Student Attendance",
      value: '94.6%',
      change: '+1.2%',
      trendLabel: '2,325 present today',
      isPositive: true,
      icon: CheckCircle2,
      accentColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      actionTab: 'attendance',
    },
    {
      id: 'fees',
      label: 'Outstanding Dues (PKR)',
      value: '1,245,000',
      prefix: 'PKR ',
      change: '-12.8%',
      trendLabel: '87.2% recovery rate',
      isPositive: true, // recovery reduction is positive
      icon: Receipt,
      accentColor: 'text-amber-600 bg-amber-50 border-amber-100',
      actionTab: 'fees',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            onClick={() => setActiveTab(stat.actionTab)}
            className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 transition-all hover:shadow-xs cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">{stat.label}</span>
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${stat.accentColor}`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
                {stat.prefix}
                {stat.value}
              </span>
            </div>

            {/* Unboxed metadata line per anti-slop guidelines */}
            <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span className="flex items-center text-emerald-600 font-semibold font-mono">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {stat.change}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 text-[11px] truncate">{stat.trendLabel}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

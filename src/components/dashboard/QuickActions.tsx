import React from 'react';
import {
  UserPlus,
  Users,
  CreditCard,
  Award,
  CalendarCheck,
  Megaphone,
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export const QuickActions: React.FC = () => {
  const {
    setIsAddStudentOpen,
    setIsAddTeacherOpen,
    setIsCollectFeeOpen,
    setActiveTab,
    showToast,
  } = useSchool();

  const actions = [
    {
      label: 'Admit Student',
      description: 'Enroll candidate into classes',
      icon: UserPlus,
      color: 'text-blue-600 bg-blue-50 hover:bg-blue-100/70 border-blue-100',
      onClick: () => setIsAddStudentOpen(true),
    },
    {
      label: 'Onboard Teacher',
      description: 'Assign faculty departments',
      icon: Users,
      color: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100/70 border-indigo-100',
      onClick: () => setIsAddTeacherOpen(true),
    },
    {
      label: 'Collect Fee Voucher',
      description: 'Receive bank or cash payment',
      icon: CreditCard,
      color: 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100/70 border-emerald-100',
      onClick: () => {
        setActiveTab('fees');
      },
    },
    {
      label: 'Publish Result',
      description: 'Compile academic transcripts',
      icon: Award,
      color: 'text-amber-600 bg-amber-50 hover:bg-amber-100/70 border-amber-100',
      onClick: () => setActiveTab('results'),
    },
    {
      label: 'Mark Attendance',
      description: 'Record daily classroom rolls',
      icon: CalendarCheck,
      color: 'text-teal-600 bg-teal-50 hover:bg-teal-100/70 border-teal-100',
      onClick: () => setActiveTab('attendance'),
    },
    {
      label: 'New Announcement',
      description: 'Dispatch circulars & notices',
      icon: Megaphone,
      color: 'text-purple-600 bg-purple-50 hover:bg-purple-100/70 border-purple-100',
      onClick: () => setActiveTab('announcements'),
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-slate-900">Executive Quick Actions</h2>
        <p className="text-xs text-slate-500 mt-0.5">Rapid administrative shortcuts for institute operators</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.label}
              onClick={act.onClick}
              className={`p-3.5 rounded-xl border text-left transition-all hover:scale-[1.02] flex flex-col justify-between ${act.color}`}
            >
              <div className="w-8 h-8 rounded-lg bg-white/80 shadow-2xs flex items-center justify-center mb-3">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-snug">{act.label}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{act.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

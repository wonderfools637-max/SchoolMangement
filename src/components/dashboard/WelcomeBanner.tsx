import React from 'react';
import { Sparkles, Plus, Calendar, Clock, Download, ChevronRight } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { SCHOOL_INFO } from '../../data/mockData';

export const WelcomeBanner: React.FC = () => {
  const {
    userRole,
    setIsAddStudentOpen,
    setIsCollectFeeOpen,
    setActiveTab,
    showToast,
  } = useSchool();

  const todayDateFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const handleDownloadExecutiveBrief = () => {
    showToast('Executive Morning Brief (PDF) prepared for download.', 'info');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 shadow-xs relative overflow-hidden">
      {/* Decorative accent geometry */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-linear-to-l from-blue-50/60 to-transparent pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Campus Operational · Academic Term In Session</span>
          </div>

          <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">
            Good Morning, {SCHOOL_INFO.principal.split(' ')[0]} {SCHOOL_INFO.principal.split(' ')[1]}
          </h1>
          <p className="text-xs lg:text-sm text-slate-500 mt-1 max-w-2xl">
            Here is what is happening across <span className="font-medium text-slate-700">{SCHOOL_INFO.name}</span> today. 2,458 students enrolled across 24 classrooms.
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-500 mt-3">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {todayDateFormatted}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              08:00 AM – 02:30 PM (Regular Timetable)
            </span>
          </div>
        </div>

        {/* Action Button Group */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsAddStudentOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Admit Student</span>
          </button>

          <button
            onClick={() => setActiveTab('attendance')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors border border-slate-200/70"
          >
            <span>Mark Attendance</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={handleDownloadExecutiveBrief}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 rounded-xl transition-colors border border-slate-200"
            title="Download Daily Executive Brief"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Export Brief</span>
          </button>
        </div>
      </div>
    </div>
  );
};

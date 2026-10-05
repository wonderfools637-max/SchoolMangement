import React, { useState } from 'react';
import { CheckSquare, Calendar, Clock, Plus, Users, Search } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { HomeworkItem } from '../types';

export const HomeworkPage: React.FC = () => {
  const { homeworks, showToast } = useSchool();
  const [search, setSearch] = useState('');

  const filteredHomeworks = homeworks.filter(
    (h) =>
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.subject.toLowerCase().includes(search.toLowerCase()) ||
      h.class.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Homework & Coursework</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Daily homework assignments, reading tasks, and submission deadlines
          </p>
        </div>

        <button
          onClick={() => showToast('New Coursework assignment modal initialized.', 'info')}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Assign Homework</span>
        </button>
      </div>

      {/* Grid of assignments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHomeworks.map((hw) => {
          const submissionRate = Math.round((hw.submissionsCount / hw.totalStudents) * 100);
          return (
            <div
              key={hw.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {hw.class} - {hw.section} · {hw.subject}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                      hw.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : hw.status === 'Closed'
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {hw.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{hw.title}</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{hw.description}</p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Assigned by: <strong className="text-slate-800">{hw.teacher}</strong></span>
                  <span className="font-mono flex items-center gap-1 text-rose-600 font-semibold">
                    <Clock className="w-3.5 h-3.5" /> Due: {hw.dueDate}
                  </span>
                </div>

                {/* Submissions Progress */}
                <div className="mt-3">
                  <div className="flex justify-between text-[11px] mb-1 font-mono">
                    <span className="text-slate-500">Submissions Turned In</span>
                    <span className="font-bold text-slate-800">
                      {hw.submissionsCount} of {hw.totalStudents} ({submissionRate}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${submissionRate}%` }}
                      className="h-full rounded-full bg-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Portal Sync: Enabled</span>
                <button
                  onClick={() => showToast(`Reviewing student submissions for ${hw.title}`, 'info')}
                  className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                >
                  Review Submissions
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

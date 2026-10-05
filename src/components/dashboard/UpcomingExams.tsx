import React from 'react';
import { FileSpreadsheet, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export const UpcomingExams: React.FC = () => {
  const { exams, setActiveTab } = useSchool();

  return (
    <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Upcoming Examinations</h2>
            <p className="text-xs text-slate-500 mt-0.5">Approved date sheets and scheduled assessments</p>
          </div>
          <button
            onClick={() => setActiveTab('exams')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Exam Center
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {exams.slice(0, 3).map((exam) => (
            <div
              key={exam.id}
              className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors bg-white"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-900">{exam.subject}</span>
                <span className="font-mono text-[11px] text-blue-600 font-semibold">{exam.class}</span>
              </div>
              <p className="text-[11px] text-slate-500">{exam.title}</p>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1.5 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {exam.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {exam.startTime} ({exam.duration})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        <button
          onClick={() => setActiveTab('exams')}
          className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          <span>View Comprehensive Date Sheet</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

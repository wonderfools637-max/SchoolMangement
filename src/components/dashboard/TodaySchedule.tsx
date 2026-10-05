import React from 'react';
import { Clock, MapPin, User, ChevronRight } from 'lucide-react';
import { TODAY_SCHEDULE } from '../../data/mockData';
import { useSchool } from '../../context/SchoolContext';

export const TodaySchedule: React.FC = () => {
  const { setActiveTab } = useSchool();

  return (
    <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Today's Class Schedule</h2>
            <p className="text-xs text-slate-500 mt-0.5">Live timetable tracking across lecture halls</p>
          </div>
          <button
            onClick={() => setActiveTab('timetable')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Weekly Master
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {TODAY_SCHEDULE.map((item) => {
            const isLive = item.status === 'In Progress';
            const isCompleted = item.status === 'Completed';

            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  isLive
                    ? 'border-blue-300 bg-blue-50/50 shadow-2xs'
                    : isCompleted
                    ? 'border-slate-200 bg-slate-50/50 opacity-75'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{item.subject}</span>
                      <span className="text-[11px] font-medium text-blue-700 bg-blue-100/70 px-1.5 py-0.2 rounded font-mono">
                        {item.class}
                      </span>
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-400" />
                        {item.teacher}
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {item.room}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {item.time.split('-')[0].trim()}
                    </span>
                    <span
                      className={`text-[10px] font-medium mt-1 inline-block ${
                        isLive
                          ? 'text-blue-700 font-semibold'
                          : isCompleted
                          ? 'text-slate-400'
                          : 'text-amber-600'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        <button
          onClick={() => setActiveTab('timetable')}
          className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          <span>Open Full Timetable Engine</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

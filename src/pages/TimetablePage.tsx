import React, { useState } from 'react';
import { Clock, Calendar, Download, Printer, User, MapPin } from 'lucide-react';
import { TIMETABLE_DATA } from '../data/mockData';
import { useSchool } from '../context/SchoolContext';

export const TimetablePage: React.FC = () => {
  const { showToast } = useSchool();
  const [selectedClass, setSelectedClass] = useState('Grade 10-A');

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
  ];

  const handlePrint = () => {
    window.print();
    showToast('Class Timetable sent to print dialog.', 'info');
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Master Academic Timetable</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Weekly periods, laboratory blocks, prayer timings, and proctor assignments
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            aria-label="Filter Timetable by Class"
            className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 shadow-2xs focus:outline-hidden"
          >
            <option value="Grade 10-A">Class: Grade 10-A</option>
            <option value="Grade 10-B">Class: Grade 10-B</option>
            <option value="Grade 9-A">Class: Grade 9-A</option>
            <option value="O-Level 2">Class: O-Level 2</option>
            <option value="A-Level 1">Class: A-Level 1</option>
          </select>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Schedule</span>
          </button>
        </div>
      </div>

      {/* Timetable Grid View */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden print-area">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[850px] border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-semibold">
                <th className="py-3 px-3 w-36 border-r border-slate-800 font-mono text-center">
                  Timeslot
                </th>
                {days.map((day) => (
                  <th key={day.key} className="py-3 px-3 font-bold border-r border-slate-800 last:border-r-0 text-center">
                    {day.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {TIMETABLE_DATA.map((slot, idx) => (
                <tr key={slot.time} className="hover:bg-slate-50/50 transition-colors">
                  {/* Time Header */}
                  <td className="py-3 px-2 font-mono text-[11px] font-semibold text-slate-700 bg-slate-50 border-r border-slate-200 text-center whitespace-nowrap">
                    {slot.time}
                  </td>

                  {/* Day Slots */}
                  {days.map((day) => {
                    const item = (slot as any)[day.key];
                    if (!item) {
                      return <td key={day.key} className="p-2 border-r border-slate-200 last:border-r-0" />;
                    }

                    return (
                      <td
                        key={day.key}
                        className="p-2 border-r border-slate-200 last:border-r-0 align-top"
                      >
                        <div
                          className={`p-2.5 rounded-xl border-l-4 transition-all hover:scale-[1.02] shadow-2xs ${item.color}`}
                        >
                          <span className="font-bold text-xs block leading-tight truncate">
                            {item.subject}
                          </span>
                          <span className="text-[10px] text-slate-600 block mt-1 flex items-center gap-1 truncate">
                            <User className="w-2.5 h-2.5" />
                            {item.teacher}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono block mt-0.5 flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5" />
                            {item.room}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

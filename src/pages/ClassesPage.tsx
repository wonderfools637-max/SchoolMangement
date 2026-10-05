import React, { useState } from 'react';
import {
  Layers,
  BookOpen,
  Plus,
  Users,
  Clock,
  MapPin,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { ClassItem, SubjectItem } from '../types';

export const ClassesPage: React.FC = () => {
  const { classes, subjects, showToast } = useSchool();
  const [activeTab, setActiveTab] = useState<'classes' | 'subjects'>('classes');
  const [search, setSearch] = useState('');

  const filteredClasses = classes.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.classTeacher.toLowerCase().includes(search.toLowerCase()) ||
      c.room.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.teacher.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Classes & Academic Curriculum</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Classroom quotas, section allocation, and subject master syllabus
          </p>
        </div>

        <button
          onClick={() => showToast('New Classroom section registration initiated.', 'info')}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>{activeTab === 'classes' ? 'Add Section' : 'Add Subject'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 text-xs font-semibold border-b border-slate-200">
        <button
          onClick={() => setActiveTab('classes')}
          className={`flex items-center gap-2 pb-3 -mb-px border-b-2 transition-colors ${
            activeTab === 'classes'
              ? 'border-blue-600 text-blue-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Classrooms & Sections ({classes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('subjects')}
          className={`flex items-center gap-2 pb-3 -mb-px border-b-2 transition-colors ${
            activeTab === 'subjects'
              ? 'border-blue-600 text-blue-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Curriculum Subjects ({subjects.length})</span>
        </button>
      </div>

      {/* Tab 1: Classes Grid */}
      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClasses.map((cls) => {
            const occupancyPct = Math.round((cls.studentCount / cls.capacity) * 100);
            return (
              <div
                key={cls.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-slate-900">
                      {cls.name} <span className="text-blue-600">({cls.section})</span>
                    </h3>
                    <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {cls.id}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">
                    Class Incharge: <strong className="text-slate-800">{cls.classTeacher}</strong>
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{cls.room}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-mono">{cls.schedule}</span>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1 font-mono">
                      <span className="text-slate-500">Student Enrollment</span>
                      <span className="font-bold text-slate-800">
                        {cls.studentCount} / {cls.capacity} ({occupancyPct}%)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${occupancyPct}%` }}
                        className={`h-full rounded-full ${
                          occupancyPct >= 90 ? 'bg-amber-500' : 'bg-blue-600'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Full Timetable Assigned
                  </span>
                  <button
                    onClick={() => showToast(`Section roster exported for ${cls.name}-${cls.section}`, 'info')}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    View Roster
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Subjects Table */}
      {activeTab === 'subjects' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-semibold">
                  <th className="py-3 px-4">Subject Code</th>
                  <th className="py-3 px-4">Subject Title</th>
                  <th className="py-3 px-4">Target Class</th>
                  <th className="py-3 px-4">Head Instructor</th>
                  <th className="py-3 px-4 text-center">Weekly Hours</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSubjects.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-blue-700">{sub.code}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{sub.name}</td>
                    <td className="py-3 px-4 text-slate-700">{sub.class}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{sub.teacher}</td>
                    <td className="py-3 px-4 text-center font-mono font-semibold text-slate-800">
                      {sub.weeklyHours} hrs
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

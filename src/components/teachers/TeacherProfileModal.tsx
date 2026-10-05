import React, { useState } from 'react';
import {
  X,
  User,
  BookOpen,
  CalendarCheck,
  Clock,
  DollarSign,
  Phone,
  Mail,
  GraduationCap,
  Award,
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export const TeacherProfileModal: React.FC = () => {
  const { selectedTeacher, isTeacherProfileOpen, setIsTeacherProfileOpen } = useSchool();
  const [activeTab, setActiveTab] = useState<'overview' | 'classes' | 'payroll'>('overview');

  if (!isTeacherProfileOpen || !selectedTeacher) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Hero */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-200 border-2 border-white shadow-md shrink-0">
              <img
                src={selectedTeacher.avatar}
                alt={selectedTeacher.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{selectedTeacher.name}</h2>
                <span className="text-xs font-mono font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                  {selectedTeacher.teacherId}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-600 mt-0.5">{selectedTeacher.subject}</p>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                <span>{selectedTeacher.department}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-semibold">{selectedTeacher.status}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsTeacherProfileOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Header */}
        <div className="px-6 border-b border-slate-200 bg-white flex gap-6 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Faculty Overview', icon: User },
            { id: 'classes', label: 'Assigned Classes & Subjects', icon: BookOpen },
            { id: 'payroll', label: 'Remuneration & Service', icon: DollarSign },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 flex items-center gap-2 border-b-2 transition-colors ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs space-y-4">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Academic Credentials
                </span>
                <p className="text-sm font-semibold text-slate-800">{selectedTeacher.qualification}</p>
                <div className="flex items-center gap-4 text-slate-500 text-xs pt-1">
                  <span>Joined: <strong className="font-mono text-slate-700">{selectedTeacher.joiningDate}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Attendance: <strong className="text-emerald-600 font-mono font-semibold">{selectedTeacher.attendanceRate}%</strong></span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Phone</span>
                    <span className="font-medium text-slate-800 font-mono">{selectedTeacher.phone}</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Email</span>
                    <span className="font-medium text-slate-800 truncate block max-w-[150px]">{selectedTeacher.email}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'classes' && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-800">Assigned Sections & Lecture Blocks</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedTeacher.assignedClasses.map((cls) => (
                  <div key={cls} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-900 block">{cls}</span>
                      <span className="text-[11px] text-slate-500">{selectedTeacher.subject}</span>
                    </div>
                    <span className="text-xs font-mono font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      6 hrs / wk
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payroll' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-xs block">Gross Monthly Base Salary</span>
                  <span className="text-2xl font-bold font-mono text-slate-900 mt-1 block">
                    PKR {selectedTeacher.salary.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-emerald-600 mt-1 block font-medium">Direct Bank Transfer (HBL)</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-xs block">Annual Casual Leaves Balance</span>
                  <span className="text-2xl font-bold font-mono text-blue-600 mt-1 block">14 / 18</span>
                  <span className="text-[11px] text-slate-500 mt-1 block">4 days utilized this term</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">Faculty ID: {selectedTeacher.id}</span>
          <button
            onClick={() => setIsTeacherProfileOpen(false)}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 rounded-lg border border-slate-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Save,
  CheckCheck,
  Download,
  Filter,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { AttendanceRecord } from '../types';

export const AttendancePage: React.FC = () => {
  const { students, showToast } = useSchool();

  const [selectedClass, setSelectedClass] = useState('Grade 10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Filter students by class & section
  const classStudents = students.filter(
    (s) => s.class === selectedClass && s.section === selectedSection
  );

  // Initial attendance state for these students
  const [attendanceState, setAttendanceState] = useState<Record<string, 'Present' | 'Absent' | 'Late' | 'Leave'>>({
    'STU-1001': 'Present',
    'STU-1002': 'Present',
    'STU-1003': 'Present',
    'STU-1004': 'Absent',
    'STU-1005': 'Present',
    'STU-1006': 'Late',
  });

  const getStatus = (studentId: string): 'Present' | 'Absent' | 'Late' | 'Leave' => {
    return attendanceState[studentId] || 'Present';
  };

  const setStatus = (studentId: string, status: 'Present' | 'Absent' | 'Late' | 'Leave') => {
    setAttendanceState((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, 'Present'> = {};
    classStudents.forEach((s) => {
      updated[s.id] = 'Present';
    });
    setAttendanceState((prev) => ({ ...prev, ...updated }));
    showToast(`All ${classStudents.length} students in ${selectedClass}-${selectedSection} marked Present.`, 'success');
  };

  const handleSaveAttendance = () => {
    showToast(`Attendance register for ${selectedClass}-${selectedSection} on ${selectedDate} committed to database.`, 'success');
  };

  // Summary counts
  const presentCount = classStudents.filter((s) => getStatus(s.id) === 'Present').length;
  const absentCount = classStudents.filter((s) => getStatus(s.id) === 'Absent').length;
  const lateCount = classStudents.filter((s) => getStatus(s.id) === 'Late').length;
  const leaveCount = classStudents.filter((s) => getStatus(s.id) === 'Leave').length;
  const totalCount = classStudents.length || 1;
  const attendancePercentage = Math.round(((presentCount + lateCount) / totalCount) * 100);

  return (
    <div className="space-y-5 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Daily Attendance Register</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Log and review classroom attendance for state board and institutional metrics
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleMarkAllPresent}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Mark All Present</span>
          </button>

          <button
            onClick={handleSaveAttendance}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Register</span>
          </button>
        </div>
      </div>

      {/* Class Selector Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
            >
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 8">Grade 8</option>
              <option value="O-Level 2">O-Level 2</option>
              <option value="A-Level 1">A-Level 1</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
            >
              <option value="A">Section A</option>
              <option value="B">Section B</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Class Roll Strength</span>
            <span className="font-bold text-slate-900">{classStudents.length} Students</span>
          </div>
          <div className="text-right border-l border-slate-200 pl-4">
            <span className="text-[10px] text-slate-400 block">Today's Rate</span>
            <span className="font-bold text-emerald-600">{attendancePercentage}%</span>
          </div>
        </div>
      </div>

      {/* Summary Stat Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/20 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Present</span>
            <p className="text-xl font-bold text-emerald-600 font-mono mt-0.5">{presentCount}</p>
          </div>
          <CheckCircle2 className="w-6 h-6 text-emerald-500/70" />
        </div>

        <div className="bg-white p-4 rounded-xl border border-rose-200 bg-rose-50/20 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Absent</span>
            <p className="text-xl font-bold text-rose-600 font-mono mt-0.5">{absentCount}</p>
          </div>
          <XCircle className="w-6 h-6 text-rose-500/70" />
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/20 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Late</span>
            <p className="text-xl font-bold text-amber-600 font-mono mt-0.5">{lateCount}</p>
          </div>
          <Clock className="w-6 h-6 text-amber-500/70" />
        </div>

        <div className="bg-white p-4 rounded-xl border border-blue-200 bg-blue-50/20 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Approved Leave</span>
            <p className="text-xl font-bold text-blue-600 font-mono mt-0.5">{leaveCount}</p>
          </div>
          <AlertCircle className="w-6 h-6 text-blue-500/70" />
        </div>
      </div>

      {/* Interactive Attendance Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-semibold">
                <th className="py-3 px-4">Roll #</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Historical Rate</th>
                <th className="py-3 px-4 text-center">Current Status</th>
                <th className="py-3 px-4 text-right">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classStudents.map((s) => {
                const currentStatus = getStatus(s.id);
                return (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                      {s.rollNo}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={s.avatar}
                          alt={s.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="font-semibold text-slate-900">{s.name}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono font-medium text-slate-600">
                      {s.attendanceRate}%
                    </td>

                    {/* Interactive 4-state buttons */}
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex p-1 bg-slate-100 rounded-lg gap-1">
                        {(['Present', 'Absent', 'Late', 'Leave'] as const).map((status) => {
                          const isSelected = currentStatus === status;
                          const styles = {
                            Present: isSelected ? 'bg-emerald-600 text-white shadow-2xs font-semibold' : 'text-slate-600 hover:text-emerald-700',
                            Absent: isSelected ? 'bg-rose-600 text-white shadow-2xs font-semibold' : 'text-slate-600 hover:text-rose-700',
                            Late: isSelected ? 'bg-amber-500 text-white shadow-2xs font-semibold' : 'text-slate-600 hover:text-amber-700',
                            Leave: isSelected ? 'bg-blue-600 text-white shadow-2xs font-semibold' : 'text-slate-600 hover:text-blue-700',
                          };
                          return (
                            <button
                              key={status}
                              onClick={() => setStatus(s.id, status)}
                              className={`px-3 py-1 text-xs rounded-md transition-colors ${styles[status]}`}
                            >
                              {status}
                            </button>
                          );
                        })}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <input
                        type="text"
                        placeholder="Add note..."
                        className="px-2 py-1 text-[11px] border border-slate-200 rounded-md bg-transparent focus:bg-white focus:outline-hidden w-28 text-right"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

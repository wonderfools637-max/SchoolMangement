import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Award,
  Calendar,
  Clock,
  Printer,
  Plus,
  Search,
  CheckCircle2,
  Download,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { StudentResult } from '../types';

export const ExamsPage: React.FC = () => {
  const { exams, results, setSelectedResult, setIsResultCardOpen, showToast } = useSchool();
  const [activeTab, setActiveTab] = useState<'results' | 'schedule'>('results');
  const [search, setSearch] = useState('');

  const filteredResults = results.filter(
    (r) =>
      r.studentName.toLowerCase().includes(search.toLowerCase()) ||
      r.rollNo.toLowerCase().includes(search.toLowerCase()) ||
      r.class.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenResultCard = (result: StudentResult) => {
    setSelectedResult(result);
    setIsResultCardOpen(true);
  };

  const handlePublishNew = () => {
    showToast('Grading moderation finalized and synchronized across parent portals.', 'success');
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Examinations & Transcripts</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Administer examination date sheets, grading scales, and official report cards
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePublishNew}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Publish Term Grades</span>
          </button>

          <button
            onClick={() => showToast('New Exam paper assessment entry initialized.', 'info')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Exam</span>
          </button>
        </div>
      </div>

      {/* Tabs bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('results')}
            className={`flex items-center gap-2 pb-2.5 -mb-2 border-b-2 transition-colors ${
              activeTab === 'results'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Published Results & Report Cards ({results.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-2 pb-2.5 -mb-2 border-b-2 transition-colors ${
              activeTab === 'schedule'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Approved Date Sheets ({exams.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Results */}
      {activeTab === 'results' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search result by candidate name, roll number, or class..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-hidden focus:bg-white"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-semibold">
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Roll / Adm #</th>
                    <th className="py-3 px-4">Class</th>
                    <th className="py-3 px-4 text-center">Marks Obtained</th>
                    <th className="py-3 px-4 text-center">Percentage</th>
                    <th className="py-3 px-4 text-center">Grade</th>
                    <th className="py-3 px-4">Class Standing</th>
                    <th className="py-3 px-4 text-right">Official Document</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredResults.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-900">{r.studentName}</td>
                      <td className="py-3 px-4 font-mono font-medium text-slate-700">{r.rollNo}</td>
                      <td className="py-3 px-4 text-slate-700">{r.class}-{r.section}</td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-slate-900">
                        {r.obtainedMarks} / {r.totalMarks}
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-semibold text-blue-600">
                        {r.percentage}%
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-700 font-mono">
                          {r.overallGrade}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-700">{r.position}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleOpenResultCard(r)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-semibold text-xs transition-colors"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Result Card</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Schedule */}
      {activeTab === 'schedule' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[11px] font-mono font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    {exam.class}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      exam.status === 'Upcoming'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {exam.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{exam.subject}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{exam.title} ({exam.term})</p>

                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Date</span>
                    <span className="font-semibold text-slate-800 font-mono flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {exam.date}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] block">Time & Duration</span>
                    <span className="font-semibold text-slate-800 font-mono flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {exam.startTime} ({exam.duration})
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] block">Maximum Marks</span>
                    <span className="font-bold text-slate-900 font-mono">{exam.totalMarks} Marks</span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] block">Passing Threshold</span>
                    <span className="font-bold text-emerald-600 font-mono">{exam.passingMarks} Marks (40%)</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Controller Board Approval: Certified</span>
                <button
                  onClick={() => showToast(`Roll number slips downloaded for ${exam.subject} (${exam.class})`, 'info')}
                  className="text-blue-600 hover:text-blue-700 font-semibold hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Roll No Slips</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

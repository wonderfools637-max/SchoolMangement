import React, { useState } from 'react';
import {
  BarChart3,
  CalendarDays,
  FileText,
  PieChart,
  Download,
  Printer,
  Filter,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const ReportsPage: React.FC = () => {
  const { showToast, students, teachers, invoices, results } = useSchool();
  const [selectedReport, setSelectedReport] = useState('fee-collection');
  const [selectedClass, setSelectedClass] = useState('All');
  const [dateRange, setDateRange] = useState('October 2026');

  const reportsList = [
    { id: 'fee-collection', title: 'Fee Collection & Realization Report', category: 'Finance', icon: PieChart },
    { id: 'attendance', title: 'Student & Faculty Attendance Report', category: 'Academics', icon: CalendarDays },
    { id: 'results', title: 'Term Academic Result & Grade Curve Report', category: 'Academics', icon: FileText },
    { id: 'students', title: 'Student Demographics & Admissions Registry', category: 'Enrollment', icon: BarChart3 },
    { id: 'defaulters', title: 'Outstanding Fee Defaulters Audit List', category: 'Finance', icon: PieChart },
  ];

  const handleExport = () => {
    showToast(`Official ${selectedReport} exported as encrypted spreadsheet.`, 'success');
  };

  const handlePrint = () => {
    window.print();
    showToast('Report sent to system print dialog.', 'info');
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Institutional Analytics & Reports</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit-ready reporting for governing boards, parents, and ministry regulators
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export Excel</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Select Report Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {reportsList.map((rep) => {
          const Icon = rep.icon;
          const isSelected = selectedReport === rep.id;
          return (
            <button
              key={rep.id}
              onClick={() => setSelectedReport(rep.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/50 shadow-2xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  {rep.category}
                </span>
                <Icon
                  className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`}
                />
              </div>
              <p
                className={`text-xs font-bold leading-snug line-clamp-2 ${
                  isSelected ? 'text-blue-900' : 'text-slate-800'
                }`}
              >
                {rep.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Report Canvas & Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 print-area space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 no-print">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-700">Filter Dataset:</span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              aria-label="Filter Report by Class"
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            >
              <option value="All">All Classes Combined</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 8">Grade 8</option>
              <option value="O-Level 2">O-Level 2</option>
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              aria-label="Filter Report by Date Range"
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            >
              <option value="October 2026">October 2026 (Current Term)</option>
              <option value="September 2026">September 2026</option>
              <option value="Annual 2025-2026">Full Academic Year 2025-2026</option>
            </select>
          </div>

          <span className="text-xs font-mono text-slate-400">
            Generated on {new Date().toLocaleDateString()} · Apex Automated Data Sync
          </span>
        </div>

        {/* Report Preview Content */}
        {selectedReport === 'fee-collection' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-sans block mb-1">Gross Invoiced Volume</span>
                <span className="text-xl font-bold text-slate-900">PKR 9,850,000</span>
              </div>
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200">
                <span className="text-emerald-700 font-sans block mb-1">Verified Realized Recovery</span>
                <span className="text-xl font-bold text-emerald-700">PKR 8,605,000 (87.4%)</span>
              </div>
              <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-200">
                <span className="text-rose-700 font-sans block mb-1">Total Outstanding Aging Dues</span>
                <span className="text-xl font-bold text-rose-700">PKR 1,245,000</span>
              </div>
            </div>

            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Class</th>
                  <th className="py-2.5 px-4 text-right">Invoiced (PKR)</th>
                  <th className="py-2.5 px-4 text-right">Collected (PKR)</th>
                  <th className="py-2.5 px-4 text-right">Outstanding (PKR)</th>
                  <th className="py-2.5 px-4 text-right">Recovery %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr>
                  <td className="py-2 px-4 font-sans font-medium">Grade 10 (Sec A & B)</td>
                  <td className="py-2 px-4 text-right">2,450,000</td>
                  <td className="py-2 px-4 text-right text-emerald-600 font-bold">2,180,000</td>
                  <td className="py-2 px-4 text-right text-rose-600">270,000</td>
                  <td className="py-2 px-4 text-right font-bold text-slate-800">89.0%</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-sans font-medium">Grade 9 (Sec A & B)</td>
                  <td className="py-2 px-4 text-right">2,200,000</td>
                  <td className="py-2 px-4 text-right text-emerald-600 font-bold">1,940,000</td>
                  <td className="py-2 px-4 text-right text-rose-600">260,000</td>
                  <td className="py-2 px-4 text-right font-bold text-slate-800">88.1%</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-sans font-medium">O-Level 1 & 2</td>
                  <td className="py-2 px-4 text-right">2,800,000</td>
                  <td className="py-2 px-4 text-right text-emerald-600 font-bold">2,580,000</td>
                  <td className="py-2 px-4 text-right text-rose-600">220,000</td>
                  <td className="py-2 px-4 text-right font-bold text-slate-800">92.1%</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-sans font-medium">A-Level & FSc Blocks</td>
                  <td className="py-2 px-4 text-right">2,400,000</td>
                  <td className="py-2 px-4 text-right text-emerald-600 font-bold">1,905,000</td>
                  <td className="py-2 px-4 text-right text-rose-600">495,000</td>
                  <td className="py-2 px-4 text-right font-bold text-slate-800">79.4%</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {selectedReport !== 'fee-collection' && (
          <div className="py-8 text-center text-slate-500 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <p className="font-bold text-slate-800 text-sm">
              Live Verified Report Ready for {reportsList.find((r) => r.id === selectedReport)?.title}
            </p>
            <p className="text-slate-400 mt-1 max-w-md mx-auto">
              All 2,458 active student records and 126 instructors processed for {dateRange}. Click "Export Excel" or "Print Report" to output the formal audit schedule.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

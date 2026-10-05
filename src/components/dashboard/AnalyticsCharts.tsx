import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  Calendar,
  CreditCard,
  Award,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export const AnalyticsCharts: React.FC = () => {
  const { setActiveTab } = useSchool();
  const [studentTimeframe, setStudentTimeframe] = useState<'monthly' | 'yearly'>('monthly');

  // Student trend dataset (6 months)
  const studentEnrollmentData = [
    { month: 'May', current: 2190, previous: 1980, newAdmissions: 45 },
    { month: 'Jun', current: 2240, previous: 2010, newAdmissions: 50 },
    { month: 'Jul', current: 2280, previous: 2050, newAdmissions: 40 },
    { month: 'Aug', current: 2390, previous: 2120, newAdmissions: 110 },
    { month: 'Sep', current: 2435, previous: 2180, newAdmissions: 45 },
    { month: 'Oct', current: 2458, previous: 2220, newAdmissions: 23 },
  ];

  // Fee collection stats (PKR in Millions)
  const feeMonthlyData = [
    { month: 'May', collected: 7.8, pending: 1.1, overdue: 0.3 },
    { month: 'Jun', collected: 8.1, pending: 0.9, overdue: 0.4 },
    { month: 'Jul', collected: 7.5, pending: 1.4, overdue: 0.5 },
    { month: 'Aug', collected: 8.9, pending: 1.0, overdue: 0.3 },
    { month: 'Sep', collected: 8.6, pending: 1.2, overdue: 0.4 },
    { month: 'Oct', collected: 8.4, pending: 1.25, overdue: 0.45 },
  ];

  // Class exam averages
  const classPerformanceData = [
    { class: 'Grade 8', average: 81.4, passRate: 96 },
    { class: 'Grade 9', average: 78.8, passRate: 92 },
    { class: 'Grade 10', average: 85.2, passRate: 98 },
    { class: 'O-Level 1', average: 82.0, passRate: 95 },
    { class: 'O-Level 2', average: 87.6, passRate: 99 },
    { class: 'A-Level 1', average: 84.1, passRate: 97 },
    { class: 'FSc Pre-Eng', average: 86.5, passRate: 98 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* 1. Student Enrollment Analytics (7 cols on desktop) */}
      <div className="lg:col-span-7 bg-white rounded-2xl p-5 lg:p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                Student Enrollment Analytics
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Current term retention & new admission trajectory
              </p>
            </div>

            {/* Interactive Tab Toggle */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => setStudentTimeframe('monthly')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  studentTimeframe === 'monthly'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setStudentTimeframe('yearly')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  studentTimeframe === 'yearly'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* SVG Line / Bar Chart Representation */}
          <div className="mt-4 pt-2">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <span className="w-3 h-3 rounded-xs bg-blue-600 inline-block" /> Current (2026)
                </span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-3 h-3 rounded-xs bg-slate-300 inline-block" /> Previous (2025)
                </span>
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <span className="w-3 h-1 bg-emerald-500 inline-block" /> New Admissions
                </span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">Total: 2,458 active</span>
            </div>

            {/* Chart Area */}
            <div className="h-52 w-full flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-100">
              {studentEnrollmentData.map((d, index) => {
                const maxVal = 2600;
                const currentHeight = Math.round((d.current / maxVal) * 100);
                const prevHeight = Math.round((d.previous / maxVal) * 100);

                return (
                  <div key={d.month} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                    {/* Tooltip */}
                    <div className="absolute -top-10 bg-slate-900 text-white text-[11px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-md">
                      <span className="font-semibold">{d.month}</span>: {d.current} students ({d.newAdmissions} new)
                    </div>

                    {/* Bars pair */}
                    <div className="w-full max-w-[36px] flex items-end justify-center gap-1 h-full">
                      {/* Previous Bar */}
                      <div
                        style={{ height: `${prevHeight}%` }}
                        className="w-1/2 bg-slate-200 rounded-t-sm transition-all group-hover:bg-slate-300"
                      />
                      {/* Current Bar */}
                      <div
                        style={{ height: `${currentHeight}%` }}
                        className="w-1/2 bg-blue-600 rounded-t-sm transition-all group-hover:bg-blue-700"
                      />
                    </div>
                    <span className="text-[11px] font-medium text-slate-500 mt-2">{d.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Unboxed Metric Summary */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>
            Highest intake: <strong className="text-slate-800 font-semibold">August (110 new admissions)</strong>
          </div>
          <button
            onClick={() => setActiveTab('student-reports')}
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 hover:underline"
          >
            <span>Full Enrollment Report</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Today's Attendance Breakdown (5 cols on desktop) */}
      <div className="lg:col-span-5 bg-white rounded-2xl p-5 lg:p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                Attendance Overview
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Campus-wide presence status for today
              </p>
            </div>
            <button
              onClick={() => setActiveTab('attendance')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Take Register
            </button>
          </div>

          {/* Visual Bar Distribution */}
          <div className="mt-5">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-2xl font-bold text-slate-900 font-mono">94.6%</span>
              <span className="text-xs text-emerald-600 font-medium font-mono">+1.2% higher than weekly avg</span>
            </div>

            {/* Multi-segment progress bar */}
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-2xs">
              <div style={{ width: '94.6%' }} className="bg-emerald-500 h-full" title="Present: 94.6%" />
              <div style={{ width: '3.2%' }} className="bg-rose-500 h-full" title="Absent: 3.2%" />
              <div style={{ width: '2.2%' }} className="bg-amber-400 h-full" title="Late: 2.2%" />
            </div>

            {/* Key metrics list */}
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-medium text-slate-700">Present on Campus</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-semibold text-slate-900">2,325</span>
                  <span className="text-slate-400 text-[11px]">(94.6%)</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="font-medium text-slate-700">Unexcused Absences</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-semibold text-slate-900">79</span>
                  <span className="text-slate-400 text-[11px]">(3.2%)</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="font-medium text-slate-700">Late Arrivals</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-semibold text-slate-900">54</span>
                  <span className="text-slate-400 text-[11px]">(2.2%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
          <span>Faculty attendance today: <strong className="text-slate-800 font-semibold font-mono">98.4%</strong></span>
          <span className="text-[11px] text-slate-400">Automated Biometric Sync</span>
        </div>
      </div>

      {/* 3. Fee Collection & Dues Matrix (6 cols) */}
      <div className="lg:col-span-6 bg-white rounded-2xl p-5 lg:p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              Fee Collection (Current Term - PKR Millions)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Collected vs Pending vs Overdue
            </p>
          </div>
          <button
            onClick={() => setActiveTab('fees')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Ledger View
          </button>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-emerald-600 inline-block" /> Collected (PKR 8.4M)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-amber-400 inline-block" /> Pending (PKR 1.25M)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-rose-500 inline-block" /> Overdue (PKR 0.45M)
            </span>
          </div>

          <div className="h-44 w-full flex items-end justify-between gap-3 pt-4 pb-2 border-b border-slate-100">
            {feeMonthlyData.map((d) => {
              const max = 11;
              const colHeight = (d.collected / max) * 100;
              const penHeight = (d.pending / max) * 100;
              const ovHeight = (d.overdue / max) * 100;

              return (
                <div key={d.month} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                  <div className="w-full max-w-[32px] flex items-end gap-0.5 h-full">
                    <div style={{ height: `${colHeight}%` }} className="flex-1 bg-emerald-600 rounded-t-xs" />
                    <div style={{ height: `${penHeight}%` }} className="w-2 bg-amber-400 rounded-t-xs" />
                    <div style={{ height: `${ovHeight}%` }} className="w-1.5 bg-rose-500 rounded-t-xs" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 mt-2">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span>Target recovery rate for October: <strong className="text-slate-800 font-semibold font-mono">92%</strong></span>
          <span className="text-emerald-700 font-semibold font-mono">Current: 87.2%</span>
        </div>
      </div>

      {/* 4. Examination Performance by Class (6 cols) */}
      <div className="lg:col-span-6 bg-white rounded-2xl p-5 lg:p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              Examination Performance by Class
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Term 1 Cumulative Class Average & Passing Percentage
            </p>
          </div>
          <button
            onClick={() => setActiveTab('results')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            View Grades
          </button>
        </div>

        <div className="mt-4 space-y-2.5">
          {classPerformanceData.map((cls) => (
            <div key={cls.class} className="flex items-center justify-between gap-3 text-xs">
              <span className="w-24 font-medium text-slate-700 truncate">{cls.class}</span>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  style={{ width: `${cls.average}%` }}
                  className={`h-full rounded-full ${
                    cls.average >= 85 ? 'bg-blue-600' : cls.average >= 80 ? 'bg-indigo-500' : 'bg-slate-400'
                  }`}
                />
              </div>
              <div className="w-20 text-right font-mono tabular-nums text-slate-800 font-semibold">
                {cls.average}% <span className="text-[10px] text-slate-400 font-normal">avg</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Top performing tier: <strong className="text-slate-800 font-semibold">O-Level 2 (87.6%)</strong></span>
          <button
            onClick={() => setActiveTab('result-reports')}
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
          >
            Class Comparison
          </button>
        </div>
      </div>
    </div>
  );
};

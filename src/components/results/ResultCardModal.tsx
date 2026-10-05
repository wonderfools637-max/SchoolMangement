import React from 'react';
import { X, Printer, Download, Award, CheckCircle2 } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { SCHOOL_INFO } from '../../data/mockData';

export const ResultCardModal: React.FC = () => {
  const { selectedResult, isResultCardOpen, setIsResultCardOpen, showToast } = useSchool();

  if (!isResultCardOpen || !selectedResult) return null;

  const handlePrint = () => {
    window.print();
    showToast('Result card sent to system print dialog.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Control Bar (Hidden on print) */}
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Official Academic Transcript & Result Card
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={() => setIsResultCardOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Printable Result Card Document */}
        <div className="p-8 overflow-y-auto flex-1 bg-white print-area select-text">
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-5 mb-5 flex items-center justify-between gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
              <img
                src={SCHOOL_INFO.crestLogo}
                alt="School Crest"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="text-center flex-1">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 uppercase">
                {SCHOOL_INFO.name}
              </h1>
              <p className="text-xs text-slate-600 font-medium italic mt-0.5">
                {SCHOOL_INFO.tagline}
              </p>
              <p className="text-[11px] text-slate-500 font-mono mt-1">
                {SCHOOL_INFO.campus} · Reg: {SCHOOL_INFO.regNumber}
              </p>
              <div className="mt-2 inline-block px-3 py-1 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-sm">
                Cumulative Performance Report Card
              </div>
            </div>

            <div className="w-20 text-right font-mono text-[10px] text-slate-400">
              <p>SESSION</p>
              <p className="font-bold text-slate-800 text-xs">{SCHOOL_INFO.academicYear}</p>
            </div>
          </div>

          {/* Student Credentials Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs mb-6">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Student Name</span>
              <strong className="text-slate-900 font-bold text-sm">{selectedResult.studentName}</strong>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Roll Number</span>
              <strong className="text-slate-900 font-mono font-bold">{selectedResult.rollNo}</strong>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Class & Section</span>
              <strong className="text-slate-900 font-bold">{selectedResult.class} - {selectedResult.section}</strong>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Examination Term</span>
              <strong className="text-slate-900 font-bold">{selectedResult.examTitle}</strong>
            </div>
          </div>

          {/* Subject Scores Table */}
          <div className="mb-6 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-semibold">
                  <th className="py-2.5 px-4">Subject</th>
                  <th className="py-2.5 px-4 text-center">Maximum Marks</th>
                  <th className="py-2.5 px-4 text-center">Obtained Marks</th>
                  <th className="py-2.5 px-4 text-center">Percentage</th>
                  <th className="py-2.5 px-4 text-center">Grade</th>
                  <th className="py-2.5 px-4">Instructor Evaluation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {selectedResult.subjects.map((sub, idx) => {
                  const pct = Math.round((sub.obtainedMarks / sub.totalMarks) * 100);
                  return (
                    <tr key={sub.subject} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2.5 px-4 font-sans font-semibold text-slate-800">{sub.subject}</td>
                      <td className="py-2.5 px-4 text-center text-slate-500">{sub.totalMarks}</td>
                      <td className="py-2.5 px-4 text-center font-bold text-slate-900">{sub.obtainedMarks}</td>
                      <td className="py-2.5 px-4 text-center font-semibold text-slate-700">{pct}%</td>
                      <td className="py-2.5 px-4 text-center font-bold text-blue-700">{sub.grade}</td>
                      <td className="py-2.5 px-4 font-sans text-slate-600 text-[11px]">{sub.remarks}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-900 bg-slate-100 font-mono font-bold text-slate-900">
                  <td className="py-2.5 px-4 font-sans uppercase">Grand Total</td>
                  <td className="py-2.5 px-4 text-center">{selectedResult.totalMarks}</td>
                  <td className="py-2.5 px-4 text-center text-blue-700 text-sm">{selectedResult.obtainedMarks}</td>
                  <td className="py-2.5 px-4 text-center">{selectedResult.percentage}%</td>
                  <td className="py-2.5 px-4 text-center text-emerald-700 text-sm">{selectedResult.overallGrade}</td>
                  <td className="py-2.5 px-4 font-sans text-slate-800">{selectedResult.position}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Remarks & Authorizations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-8">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="font-bold text-slate-800 block mb-1">Class Teacher Remarks:</span>
              <p className="text-slate-600 italic leading-relaxed">"{selectedResult.teacherRemarks}"</p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="font-bold text-slate-800 block mb-1">Principal / Controller Assessment:</span>
              <p className="text-slate-600 italic leading-relaxed">"{selectedResult.principalRemarks}"</p>
            </div>
          </div>

          {/* Official Signatures Line */}
          <div className="pt-8 border-t border-slate-200 grid grid-cols-3 gap-6 text-center text-xs">
            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mb-1" />
              <span className="font-semibold text-slate-800">Class Teacher Signature</span>
            </div>

            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mb-1" />
              <span className="font-semibold text-slate-800">Controller of Examinations</span>
            </div>

            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mb-1 flex items-end justify-center">
                <span className="text-[11px] font-serif text-blue-800 italic">Dr. Tariq Mahmood</span>
              </div>
              <span className="font-semibold text-slate-800">Principal & Director</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

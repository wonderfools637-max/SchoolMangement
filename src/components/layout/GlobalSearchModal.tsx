import React, { useEffect, useRef } from 'react';
import {
  Search,
  X,
  GraduationCap,
  Users,
  CreditCard,
  Award,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export const GlobalSearchModal: React.FC = () => {
  const {
    isGlobalSearchOpen,
    setIsGlobalSearchOpen,
    globalSearchQuery,
    setGlobalSearchQuery,
    students,
    teachers,
    invoices,
    results,
    classes,
    setSelectedStudent,
    setIsStudentProfileOpen,
    setSelectedTeacher,
    setIsTeacherProfileOpen,
    setSelectedInvoice,
    setIsFeeReceiptOpen,
    setSelectedResult,
    setIsResultCardOpen,
    setActiveTab,
  } = useSchool();

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus on mount & handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen(!isGlobalSearchOpen);
      }
      if (e.key === 'Escape' && isGlobalSearchOpen) {
        setIsGlobalSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGlobalSearchOpen, setIsGlobalSearchOpen]);

  useEffect(() => {
    if (isGlobalSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setGlobalSearchQuery('');
    }
  }, [isGlobalSearchOpen, setGlobalSearchQuery]);

  if (!isGlobalSearchOpen) return null;

  const query = globalSearchQuery.trim().toLowerCase();

  // Filtered categorized results
  const matchingStudents = query
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.rollNo.toLowerCase().includes(query) ||
          s.admissionNo.toLowerCase().includes(query) ||
          s.class.toLowerCase().includes(query)
      )
    : students.slice(0, 3);

  const matchingTeachers = query
    ? teachers.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.subject.toLowerCase().includes(query) ||
          t.department.toLowerCase().includes(query)
      )
    : teachers.slice(0, 2);

  const matchingInvoices = query
    ? invoices.filter(
        (inv) =>
          inv.invoiceNo.toLowerCase().includes(query) ||
          inv.studentName.toLowerCase().includes(query)
      )
    : invoices.slice(0, 2);

  const matchingResults = query
    ? results.filter(
        (r) =>
          r.studentName.toLowerCase().includes(query) ||
          r.rollNo.toLowerCase().includes(query) ||
          r.overallGrade.toLowerCase() === query
      )
    : [];

  const handleSelectStudent = (student: typeof students[0]) => {
    setSelectedStudent(student);
    setIsStudentProfileOpen(true);
    setIsGlobalSearchOpen(false);
  };

  const handleSelectTeacher = (teacher: typeof teachers[0]) => {
    setSelectedTeacher(teacher);
    setIsTeacherProfileOpen(true);
    setIsGlobalSearchOpen(false);
  };

  const handleSelectInvoice = (invoice: typeof invoices[0]) => {
    setSelectedInvoice(invoice);
    setIsFeeReceiptOpen(true);
    setIsGlobalSearchOpen(false);
  };

  const handleSelectResult = (result: typeof results[0]) => {
    setSelectedResult(result);
    setIsResultCardOpen(true);
    setIsGlobalSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            placeholder="Type a student name, roll #, teacher, fee voucher, or grade..."
            className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden"
          />
          <button
            onClick={() => setIsGlobalSearchOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 divide-y divide-slate-100">
          {/* Students Section */}
          {matchingStudents.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                Students ({matchingStudents.length})
              </div>
              <div className="space-y-1">
                {matchingStudents.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectStudent(s)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 shrink-0">
                        <img src={s.avatar} alt={s.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {s.name}
                        </p>
                        <p className="text-[11px] text-slate-500 font-mono">
                          {s.class}-{s.section} · Roll: {s.rollNo} · {s.admissionNo}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">View Profile</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transform group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Teachers Section */}
          {matchingTeachers.length > 0 && (
            <div className="pt-3">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                Teachers & Faculty ({matchingTeachers.length})
              </div>
              <div className="space-y-1">
                {matchingTeachers.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTeacher(t)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 shrink-0">
                        <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {t.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {t.subject} · {t.department}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Fee Invoices */}
          {matchingInvoices.length > 0 && (
            <div className="pt-3">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                Fee Invoices ({matchingInvoices.length})
              </div>
              <div className="space-y-1">
                {matchingInvoices.map((inv) => (
                  <button
                    key={inv.id}
                    onClick={() => handleSelectInvoice(inv)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-900 font-mono">
                        {inv.invoiceNo} — {inv.studentName}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        PKR {inv.totalAmount.toLocaleString()} · Month: {inv.month} · Status: {inv.status}
                      </p>
                    </div>
                    <span className="text-[11px] text-blue-600 font-medium group-hover:underline">
                      View Receipt
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Examination Results */}
          {matchingResults.length > 0 && (
            <div className="pt-3">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                Academic Transcripts ({matchingResults.length})
              </div>
              <div className="space-y-1">
                {matchingResults.map((res) => (
                  <button
                    key={res.id}
                    onClick={() => handleSelectResult(res)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-900">
                        {res.studentName} — Grade {res.overallGrade} ({res.percentage}%)
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {res.examTitle} · Position: {res.position}
                      </p>
                    </div>
                    <span className="text-[11px] text-blue-600 font-medium group-hover:underline">
                      Result Card
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query &&
            matchingStudents.length === 0 &&
            matchingTeachers.length === 0 &&
            matchingInvoices.length === 0 &&
            matchingResults.length === 0 && (
              <div className="py-8 text-center text-slate-400">
                <p className="text-sm font-medium">No records found matching "{query}"</p>
                <p className="text-xs mt-1">Try searching by student name, roll number, or invoice code.</p>
              </div>
            )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">ESC</kbd> to close
            </span>
            <span>
              <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">ENTER</kbd> to select
            </span>
          </div>
          <span className="text-slate-400">Apex Institutional Unified Database</span>
        </div>
      </div>
    </div>
  );
};

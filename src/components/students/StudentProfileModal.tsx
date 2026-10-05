import React, { useState } from 'react';
import {
  X,
  User,
  GraduationCap,
  CalendarCheck,
  Award,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Clock,
  Printer,
  FileText,
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export const StudentProfileModal: React.FC = () => {
  const {
    selectedStudent,
    isStudentProfileOpen,
    setIsStudentProfileOpen,
    results,
    invoices,
    setSelectedResult,
    setIsResultCardOpen,
    setSelectedInvoice,
    setIsFeeReceiptOpen,
  } = useSchool();

  const [activeTab, setActiveTab] = useState<'profile' | 'academic' | 'results' | 'fees'>('profile');

  if (!isStudentProfileOpen || !selectedStudent) return null;

  // Filter student-specific results and invoices
  const studentResults = results.filter((r) => r.studentId === selectedStudent.id);
  const studentInvoices = invoices.filter((inv) => inv.studentId === selectedStudent.id);

  const handleOpenResultCard = (result: typeof studentResults[0]) => {
    setSelectedResult(result);
    setIsResultCardOpen(true);
  };

  const handleOpenReceipt = (invoice: typeof studentInvoices[0]) => {
    setSelectedInvoice(invoice);
    setIsFeeReceiptOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Profile Hero */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-200 border-2 border-white shadow-md shrink-0">
              <img
                src={selectedStudent.avatar}
                alt={selectedStudent.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{selectedStudent.name}</h2>
                <span className="text-xs font-mono font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  {selectedStudent.rollNo}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
                <span>Class: <strong className="text-slate-700">{selectedStudent.class}-{selectedStudent.section}</strong></span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>Adm No: <strong className="font-mono text-slate-700">{selectedStudent.admissionNo}</strong></span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>Status: <strong className="text-emerald-700 font-semibold">{selectedStudent.status}</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsStudentProfileOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 self-start sm:self-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-200 bg-white flex gap-6 text-xs font-semibold">
          {[
            { id: 'profile', label: 'Personal & Family', icon: User },
            { id: 'academic', label: 'Academic & Attendance', icon: CalendarCheck },
            { id: 'results', label: 'Exam Results', icon: Award },
            { id: 'fees', label: 'Fee Invoices', icon: CreditCard },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 flex items-center gap-2 border-b-2 transition-colors ${
                  isActive
                    ? 'border-blue-600 text-blue-600 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 text-xs space-y-5">
          {/* TAB 1: Personal & Family */}
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Personal Card */}
              <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/70 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Student Bio & Demographics
                </h3>
                <div className="space-y-2 text-slate-700">
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Gender</span>
                    <span className="font-semibold">{selectedStudent.gender}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Date of Birth</span>
                    <span className="font-semibold font-mono">{selectedStudent.dob}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Blood Group</span>
                    <span className="font-semibold font-mono">{selectedStudent.bloodGroup}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Religion</span>
                    <span className="font-semibold">{selectedStudent.religion}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Nationality</span>
                    <span className="font-semibold">{selectedStudent.nationality}</span>
                  </div>
                </div>
              </div>

              {/* Parent & Emergency Card */}
              <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/70 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Guardian & Emergency Contact
                </h3>
                <div className="space-y-2 text-slate-700">
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Father / Guardian</span>
                    <span className="font-semibold">{selectedStudent.parentName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Contact Number</span>
                    <span className="font-semibold font-mono flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      {selectedStudent.parentPhone}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Email</span>
                    <span className="font-semibold flex items-center gap-1 truncate max-w-[180px]">
                      <Mail className="w-3 h-3 text-slate-400" />
                      {selectedStudent.parentEmail}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Emergency Protocol</span>
                    <span className="font-semibold text-rose-700">
                      {selectedStudent.emergencyContact} ({selectedStudent.emergencyPhone})
                    </span>
                  </div>
                  <div className="py-1">
                    <span className="text-slate-500 block mb-0.5">Address</span>
                    <span className="font-medium text-slate-800 flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      {selectedStudent.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Academic & Attendance */}
          {activeTab === 'academic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-xs">Attendance Percentage</span>
                  <span className="text-2xl font-bold text-emerald-600 font-mono mt-1 block">
                    {selectedStudent.attendanceRate}%
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1 block">Satisfies 85% Board Requirement</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-xs">Fee Clearance</span>
                  <span
                    className={`text-2xl font-bold font-mono mt-1 block ${
                      selectedStudent.feeStatus === 'Paid' ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  >
                    {selectedStudent.feeStatus}
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1 block">October Term Status</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-xs">Admission Date</span>
                  <span className="text-lg font-bold text-slate-800 font-mono mt-1 block">
                    {selectedStudent.admissionDate}
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1 block">Session 2026-2027</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-800">Enrolled Curriculum Subjects</h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Mathematics', 'Physics', 'Chemistry', 'English Language', 'Computer Science', 'Pakistan Studies', 'Islamiyat'].map((sub) => (
                    <span key={sub} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Results */}
          {activeTab === 'results' && (
            <div className="space-y-4">
              {studentResults.length > 0 ? (
                studentResults.map((res) => (
                  <div
                    key={res.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors bg-white space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{res.examTitle}</h4>
                        <p className="text-slate-500 text-[11px] font-mono mt-0.5">
                          Total Marks: {res.obtainedMarks} / {res.totalMarks} · {res.percentage}% · Grade {res.overallGrade}
                        </p>
                      </div>
                      <button
                        onClick={() => handleOpenResultCard(res)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg text-xs transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        Print Official Result Card
                      </button>
                    </div>

                    {/* Mini subject score table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-400 font-semibold">
                            <th className="pb-1.5">Subject</th>
                            <th className="pb-1.5 text-right">Max</th>
                            <th className="pb-1.5 text-right">Obtained</th>
                            <th className="pb-1.5 text-right">Grade</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {res.subjects.map((s) => (
                            <tr key={s.subject}>
                              <td className="py-1 font-medium text-slate-800">{s.subject}</td>
                              <td className="py-1 text-right font-mono text-slate-500">{s.totalMarks}</td>
                              <td className="py-1 text-right font-mono font-bold text-slate-900">{s.obtainedMarks}</td>
                              <td className="py-1 text-right font-mono font-bold text-blue-700">{s.grade}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-slate-400">
                  <Award className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  <p>No published term results found for this student.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Fee History */}
          {activeTab === 'fees' && (
            <div className="space-y-4">
              {studentInvoices.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-semibold">
                        <th className="pb-2">Invoice #</th>
                        <th className="pb-2">Month</th>
                        <th className="pb-2 text-right">Total (PKR)</th>
                        <th className="pb-2 text-right">Paid (PKR)</th>
                        <th className="pb-2 text-right">Due (PKR)</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {studentInvoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-50">
                          <td className="py-2.5 font-mono font-medium text-slate-800">{inv.invoiceNo}</td>
                          <td className="py-2.5 text-slate-600">{inv.month}</td>
                          <td className="py-2.5 text-right font-mono font-medium text-slate-800">
                            {inv.totalAmount.toLocaleString()}
                          </td>
                          <td className="py-2.5 text-right font-mono text-emerald-600 font-semibold">
                            {inv.paidAmount.toLocaleString()}
                          </td>
                          <td className="py-2.5 text-right font-mono text-rose-600 font-semibold">
                            {inv.dueAmount.toLocaleString()}
                          </td>
                          <td className="py-2.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                inv.status === 'Paid'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : inv.status === 'Overdue'
                                  ? 'bg-rose-50 text-rose-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}
                            >
                              {inv.status}
                            </span>
                          </td>
                          <td className="py-2.5 text-right">
                            <button
                              onClick={() => handleOpenReceipt(inv)}
                              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                            >
                              View Receipt
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-8 text-center text-slate-400">
                  <CreditCard className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  <p>No billing invoices recorded yet for this student.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">
            Student Profile Record ID: {selectedStudent.id}
          </span>
          <button
            onClick={() => setIsStudentProfileOpen(false)}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

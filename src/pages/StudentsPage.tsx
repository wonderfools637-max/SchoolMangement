import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  UserPlus,
  Download,
  Eye,
  Trash2,
  Edit,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { Student } from '../types';

export const StudentsPage: React.FC = () => {
  const {
    students,
    setSelectedStudent,
    setIsStudentProfileOpen,
    setIsAddStudentOpen,
    deleteStudent,
    showToast,
  } = useSchool();

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedFeeStatus, setSelectedFeeStatus] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [sortField, setSortField] = useState<'name' | 'rollNo' | 'attendanceRate'>('name');
  const [sortAsc, setSortAsc] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Filtered & Sorted List
  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => {
        const matchesSearch =
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.admissionNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.parentName.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesClass = selectedClass === 'All' || s.class === selectedClass;
        const matchesFee = selectedFeeStatus === 'All' || s.feeStatus === selectedFeeStatus;
        const matchesGender = selectedGender === 'All' || s.gender === selectedGender;

        return matchesSearch && matchesClass && matchesFee && matchesGender;
      })
      .sort((a, b) => {
        let valA: any = a[sortField];
        let valB: any = b[sortField];
        if (typeof valA === 'string') {
          return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return sortAsc ? valA - valB : valB - valA;
      });
  }, [students, searchQuery, selectedClass, selectedFeeStatus, selectedGender, sortField, sortAsc]);

  const totalPages = Math.ceil(filteredStudents.length / pageSize) || 1;
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (field: 'name' | 'rollNo' | 'attendanceRate') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Student ID', 'Admission No', 'Name', 'Class', 'Section', 'Roll No', 'Parent', 'Phone', 'Attendance Rate', 'Fee Status'];
    const rows = filteredStudents.map((s) => [
      s.id,
      s.admissionNo,
      `"${s.name}"`,
      s.class,
      s.section,
      s.rollNo,
      `"${s.parentName}"`,
      s.parentPhone,
      `${s.attendanceRate}%`,
      s.feeStatus,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Apex_Students_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Students list exported to CSV successfully.', 'success');
  };

  const handleViewProfile = (student: Student) => {
    setSelectedStudent(student);
    setIsStudentProfileOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name} from the student registry?`)) {
      deleteStudent(id);
    }
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Student Directory</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage student registrations, academic standing, and guardians
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsAddStudentOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
          >
            <UserPlus className="w-4 h-4" />
            <span>New Admission</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by student name, roll number, admission #, or parent..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Class Filter */}
          <select
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Filter by Class"
            className="px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden focus:bg-white"
          >
            <option value="All">All Classes</option>
            <option value="Grade 8">Grade 8</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="O-Level 2">O-Level 2</option>
            <option value="A-Level 1">A-Level 1</option>
            <option value="FSc Pre-Engineering">FSc Pre-Engineering</option>
          </select>

          {/* Fee Status Filter */}
          <select
            value={selectedFeeStatus}
            onChange={(e) => {
              setSelectedFeeStatus(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Filter by Fee Status"
            className="px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden focus:bg-white"
          >
            <option value="All">All Fee Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
            <option value="Partial">Partial</option>
          </select>

          {/* Gender Filter */}
          <select
            value={selectedGender}
            onChange={(e) => {
              setSelectedGender(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Filter by Gender"
            className="px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden focus:bg-white"
          >
            <option value="All">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {(searchQuery || selectedClass !== 'All' || selectedFeeStatus !== 'All' || selectedGender !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedClass('All');
                setSelectedFeeStatus('All');
                setSelectedGender('All');
              }}
              className="text-xs text-blue-600 hover:underline px-2 py-1"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Students Data Grid Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/60 text-slate-500 font-semibold select-none">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">
                  <button
                    onClick={() => handleSort('rollNo')}
                    className="flex items-center gap-1 hover:text-slate-800"
                  >
                    <span>Roll / Adm #</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </button>
                </th>
                <th className="py-3 px-4">Class & Section</th>
                <th className="py-3 px-4">Guardian / Parent</th>
                <th className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleSort('attendanceRate')}
                    className="flex items-center gap-1 mx-auto hover:text-slate-800"
                  >
                    <span>Attendance</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </button>
                </th>
                <th className="py-3 px-4 text-center">Fee Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((s) => (
                  <tr
                    key={s.id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => handleViewProfile(s)}
                  >
                    {/* Student Name & Avatar */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 ring-1 ring-slate-200 shrink-0">
                          <img
                            src={s.avatar}
                            alt={s.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {s.name}
                          </p>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {s.gender} · Blood: {s.bloodGroup}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Roll / Adm */}
                    <td className="py-3 px-4 font-mono">
                      <p className="font-semibold text-slate-800">{s.rollNo}</p>
                      <p className="text-[11px] text-slate-400">{s.admissionNo}</p>
                    </td>

                    {/* Class */}
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-800">
                        {s.class}
                      </span>
                      <span className="text-slate-400 ml-1 font-mono">Sec {s.section}</span>
                    </td>

                    {/* Guardian */}
                    <td className="py-3 px-4">
                      <p className="font-medium text-slate-800">{s.parentName}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{s.parentPhone}</p>
                    </td>

                    {/* Attendance */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`font-mono font-semibold text-xs ${
                          s.attendanceRate >= 95
                            ? 'text-emerald-600'
                            : s.attendanceRate >= 90
                            ? 'text-blue-600'
                            : 'text-amber-600'
                        }`}
                      >
                        {s.attendanceRate}%
                      </span>
                    </td>

                    {/* Fee Status (Unboxed / soft badge) */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                          s.feeStatus === 'Paid'
                            ? 'bg-emerald-50 text-emerald-700'
                            : s.feeStatus === 'Overdue'
                            ? 'bg-rose-50 text-rose-700'
                            : s.feeStatus === 'Partial'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {s.feeStatus}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleViewProfile(s)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Complete Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(s.id, s.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-medium">No student records match the current filters.</p>
                    <p className="text-xs mt-1">Try modifying your search or reset the filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing <strong className="text-slate-800">{filteredStudents.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</strong> to{' '}
            <strong className="text-slate-800">{Math.min(currentPage * pageSize, filteredStudents.length)}</strong> of{' '}
            <strong className="text-slate-800">{filteredStudents.length}</strong> registered students
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                  currentPage === pageNum
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Search,
  UserPlus,
  Users,
  Eye,
  Trash2,
  Mail,
  Phone,
  BookOpen,
  Filter,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { Teacher } from '../types';

export const TeachersPage: React.FC = () => {
  const { teachers, setSelectedTeacher, setIsTeacherProfileOpen, setIsAddTeacherOpen, deleteTeacher } = useSchool();
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.teacherId.toLowerCase().includes(search.toLowerCase());
    const matchesDept = departmentFilter === 'All' || t.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  const handleView = (t: Teacher) => {
    setSelectedTeacher(t);
    setIsTeacherProfileOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete faculty member ${name}?`)) {
      deleteTeacher(id);
    }
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Faculty & Instructors</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Teaching staff directory, departmental heads, and course allocation
          </p>
        </div>

        <button
          onClick={() => setIsAddTeacherOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Onboard Faculty</span>
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search teachers by name, subject, or employee ID..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-hidden focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            aria-label="Filter by Department"
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
          >
            <option value="All">All Departments</option>
            <option value="Mathematics & Computing">Mathematics & Computing</option>
            <option value="Natural Sciences">Natural Sciences</option>
            <option value="Languages & Humanities">Languages & Humanities</option>
          </select>
        </div>
      </div>

      {/* Grid of Teachers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 transition-all hover:shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 ring-1 ring-slate-200 shrink-0">
                    <img
                      src={teacher.avatar}
                      alt={teacher.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{teacher.name}</h3>
                    <p className="text-xs text-blue-600 font-medium">{teacher.subject}</p>
                    <span className="text-[10px] font-mono text-slate-400">{teacher.teacherId}</span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    teacher.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {teacher.status}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{teacher.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono">{teacher.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{teacher.email}</span>
                </div>
              </div>

              {/* Assigned classes tags */}
              <div className="mt-3 flex flex-wrap gap-1">
                {teacher.assignedClasses.map((c) => (
                  <span key={c} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                PKR {teacher.salary.toLocaleString()}/mo
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleView(teacher)}
                  className="px-2.5 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={() => handleDelete(teacher.id, teacher.name)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                  title="Remove Faculty"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

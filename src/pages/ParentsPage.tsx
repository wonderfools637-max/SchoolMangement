import React, { useState } from 'react';
import { UserCheck, Phone, Mail, MapPin, Search, GraduationCap, ArrowRight } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { Parent } from '../types';

export const ParentsPage: React.FC = () => {
  const { parents, setSelectedStudent, setIsStudentProfileOpen, students, showToast } = useSchool();
  const [search, setSearch] = useState('');

  const filteredParents = parents.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.toLowerCase().includes(search.toLowerCase()) ||
      p.occupation.toLowerCase().includes(search.toLowerCase())
  );

  const handleStudentClick = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    if (student) {
      setSelectedStudent(student);
      setIsStudentProfileOpen(true);
    }
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Parent & Guardian Portal</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Registered guardians, student association, and emergency channels
          </p>
        </div>

        <button
          onClick={() => showToast('Parent portal invitations dispatched via SMS gateway.', 'success')}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
        >
          <Mail className="w-4 h-4" />
          <span>Broadcast SMS to Parents</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredParents.map((parent) => (
          <div
            key={parent.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{parent.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{parent.occupation}</p>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                  {parent.status}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono">{parent.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{parent.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{parent.address}</span>
                </div>
              </div>

              {/* Linked Students List */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Linked Student Wards
                </span>
                <div className="space-y-1.5">
                  {parent.students.map((child) => (
                    <button
                      key={child.studentId}
                      onClick={() => handleStudentClick(child.studentId)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/70 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {child.name}
                          </p>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {child.class} · Fee: {child.feeStatus}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transform group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

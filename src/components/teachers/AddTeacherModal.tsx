import React, { useState } from 'react';
import { X, UserPlus, Briefcase, Mail, Phone, BookOpen } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { Teacher } from '../../types';

export const AddTeacherModal: React.FC = () => {
  const { isAddTeacherOpen, setIsAddTeacherOpen, addTeacher } = useSchool();

  const [formData, setFormData] = useState({
    name: '',
    teacherId: `T-EMP-0${Math.floor(10 + Math.random() * 90)}`,
    subject: 'Pure Mathematics',
    department: 'Mathematics & Computing',
    qualification: 'M.Phil / MS (Gold Medalist)',
    assignedClasses: 'Grade 10-A, O-Level 2',
    phone: '+92 300 1234567',
    email: '',
    joiningDate: new Date().toISOString().split('T')[0],
    salary: 140000,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  });

  if (!isAddTeacherOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please provide faculty name.');
      return;
    }

    const newTeacher: Omit<Teacher, 'id'> = {
      teacherId: formData.teacherId,
      name: formData.name,
      avatar: formData.avatar,
      subject: formData.subject,
      department: formData.department,
      qualification: formData.qualification,
      assignedClasses: formData.assignedClasses.split(',').map((c) => c.trim()),
      phone: formData.phone,
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '.')}@apexcollege.edu.pk`,
      joiningDate: formData.joiningDate,
      status: 'Active',
      salary: Number(formData.salary),
      attendanceRate: 99,
    };

    addTeacher(newTeacher);
    setIsAddTeacherOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-base font-bold text-slate-900">Faculty Onboarding</h2>
            <p className="text-xs text-slate-500">Register new instructor or administrative educator</p>
          </div>
          <button
            onClick={() => setIsAddTeacherOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Faculty Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Prof. Tariq Munir"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Specialization / Subject *</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              >
                <option value="Mathematics & Computing">Mathematics & Computing</option>
                <option value="Natural Sciences">Natural Sciences</option>
                <option value="Languages & Humanities">Languages & Humanities</option>
                <option value="Social Sciences">Social Sciences</option>
                <option value="Sports & Physical Education">Sports & Physical Education</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Academic Qualification & Degrees</label>
            <input
              type="text"
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              placeholder="e.g. Ph.D. Physics (QAU), CELTA (Cambridge)"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Assigned Classes (comma separated)</label>
              <input
                type="text"
                value={formData.assignedClasses}
                onChange={(e) => setFormData({ ...formData, assignedClasses: e.target.value })}
                placeholder="Grade 10-A, O-Level 2"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Monthly Salary (PKR)</label>
              <input
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Official Mobile / Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Official Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="faculty@apexcollege.edu.pk"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddTeacherOpen(false)}
              className="px-4 py-2 font-medium text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-2xs"
            >
              Onboard Faculty
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

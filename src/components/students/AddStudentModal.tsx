import React, { useState } from 'react';
import {
  X,
  User,
  Users,
  GraduationCap,
  PhoneCall,
  FileText,
  Check,
  Upload,
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { Student } from '../../types';

export const AddStudentModal: React.FC = () => {
  const { isAddStudentOpen, setIsAddStudentOpen, addStudent, classes } = useSchool();

  const [activeStep, setActiveStep] = useState<number>(1);

  // Form State
  const [formData, setFormData] = useState({
    // Personal
    name: '',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    dob: '2010-01-15',
    bloodGroup: 'B+',
    religion: 'Islam',
    nationality: 'Pakistani',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',

    // Parent
    parentName: '',
    motherName: '',
    parentPhone: '',
    motherPhone: '',
    parentEmail: '',
    address: '',

    // Academic
    admissionNo: `ADM-2026-${Math.floor(100 + Math.random() * 900)}`,
    class: 'Grade 10',
    section: 'A',
    rollNo: '10-A-25',
    admissionDate: new Date().toISOString().split('T')[0],

    // Emergency
    emergencyContact: '',
    emergencyRelation: 'Guardian',
    emergencyPhone: '',

    // Documents
    hasBirthCertificate: true,
    hasLeavingCertificate: true,
  });

  if (!isAddStudentOpen) return null;

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter student name.');
      return;
    }

    const newStudentData: Omit<Student, 'id'> = {
      admissionNo: formData.admissionNo,
      name: formData.name,
      avatar: formData.avatar,
      class: formData.class,
      section: formData.section,
      rollNo: formData.rollNo,
      gender: formData.gender,
      dob: formData.dob,
      bloodGroup: formData.bloodGroup,
      religion: formData.religion,
      nationality: formData.nationality,
      admissionDate: formData.admissionDate,
      parentName: formData.parentName || 'Guardian',
      parentPhone: formData.parentPhone || '+92 300 1234567',
      parentEmail: formData.parentEmail || 'parent@example.com',
      address: formData.address || 'Islamabad, Pakistan',
      emergencyContact: formData.emergencyContact || formData.parentName,
      emergencyRelation: formData.emergencyRelation,
      emergencyPhone: formData.emergencyPhone || formData.parentPhone,
      attendanceRate: 100,
      feeStatus: 'Pending',
      status: 'Active',
    };

    addStudent(newStudentData);
    setIsAddStudentOpen(false);
    setActiveStep(1);
  };

  const steps = [
    { number: 1, title: 'Personal Details', icon: User },
    { number: 2, title: 'Parent & Family', icon: Users },
    { number: 3, title: 'Academic Enrollment', icon: GraduationCap },
    { number: 4, title: 'Emergency & Docs', icon: FileText },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-base font-bold text-slate-900">Student Admission Registration</h2>
            <p className="text-xs text-slate-500">Official student record creation wizard</p>
          </div>
          <button
            onClick={() => setIsAddStudentOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-3 border-b border-slate-100 bg-white flex items-center justify-between">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isDone = activeStep > s.number;
            const isCurrent = activeStep === s.number;
            return (
              <button
                key={s.number}
                type="button"
                onClick={() => setActiveStep(s.number)}
                className="flex items-center gap-2 group cursor-pointer focus:outline-hidden"
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold transition-colors ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5" /> : s.number}
                </div>
                <span
                  className={`hidden sm:inline text-xs font-medium ${
                    isCurrent ? 'text-slate-900 font-bold' : 'text-slate-500'
                  }`}
                >
                  {s.title}
                </span>
                {idx < steps.length - 1 && (
                  <span className="hidden sm:inline w-6 h-px bg-slate-200 mx-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* STEP 1: Personal Details */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g. Muhammad Daniyal Khan"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => handleChange('dob', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => handleChange('bloodGroup', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Nationality</label>
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => handleChange('nationality', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Religion</label>
                  <input
                    type="text"
                    value={formData.religion}
                    onChange={(e) => handleChange('religion', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Avatar Image URL</label>
                  <input
                    type="url"
                    value={formData.avatar}
                    onChange={(e) => handleChange('avatar', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Parent Information */}
          {activeStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Father's Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => handleChange('parentName', e.target.value)}
                    placeholder="e.g. Asadullah Khan"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Mother's Name</label>
                  <input
                    type="text"
                    value={formData.motherName}
                    onChange={(e) => handleChange('motherName', e.target.value)}
                    placeholder="e.g. Samina Khan"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Father's Phone / Mobile *</label>
                  <input
                    type="tel"
                    required
                    value={formData.parentPhone}
                    onChange={(e) => handleChange('parentPhone', e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Parent Email</label>
                  <input
                    type="email"
                    value={formData.parentEmail}
                    onChange={(e) => handleChange('parentEmail', e.target.value)}
                    placeholder="parent@gmail.com"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Residential Address *</label>
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="House #, Street #, Sector/Area, City"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Academic Enrollment */}
          {activeStep === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Admission Number</label>
                  <input
                    type="text"
                    value={formData.admissionNo}
                    onChange={(e) => handleChange('admissionNo', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Enrolling Class *</label>
                  <select
                    value={formData.class}
                    onChange={(e) => handleChange('class', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  >
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="O-Level 1">O-Level 1</option>
                    <option value="O-Level 2">O-Level 2</option>
                    <option value="A-Level 1">A-Level 1</option>
                    <option value="FSc Pre-Engineering">FSc Pre-Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Section</label>
                  <select
                    value={formData.section}
                    onChange={(e) => handleChange('section', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Assigned Roll Number</label>
                  <input
                    type="text"
                    value={formData.rollNo}
                    onChange={(e) => handleChange('rollNo', e.target.value)}
                    placeholder="e.g. 10-A-25"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Admission Date</label>
                  <input
                    type="date"
                    value={formData.admissionDate}
                    onChange={(e) => handleChange('admissionDate', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Emergency Information & Documents */}
          {activeStep === 4 && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs text-blue-900">
                <span className="font-semibold">Compliance Note:</span> Please ensure government Nadra B-Form or Birth Certificate has been verified in original prior to physical id card issuance.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Emergency Contact Person</label>
                  <input
                    type="text"
                    value={formData.emergencyContact}
                    onChange={(e) => handleChange('emergencyContact', e.target.value)}
                    placeholder="e.g. Uncle / Family Physician"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Emergency Phone</label>
                  <input
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleChange('emergencyPhone', e.target.value)}
                    placeholder="+92 300 0000000"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 space-y-2">
                <span className="text-xs font-semibold text-slate-800 block">Submitted Documentation Check</span>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasBirthCertificate}
                    onChange={(e) => handleChange('hasBirthCertificate', e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Original Nadra B-Form / Birth Certificate Verified</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasLeavingCertificate}
                    onChange={(e) => handleChange('hasLeavingCertificate', e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>School Leaving Certificate (SLC) & Character Certificate Received</span>
                </label>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
            {activeStep > 1 ? (
              <button
                type="button"
                onClick={() => setActiveStep((prev) => prev - 1)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAddStudentOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>

              {activeStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => prev + 1)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-2xs"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs"
                >
                  Complete Admission
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

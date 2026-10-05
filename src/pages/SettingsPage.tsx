import React, { useState } from 'react';
import {
  Settings,
  Building,
  GraduationCap,
  CreditCard,
  Bell,
  Shield,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { SCHOOL_INFO } from '../data/mockData';

export const SettingsPage: React.FC = () => {
  const { showToast } = useSchool();
  const [activeTab, setActiveTab] = useState<'general' | 'academic' | 'finance' | 'roles'>('general');

  const [schoolData, setSchoolData] = useState({
    name: SCHOOL_INFO.name,
    tagline: SCHOOL_INFO.tagline,
    campus: SCHOOL_INFO.campus,
    phone: SCHOOL_INFO.phone,
    email: SCHOOL_INFO.email,
    website: SCHOOL_INFO.website,
    academicYear: SCHOOL_INFO.academicYear,
    passingPercentage: 40,
    currency: 'PKR (Pakistani Rupee)',
    dueDateDay: 10,
    lateFee: 2000,
    smsNotifications: true,
    emailNotifications: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Institutional configuration and security parameters updated.', 'success');
  };

  const rolePermissions = [
    { role: 'Super Admin', students: 'Full Access', teachers: 'Full Access', finances: 'Full Access', academics: 'Full Access', system: 'Full Access' },
    { role: 'Principal / Director', students: 'Full Access', teachers: 'Full Access', finances: 'Read / Moderate', academics: 'Full Access', system: 'Read Only' },
    { role: 'Teacher / Faculty', students: 'Assigned Classes', teachers: 'Read Only', finances: 'No Access', academics: 'Marks & Attendance', system: 'No Access' },
    { role: 'Accountant / Bursar', students: 'Fee Ledger Only', teachers: 'Payroll Read', finances: 'Full Access', academics: 'No Access', system: 'No Access' },
    { role: 'Receptionist / Front Desk', students: 'Directory & Visitor', teachers: 'Directory', finances: 'Collect Cash', academics: 'View Timetable', system: 'No Access' },
  ];

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">System Configuration & Settings</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Institutional identities, academic passing thresholds, billing rules, and RBAC matrix
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 text-xs font-semibold border-b border-slate-200">
        {[
          { id: 'general', label: 'School Information', icon: Building },
          { id: 'academic', label: 'Academic & Grading', icon: GraduationCap },
          { id: 'finance', label: 'Finance & Invoicing', icon: CreditCard },
          { id: 'roles', label: 'Roles & RBAC Matrix', icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 pb-3 -mb-px border-b-2 transition-colors ${
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

      {/* Content Form */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
        {activeTab === 'general' && (
          <form onSubmit={handleSave} className="space-y-4 max-w-2xl text-xs">
            {/* Campus Photo & Crest Preview */}
            <div className="flex items-center gap-5 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                <img
                  src={SCHOOL_INFO.crestLogo}
                  alt="School Crest"
                  className="w-12 h-12 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-sm">{schoolData.name}</h4>
                <p className="text-slate-500 mt-0.5">{schoolData.tagline}</p>
                <span className="text-[10px] font-mono text-slate-400 mt-1 block">Crest Insignia: Active (PNG)</span>
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Official Institute Name</label>
              <input
                type="text"
                value={schoolData.name}
                onChange={(e) => setSchoolData({ ...schoolData, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Motto / Tagline</label>
              <input
                type="text"
                value={schoolData.tagline}
                onChange={(e) => setSchoolData({ ...schoolData, tagline: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Campus Physical Address</label>
              <input
                type="text"
                value={schoolData.campus}
                onChange={(e) => setSchoolData({ ...schoolData, campus: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Principal Office Phone</label>
                <input
                  type="text"
                  value={schoolData.phone}
                  onChange={(e) => setSchoolData({ ...schoolData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Central Admissions Email</label>
                <input
                  type="email"
                  value={schoolData.email}
                  onChange={(e) => setSchoolData({ ...schoolData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>
          </form>
        )}

        {activeTab === 'academic' && (
          <div className="space-y-4 max-w-2xl text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Active Academic Session</label>
              <input
                type="text"
                value={schoolData.academicYear}
                onChange={(e) => setSchoolData({ ...schoolData, academicYear: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Minimum Passing Percentage (%)</label>
                <input
                  type="number"
                  value={schoolData.passingPercentage}
                  onChange={(e) => setSchoolData({ ...schoolData, passingPercentage: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Grading Scale System</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                  <option>Cambridge Standard (A*, A, B, C, D, E, U)</option>
                  <option>Federal Board FBISE (A+, A, B, C, D, F)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'finance' && (
          <div className="space-y-4 max-w-2xl text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Base Currency</label>
              <input
                type="text"
                disabled
                value={schoolData.currency}
                className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg font-mono text-slate-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Monthly Due Date (Day of Month)</label>
                <input
                  type="number"
                  value={schoolData.dueDateDay}
                  onChange={(e) => setSchoolData({ ...schoolData, dueDateDay: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Late Payment Surcharge Fine (PKR)</label>
                <input
                  type="number"
                  value={schoolData.lateFee}
                  onChange={(e) => setSchoolData({ ...schoolData, lateFee: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'roles' && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-blue-900">
              <span className="font-semibold">Role-Based Access Control (RBAC):</span> Access rights are strictly enforced based on authenticated role credentials.
            </div>

            <table className="w-full text-left border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Role Profile</th>
                  <th className="py-2.5 px-4">Student Records</th>
                  <th className="py-2.5 px-4">Teachers & Staff</th>
                  <th className="py-2.5 px-4">Fee Ledgers</th>
                  <th className="py-2.5 px-4">Academics & Marks</th>
                  <th className="py-2.5 px-4">System Settings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {rolePermissions.map((rp) => (
                  <tr key={rp.role} className="hover:bg-slate-50">
                    <td className="py-2 px-4 font-sans font-bold text-slate-900">{rp.role}</td>
                    <td className="py-2 px-4 text-slate-700">{rp.students}</td>
                    <td className="py-2 px-4 text-slate-700">{rp.teachers}</td>
                    <td className="py-2 px-4 text-slate-700">{rp.finances}</td>
                    <td className="py-2 px-4 text-slate-700">{rp.academics}</td>
                    <td className="py-2 px-4 text-slate-700">{rp.system}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

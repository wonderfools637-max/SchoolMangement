import React, { useState } from 'react';
import { Megaphone, Calendar, User, Plus, Filter, AlertTriangle } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { Announcement } from '../types';

export const AnnouncementsPage: React.FC = () => {
  const { announcements, addAnnouncement, showToast } = useSchool();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    audience: 'All Students' as any,
    category: 'General' as any,
    priority: 'Normal' as 'Normal' | 'High',
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    addAnnouncement({
      title: formData.title,
      message: formData.message,
      audience: formData.audience,
      category: formData.category,
      priority: formData.priority,
      date: new Date().toISOString().split('T')[0],
      author: 'Principal Executive Secretariat',
    });

    setIsCreateOpen(false);
    setFormData({
      title: '',
      message: '',
      audience: 'All Students',
      category: 'General',
      priority: 'Normal',
    });
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Institutional Notice Board</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Official executive circulars, exam datesheets, and urgent alerts
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Post Announcement</span>
        </button>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className={`p-5 rounded-2xl border transition-all ${
              ann.priority === 'High'
                ? 'bg-amber-50/40 border-amber-300'
                : 'bg-white border-slate-200'
            } shadow-xs hover:border-slate-300`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    ann.priority === 'High'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {ann.category}
                </span>
                <span className="text-xs font-mono font-medium text-slate-500">
                  Target: <strong className="text-slate-700">{ann.audience}</strong>
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {ann.date}
                </span>
                <span aria-hidden="true">·</span>
                <span>{ann.author}</span>
              </div>
            </div>

            <h3 className="text-base font-bold text-slate-900 mt-1">{ann.title}</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">{ann.message}</p>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900">Post New Institutional Notice</h2>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Winter Break Schedule Notification"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Audience</label>
                  <select
                    value={formData.audience}
                    onChange={(e) => setFormData({ ...formData, audience: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="All Students">All Students</option>
                    <option value="Teachers">Faculty & Staff</option>
                    <option value="Parents">Parents Only</option>
                    <option value="All Institute">Entire Campus</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="Academic">Academic</option>
                    <option value="General">General</option>
                    <option value="Finance">Finance</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Urgent">Urgent Alert</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Notice Content</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detailed circular copy..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 font-medium text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-2xs"
                >
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

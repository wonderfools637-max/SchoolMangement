import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  User,
  Shield,
  Settings as SettingsIcon,
  LogOut,
  ExternalLink,
  GraduationCap,
  Calendar,
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { SCHOOL_INFO } from '../../data/mockData';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setMobileSidebarOpen,
    sidebarCollapsed,
    userRole,
    setUserRole,
    setIsGlobalSearchOpen,
    announcements,
    showToast,
  } = useSchool();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [messagesDropdownOpen, setMessagesDropdownOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const msgRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationDropdownOpen(false);
      }
      if (msgRef.current && !msgRef.current.contains(event.target as Node)) {
        setMessagesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format active tab title
  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard':
        return 'Executive Overview';
      case 'students':
        return 'Student Directory';
      case 'teachers':
        return 'Faculty & Instructors';
      case 'parents':
        return 'Parent & Guardian Portal';
      case 'classes':
        return 'Classrooms & Sections';
      case 'subjects':
        return 'Curriculum & Subjects';
      case 'attendance':
        return 'Daily Attendance Register';
      case 'exams':
        return 'Examinations & Scheduling';
      case 'results':
        return 'Grades & Academic Transcripts';
      case 'timetable':
        return 'Master Academic Timetable';
      case 'homework':
        return 'Assignments & Coursework';
      case 'fees':
        return 'Student Billing & Ledger';
      case 'payments':
        return 'Payment Transactions';
      case 'expenses':
        return 'Campus Operating Expenses';
      case 'financial-reports':
        return 'Revenue & Recovery Analysis';
      case 'messages':
        return 'Faculty & Parent Messaging';
      case 'notifications':
        return 'System Notifications';
      case 'announcements':
        return 'Institutional Notice Board';
      case 'student-reports':
      case 'attendance-reports':
      case 'result-reports':
      case 'fee-reports':
        return 'Institutional Analytics & Reports';
      case 'settings':
        return 'System Configuration';
      case 'user-management':
        return 'User Accounts & Access';
      case 'roles':
        return 'Roles & Security Policies';
      default:
        return 'School Management';
    }
  };

  const getBreadcrumb = (tab: string) => {
    if (['dashboard'].includes(tab)) return 'Main';
    if (['students', 'teachers', 'parents', 'classes', 'subjects'].includes(tab)) return 'Directory';
    if (['attendance', 'exams', 'results', 'timetable', 'homework'].includes(tab)) return 'Academics';
    if (['fees', 'payments', 'expenses', 'financial-reports'].includes(tab)) return 'Finance Directorate';
    if (['messages', 'notifications', 'announcements'].includes(tab)) return 'Communications';
    if (['student-reports', 'attendance-reports', 'result-reports', 'fee-reports'].includes(tab)) return 'Reports';
    return 'Settings';
  };

  const rolesList: UserRole[] = ['Super Admin', 'Principal', 'Teacher', 'Accountant', 'Receptionist'];

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    setProfileDropdownOpen(false);
    showToast(`Switched active view to role: ${role}`, 'info');
  };

  return (
    <header
      className={`h-16 bg-white border-b border-slate-200 sticky top-0 z-20 transition-all duration-200 ${
        sidebarCollapsed ? 'lg:pl-18' : 'lg:pl-64'
      }`}
    >
      <div className="h-full px-4 lg:px-8 flex items-center justify-between gap-4">
        {/* Left Zone: Mobile toggle, breadcrumb, title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span>{SCHOOL_INFO.name.split(' ')[0]} Campus</span>
              <span aria-hidden="true" className="text-slate-300">/</span>
              <span>{getBreadcrumb(activeTab)}</span>
            </div>
            <h1 className="text-sm lg:text-base font-semibold text-slate-900 truncate tracking-tight">
              {getTabTitle(activeTab)}
            </h1>
          </div>
        </div>

        {/* Right Zone: Search, quick notifications, profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Search Button / Keyboard Trigger */}
          <button
            onClick={() => setIsGlobalSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-100/80 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-lg text-xs font-medium transition-colors border border-transparent hover:border-slate-200"
            title="Search students, invoices, teachers (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search records...</span>
            <kbd className="hidden md:inline-flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.5 bg-white text-slate-500 rounded border border-slate-200 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Academic Session badge (unboxed text per anti-slop guidelines) */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-500 font-medium pl-2 pr-3 py-1 border-r border-slate-200">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Session: <strong className="text-slate-700 font-semibold">{SCHOOL_INFO.academicYear}</strong></span>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title="Notifications"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
            </button>

            {notificationDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 text-left animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800">Recent Notifications</span>
                  <span className="text-[11px] text-blue-600 font-medium hover:underline cursor-pointer" onClick={() => { setActiveTab('announcements'); setNotificationDropdownOpen(false); }}>
                    View all notices
                  </span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {announcements.slice(0, 3).map((ann) => (
                    <div
                      key={ann.id}
                      onClick={() => { setActiveTab('announcements'); setNotificationDropdownOpen(false); }}
                      className="p-3 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span className="font-semibold text-blue-700">{ann.category}</span>
                        <span>{ann.date}</span>
                      </div>
                      <p className="text-xs font-medium text-slate-800 line-clamp-1">{ann.title}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{ann.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Messages Dropdown */}
          <div className="relative" ref={msgRef}>
            <button
              onClick={() => setMessagesDropdownOpen(!messagesDropdownOpen)}
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title="Messages"
              aria-label="View messages"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-600 rounded-full ring-2 ring-white" />
            </button>

            {messagesDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 text-left animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800">Staff Communications</span>
                  <span className="text-[10px] text-slate-400 font-mono">2 unread</span>
                </div>
                <div className="p-3 hover:bg-slate-50 cursor-pointer" onClick={() => { setActiveTab('messages'); setMessagesDropdownOpen(false); }}>
                  <p className="text-xs font-medium text-slate-900">Dr. Nadia Kausar (HOD Physics)</p>
                  <p className="text-[11px] text-slate-500 truncate">Grade 10 Lab practical syllabus completed...</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">15 mins ago</span>
                </div>
                <div className="p-3 hover:bg-slate-50 cursor-pointer border-t border-slate-100" onClick={() => { setActiveTab('messages'); setMessagesDropdownOpen(false); }}>
                  <p className="text-xs font-medium text-slate-900">Accounts Desk</p>
                  <p className="text-[11px] text-slate-500 truncate">October 2026 fee reconciliation batch ready.</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Role Switcher */}
          <div className="relative pl-1 border-l border-slate-200" ref={profileRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              aria-expanded={profileDropdownOpen}
              aria-haspopup="true"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 ring-1 ring-slate-300 shrink-0">
                <img
                  src={SCHOOL_INFO.directorAvatar}
                  alt={SCHOOL_INFO.principal}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="hidden md:flex flex-col text-left leading-tight">
                <span className="text-xs font-semibold text-slate-900 truncate max-w-[130px]">
                  {SCHOOL_INFO.principal.split(',')[0]}
                </span>
                <span className="text-[11px] text-blue-600 font-medium">
                  {userRole}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Profile Menu Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-left animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-900">{SCHOOL_INFO.principal}</p>
                  <p className="text-[11px] text-slate-500 truncate">{SCHOOL_INFO.email}</p>
                  <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                    <Shield className="w-3 h-3 text-emerald-600" /> Active Role: <strong className="text-slate-700">{userRole}</strong>
                  </div>
                </div>

                {/* Switch Role Simulator */}
                <div className="py-1 px-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block px-1 py-1">
                    Simulate Role View
                  </span>
                  <div className="space-y-0.5">
                    {rolesList.map((r) => (
                      <button
                        key={r}
                        onClick={() => handleRoleChange(r)}
                        className={`w-full text-left px-2 py-1 text-xs rounded-md transition-colors flex items-center justify-between ${
                          userRole === r ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span>{r}</span>
                        {userRole === r && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-1 mt-1">
                  <button
                    onClick={() => { setActiveTab('settings'); setProfileDropdownOpen(false); }}
                    className="w-full text-left px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                  >
                    <SettingsIcon className="w-3.5 h-3.5 text-slate-400" /> System Settings
                  </button>
                  <button
                    onClick={() => {
                      showToast('Logged out of demo session.', 'info');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-1.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

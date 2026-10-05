import React from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  UserCheck,
  Layers,
  BookOpen,
  CalendarCheck,
  FileSpreadsheet,
  Award,
  Clock,
  CheckSquare,
  CreditCard,
  Receipt,
  Wallet,
  TrendingUp,
  MessageSquare,
  Bell,
  Megaphone,
  BarChart3,
  CalendarDays,
  FileText,
  PieChart,
  Settings,
  ShieldAlert,
  KeyRound,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { SCHOOL_INFO } from '../../data/mockData';

interface NavSection {
  title: string;
  items: {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'students', label: 'Students', icon: GraduationCap },
      { id: 'teachers', label: 'Teachers', icon: Users },
      { id: 'parents', label: 'Parents', icon: UserCheck },
      { id: 'classes', label: 'Classes', icon: Layers },
      { id: 'subjects', label: 'Subjects', icon: BookOpen },
    ],
  },
  {
    title: 'Academic',
    items: [
      { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
      { id: 'exams', label: 'Exams', icon: FileSpreadsheet },
      { id: 'results', label: 'Results', icon: Award },
      { id: 'timetable', label: 'Timetable', icon: Clock },
      { id: 'homework', label: 'Homework', icon: CheckSquare, badge: '4' },
    ],
  },
  {
    title: 'Finance',
    items: [
      { id: 'fees', label: 'Fees & Invoices', icon: CreditCard },
      { id: 'payments', label: 'Fee Payments', icon: Receipt },
      { id: 'expenses', label: 'Campus Expenses', icon: Wallet },
      { id: 'financial-reports', label: 'Financial Reports', icon: TrendingUp },
    ],
  },
  {
    title: 'Communication',
    items: [
      { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '2' },
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'announcements', label: 'Announcements', icon: Megaphone },
    ],
  },
  {
    title: 'Reports',
    items: [
      { id: 'student-reports', label: 'Student Reports', icon: BarChart3 },
      { id: 'attendance-reports', label: 'Attendance Reports', icon: CalendarDays },
      { id: 'result-reports', label: 'Result Reports', icon: FileText },
      { id: 'fee-reports', label: 'Fee Reports', icon: PieChart },
    ],
  },
  {
    title: 'System',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings },
      { id: 'user-management', label: 'User Management', icon: ShieldAlert },
      { id: 'roles', label: 'Roles & Permissions', icon: KeyRound },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    showToast,
  } = useSchool();

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileSidebarOpen(false);
  };

  const handleHelp = () => {
    showToast('NexusEdu Helpdesk: Enterprise SLA Support active for Apex Academy.', 'info');
  };

  const handleLogout = () => {
    showToast('Session lock triggered. In demo environment, admin session persists.', 'info');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white text-slate-800 border-r border-slate-200 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-200 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
            <img
              src={SCHOOL_INFO.crestLogo}
              alt="School Crest"
              className="w-8 h-8 object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // styled fallback container
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-base font-bold tracking-tight text-slate-900 truncate">
                Nexus<span className="text-blue-600">Edu</span> ERP
              </span>
              <span className="text-[11px] text-slate-500 font-medium truncate">
                Apex Cambridge College
              </span>
            </div>
          )}
        </div>

        {/* Desktop Collapse Button */}
        <button
          onClick={() => setSidebarCollapsed((prev: boolean) => !prev)}
          className="hidden lg:flex items-center justify-center w-7 h-7 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label="Toggle sidebar"
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Mobile Close Button */}
        <button
          onClick={() => setMobileSidebarOpen(false)}
          className="lg:hidden flex items-center justify-center w-8 h-8 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="space-y-1">
            {!sidebarCollapsed && (
              <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {section.title}
              </div>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    title={sidebarCollapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-150 relative group ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-blue-600 rounded-r-full" />
                    )}
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    {!sidebarCollapsed && (
                      <span className="truncate flex-1 text-left">{item.label}</span>
                    )}
                    {!sidebarCollapsed && item.badge && (
                      <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Footer Area */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50 space-y-1 shrink-0">
        <button
          onClick={handleHelp}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-colors"
          title="Help & Support"
        >
          <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
          {!sidebarCollapsed && <span className="truncate">Help & Knowledge Base</span>}
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut className="w-4 h-4 text-rose-500 shrink-0" />
          {!sidebarCollapsed && <span className="truncate">Sign Out</span>}
        </button>

        {!sidebarCollapsed && (
          <div className="pt-2 px-3 text-[10px] text-slate-400 border-t border-slate-200/60 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> v4.2 Enterprise
            </span>
            <span className="font-mono">PKR Edition</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar (Strictly WHITE background) */}
      <aside
        className={`hidden lg:block fixed inset-y-0 left-0 z-30 transition-all duration-200 ease-in-out ${
          sidebarCollapsed ? 'w-18' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer (Strictly WHITE background) */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] transform transition-transform duration-200 ease-in-out ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

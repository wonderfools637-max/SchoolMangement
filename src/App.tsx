import React from 'react';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { ToastContainer } from './components/common/ToastContainer';

// Modals
import { AddStudentModal } from './components/students/AddStudentModal';
import { StudentProfileModal } from './components/students/StudentProfileModal';
import { AddTeacherModal } from './components/teachers/AddTeacherModal';
import { TeacherProfileModal } from './components/teachers/TeacherProfileModal';
import { FeeCollectModal } from './components/fees/FeeCollectModal';
import { FeeReceiptModal } from './components/fees/FeeReceiptModal';
import { ResultCardModal } from './components/results/ResultCardModal';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { StudentsPage } from './pages/StudentsPage';
import { TeachersPage } from './pages/TeachersPage';
import { ParentsPage } from './pages/ParentsPage';
import { ClassesPage } from './pages/ClassesPage';
import { AttendancePage } from './pages/AttendancePage';
import { ExamsPage } from './pages/ExamsPage';
import { FeesPage } from './pages/FeesPage';
import { TimetablePage } from './pages/TimetablePage';
import { HomeworkPage } from './pages/HomeworkPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const { activeTab, sidebarCollapsed } = useSchool();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'students':
        return <StudentsPage />;
      case 'teachers':
        return <TeachersPage />;
      case 'parents':
        return <ParentsPage />;
      case 'classes':
      case 'subjects':
        return <ClassesPage />;
      case 'attendance':
        return <AttendancePage />;
      case 'exams':
      case 'results':
        return <ExamsPage />;
      case 'fees':
      case 'payments':
      case 'expenses':
      case 'financial-reports':
        return <FeesPage />;
      case 'timetable':
        return <TimetablePage />;
      case 'homework':
        return <HomeworkPage />;
      case 'messages':
      case 'notifications':
      case 'announcements':
        return <AnnouncementsPage />;
      case 'student-reports':
      case 'attendance-reports':
      case 'result-reports':
      case 'fee-reports':
        return <ReportsPage />;
      case 'settings':
      case 'user-management':
      case 'roles':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* 1. Strictly White Left Sidebar */}
      <Sidebar />

      {/* 2. Top Navigation Header */}
      <Header />

      {/* 3. Main Content Viewport */}
      <main
        className={`flex-1 transition-all duration-200 ${
          sidebarCollapsed ? 'lg:pl-18' : 'lg:pl-64'
        }`}
      >
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {renderActiveView()}
        </div>
      </main>

      {/* 4. Global Modals & Overlays */}
      <GlobalSearchModal />
      <AddStudentModal />
      <StudentProfileModal />
      <AddTeacherModal />
      <TeacherProfileModal />
      <FeeCollectModal />
      <FeeReceiptModal />
      <ResultCardModal />

      {/* 5. Notification Toast System */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <SchoolProvider>
      <AppContent />
    </SchoolProvider>
  );
}

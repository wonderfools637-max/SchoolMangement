import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  Student,
  Teacher,
  Parent,
  ClassItem,
  SubjectItem,
  FeeInvoice,
  Exam,
  StudentResult,
  HomeworkItem,
  Announcement,
  UserRole,
} from '../types';
import {
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_PARENTS,
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_INVOICES,
  INITIAL_EXAMS,
  INITIAL_RESULTS,
  INITIAL_HOMEWORK,
  INITIAL_ANNOUNCEMENTS,
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface SchoolContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;

  // Data
  students: Student[];
  teachers: Teacher[];
  parents: Parent[];
  classes: ClassItem[];
  subjects: SubjectItem[];
  invoices: FeeInvoice[];
  exams: Exam[];
  results: StudentResult[];
  homeworks: HomeworkItem[];
  announcements: Announcement[];

  // Mutators
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (id: string) => void;

  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (teacher: Teacher) => void;
  deleteTeacher: (id: string) => void;

  recordFeePayment: (
    invoiceId: string,
    paidAmount: number,
    paymentMethod: 'Cash' | 'Bank Transfer' | 'Card' | 'Online 1Link'
  ) => void;

  addResult: (result: Omit<StudentResult, 'id'>) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;

  // Modals & Active Selections
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student | null) => void;
  isStudentProfileOpen: boolean;
  setIsStudentProfileOpen: (open: boolean) => void;
  isAddStudentOpen: boolean;
  setIsAddStudentOpen: (open: boolean) => void;

  selectedTeacher: Teacher | null;
  setSelectedTeacher: (teacher: Teacher | null) => void;
  isTeacherProfileOpen: boolean;
  setIsTeacherProfileOpen: (open: boolean) => void;
  isAddTeacherOpen: boolean;
  setIsAddTeacherOpen: (open: boolean) => void;

  selectedInvoice: FeeInvoice | null;
  setSelectedInvoice: (invoice: FeeInvoice | null) => void;
  isCollectFeeOpen: boolean;
  setIsCollectFeeOpen: (open: boolean) => void;
  isFeeReceiptOpen: boolean;
  setIsFeeReceiptOpen: (open: boolean) => void;

  selectedResult: StudentResult | null;
  setSelectedResult: (result: StudentResult | null) => void;
  isResultCardOpen: boolean;
  setIsResultCardOpen: (open: boolean) => void;

  isGlobalSearchOpen: boolean;
  setIsGlobalSearchOpen: (open: boolean) => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;

  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('Super Admin');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Core Data
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [parents, setParents] = useState<Parent[]>(INITIAL_PARENTS);
  const [classes, setClasses] = useState<ClassItem[]>(INITIAL_CLASSES);
  const [subjects, setSubjects] = useState<SubjectItem[]>(INITIAL_SUBJECTS);
  const [invoices, setInvoices] = useState<FeeInvoice[]>(INITIAL_INVOICES);
  const [exams, setExams] = useState<Exam[]>(INITIAL_EXAMS);
  const [results, setResults] = useState<StudentResult[]>(INITIAL_RESULTS);
  const [homeworks, setHomeworks] = useState<HomeworkItem[]>(INITIAL_HOMEWORK);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);

  // Modals & Selected Objects
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isStudentProfileOpen, setIsStudentProfileOpen] = useState<boolean>(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState<boolean>(false);

  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isTeacherProfileOpen, setIsTeacherProfileOpen] = useState<boolean>(false);
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState<boolean>(false);

  const [selectedInvoice, setSelectedInvoice] = useState<FeeInvoice | null>(null);
  const [isCollectFeeOpen, setIsCollectFeeOpen] = useState<boolean>(false);
  const [isFeeReceiptOpen, setIsFeeReceiptOpen] = useState<boolean>(false);

  const [selectedResult, setSelectedResult] = useState<StudentResult | null>(null);
  const [isResultCardOpen, setIsResultCardOpen] = useState<boolean>(false);

  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState<boolean>(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Student Actions
  const addStudent = (newStudentData: Omit<Student, 'id'>) => {
    const newId = `STU-${1000 + students.length + 1}`;
    const newStudent: Student = { ...newStudentData, id: newId };
    setStudents((prev) => [newStudent, ...prev]);
    showToast(`Student ${newStudent.name} admitted successfully!`, 'success');
  };

  const updateStudent = (updatedStudent: Student) => {
    setStudents((prev) => prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)));
    showToast(`Student record for ${updatedStudent.name} updated.`, 'info');
  };

  const deleteStudent = (id: string) => {
    const student = students.find((s) => s.id === id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
    showToast(`Student record removed: ${student?.name || id}`, 'warning');
  };

  // Teacher Actions
  const addTeacher = (newTeacherData: Omit<Teacher, 'id'>) => {
    const newId = `TCH-${200 + teachers.length + 1}`;
    const newTeacher: Teacher = { ...newTeacherData, id: newId };
    setTeachers((prev) => [newTeacher, ...prev]);
    showToast(`Faculty member ${newTeacher.name} onboarded successfully!`, 'success');
  };

  const updateTeacher = (updatedTeacher: Teacher) => {
    setTeachers((prev) => prev.map((t) => (t.id === updatedTeacher.id ? updatedTeacher : t)));
    showToast(`Faculty record for ${updatedTeacher.name} updated.`, 'info');
  };

  const deleteTeacher = (id: string) => {
    const teacher = teachers.find((t) => t.id === id);
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    showToast(`Faculty record removed: ${teacher?.name || id}`, 'warning');
  };

  // Fee Collection Actions
  const recordFeePayment = (
    invoiceId: string,
    paidAmount: number,
    paymentMethod: 'Cash' | 'Bank Transfer' | 'Card' | 'Online 1Link'
  ) => {
    const receiptNo = `RCT-${Math.floor(10000 + Math.random() * 90000)}`;
    const today = new Date().toISOString().split('T')[0];

    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          const totalPaid = inv.paidAmount + paidAmount;
          const due = Math.max(0, inv.totalAmount - totalPaid);
          const status = due === 0 ? 'Paid' : 'Partial';
          const updated = {
            ...inv,
            paidAmount: totalPaid,
            dueAmount: due,
            status: status as 'Paid' | 'Partial',
            paymentDate: today,
            paymentMethod,
            receiptNo,
          };
          // Also set as selected invoice for immediate receipt preview option
          setSelectedInvoice(updated);
          return updated;
        }
        return inv;
      })
    );

    showToast(`Payment of PKR ${paidAmount.toLocaleString()} recorded. Receipt #${receiptNo} generated!`, 'success');
  };

  // Result Actions
  const addResult = (newResultData: Omit<StudentResult, 'id'>) => {
    const newId = `RES-${100 + results.length + 1}`;
    const newResult: StudentResult = { ...newResultData, id: newId };
    setResults((prev) => [newResult, ...prev]);
    showToast(`Result published for ${newResult.studentName}!`, 'success');
  };

  // Announcement Actions
  const addAnnouncement = (newAnnData: Omit<Announcement, 'id'>) => {
    const newId = `ANN-${10 + announcements.length + 1}`;
    const newAnn: Announcement = { ...newAnnData, id: newId };
    setAnnouncements((prev) => [newAnn, ...prev]);
    showToast(`Announcement "${newAnn.title}" dispatched to ${newAnn.audience}!`, 'success');
  };

  const value = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      userRole,
      setUserRole,
      sidebarCollapsed,
      setSidebarCollapsed,
      mobileSidebarOpen,
      setMobileSidebarOpen,
      students,
      teachers,
      parents,
      classes,
      subjects,
      invoices,
      exams,
      results,
      homeworks,
      announcements,
      addStudent,
      updateStudent,
      deleteStudent,
      addTeacher,
      updateTeacher,
      deleteTeacher,
      recordFeePayment,
      addResult,
      addAnnouncement,
      selectedStudent,
      setSelectedStudent,
      isStudentProfileOpen,
      setIsStudentProfileOpen,
      isAddStudentOpen,
      setIsAddStudentOpen,
      selectedTeacher,
      setSelectedTeacher,
      isTeacherProfileOpen,
      setIsTeacherProfileOpen,
      isAddTeacherOpen,
      setIsAddTeacherOpen,
      selectedInvoice,
      setSelectedInvoice,
      isCollectFeeOpen,
      setIsCollectFeeOpen,
      isFeeReceiptOpen,
      setIsFeeReceiptOpen,
      selectedResult,
      setSelectedResult,
      isResultCardOpen,
      setIsResultCardOpen,
      isGlobalSearchOpen,
      setIsGlobalSearchOpen,
      globalSearchQuery,
      setGlobalSearchQuery,
      toasts,
      showToast,
      removeToast,
    }),
    [
      activeTab,
      userRole,
      sidebarCollapsed,
      mobileSidebarOpen,
      students,
      teachers,
      parents,
      classes,
      subjects,
      invoices,
      exams,
      results,
      homeworks,
      announcements,
      selectedStudent,
      isStudentProfileOpen,
      isAddStudentOpen,
      selectedTeacher,
      isTeacherProfileOpen,
      isAddTeacherOpen,
      selectedInvoice,
      isCollectFeeOpen,
      isFeeReceiptOpen,
      selectedResult,
      isResultCardOpen,
      isGlobalSearchOpen,
      globalSearchQuery,
      toasts,
    ]
  );

  return <SchoolContext.Provider value={value}>{children}</SchoolContext.Provider>;
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};

export type UserRole = 'Super Admin' | 'Principal' | 'Teacher' | 'Accountant' | 'Receptionist';

export interface Student {
  id: string;
  admissionNo: string;
  name: string;
  avatar: string;
  class: string;
  section: string;
  rollNo: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  bloodGroup: string;
  religion: string;
  nationality: string;
  admissionDate: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  address: string;
  emergencyContact: string;
  emergencyRelation: string;
  emergencyPhone: string;
  attendanceRate: number; // e.g. 96
  feeStatus: 'Paid' | 'Pending' | 'Overdue' | 'Partial';
  status: 'Active' | 'Inactive' | 'Suspended';
}

export interface Teacher {
  id: string;
  teacherId: string;
  name: string;
  avatar: string;
  subject: string;
  department: string;
  qualification: string;
  assignedClasses: string[];
  phone: string;
  email: string;
  joiningDate: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  salary: number; // PKR
  attendanceRate: number;
}

export interface Parent {
  id: string;
  name: string;
  relation: string;
  phone: string;
  email: string;
  occupation: string;
  address: string;
  students: {
    name: string;
    studentId: string;
    class: string;
    feeStatus: 'Paid' | 'Pending' | 'Overdue';
  }[];
  status: 'Active' | 'Inactive';
}

export interface ClassItem {
  id: string;
  name: string;
  section: string;
  classTeacher: string;
  teacherId: string;
  room: string;
  studentCount: number;
  capacity: number;
  schedule: string;
}

export interface SubjectItem {
  id: string;
  name: string;
  code: string;
  class: string;
  teacher: string;
  weeklyHours: number;
  status: 'Active' | 'Inactive';
}

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  rollNo: string;
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
  timeIn?: string;
  remarks?: string;
}

export interface Exam {
  id: string;
  title: string;
  term: 'Midterm Examination' | 'Final Term 2026' | 'Monthly Assessment';
  class: string;
  subject: string;
  date: string;
  startTime: string;
  duration: string;
  totalMarks: number;
  passingMarks: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Published';
}

export interface StudentResult {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  class: string;
  section: string;
  examTitle: string;
  subjects: {
    subject: string;
    totalMarks: number;
    obtainedMarks: number;
    grade: string;
    remarks: string;
  }[];
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  overallGrade: string;
  position: string;
  status: 'Passed' | 'Failed';
  teacherRemarks: string;
  principalRemarks: string;
}

export interface FeeInvoice {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  class: string;
  section: string;
  month: string;
  issueDate: string;
  dueDate: string;
  tuitionFee: number;
  transportFee: number;
  examFee: number;
  otherCharges: number;
  discount: number;
  fine: number;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Partial';
  paymentDate?: string;
  paymentMethod?: 'Cash' | 'Bank Transfer' | 'Card' | 'Online 1Link';
  receiptNo?: string;
}

export interface TimetableSlot {
  time: string;
  monday?: { subject: string; teacher: string; room: string; color: string };
  tuesday?: { subject: string; teacher: string; room: string; color: string };
  wednesday?: { subject: string; teacher: string; room: string; color: string };
  thursday?: { subject: string; teacher: string; room: string; color: string };
  friday?: { subject: string; teacher: string; room: string; color: string };
  saturday?: { subject: string; teacher: string; room: string; color: string };
}

export interface HomeworkItem {
  id: string;
  class: string;
  section: string;
  subject: string;
  teacher: string;
  title: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  status: 'Active' | 'Submissions Open' | 'Closed';
  submissionsCount: number;
  totalStudents: number;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  audience: 'All Students' | 'Teachers' | 'Parents' | 'Grade 10' | 'All Institute';
  category: 'General' | 'Academic' | 'Holiday' | 'Urgent' | 'Finance';
  date: string;
  author: string;
  priority: 'High' | 'Normal';
}

export interface ActivityItem {
  id: string;
  type: 'student' | 'teacher' | 'fee' | 'result' | 'attendance' | 'announcement';
  title: string;
  description: string;
  timestamp: string;
  badge?: string;
}

export interface TodayScheduleItem {
  id: string;
  subject: string;
  class: string;
  teacher: string;
  room: string;
  time: string;
  status: 'In Progress' | 'Upcoming' | 'Completed';
}

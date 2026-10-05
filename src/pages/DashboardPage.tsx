import React from 'react';
import { WelcomeBanner } from '../components/dashboard/WelcomeBanner';
import { StatCards } from '../components/dashboard/StatCards';
import { AnalyticsCharts } from '../components/dashboard/AnalyticsCharts';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { TodaySchedule } from '../components/dashboard/TodaySchedule';
import { UpcomingExams } from '../components/dashboard/UpcomingExams';
import { QuickActions } from '../components/dashboard/QuickActions';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* 1. Welcome Banner */}
      <WelcomeBanner />

      {/* 2. Top Statistic Cards */}
      <StatCards />

      {/* 3. Quick Actions Bar */}
      <QuickActions />

      {/* 4. Analytics & Charts */}
      <AnalyticsCharts />

      {/* 5. Live Operations Triad (Today's Schedule, Live Activity, Upcoming Exams) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <TodaySchedule />
        <RecentActivity />
        <UpcomingExams />
      </div>
    </div>
  );
};

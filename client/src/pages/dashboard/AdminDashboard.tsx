import ActiveProject from "@/components/dashboard/ActiveProject";
import AppIntegration from "@/components/dashboard/AppIntegration";
import AssignIssue from "@/components/dashboard/AssignIssue";
import BudjectUtilization from "@/components/dashboard/BudjectUtilization";
import BugOverview from "@/components/dashboard/BugOverview";
import EmergenceIssue from "@/components/dashboard/EmergenceIssue";
import IssuesAnalysis from "@/components/dashboard/IssuesAnalysis";
import MySchedule from "@/components/dashboard/MySchedule";
import { PriorityBreakdown } from "@/components/dashboard/PriorityBreakdown";
import RecentCommand from "@/components/dashboard/RecentCommand";
import RoleDistribution from "@/components/dashboard/RoleDistribution";
import StatsCard from "@/components/dashboard/StatsCard";
import TotalResource from "@/components/dashboard/TotalResource";
import TypeOfWork from "@/components/dashboard/TypeOfWork";

const AdminDashboard = () => {

    const statsCardDetails = [
        {
            name: 'Total Projects',
            value: 4,
            subtitle: 'Assigned to me'
        },
        {
            name: 'Assigned Issues',
            value: 44,
            subtitle: 'Issues accross all projects'
        },
        {
            name: 'In progress',
            value: 32,
            subtitle: 'Currently being worked on'
        },
        {
            name: 'Over Due Issues',
            value: 5,
            subtitle: 'Pending Beyond Deadline'
        },
        {
            name: 'Completion Rate',
            value: '41 of 143',
            subtitle: 'Issue completed'
        }
    ];
    return (
        <div className="flex flex-col gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 w-full h-full p-1 xs:p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 overflow-y-scroll ">
            {/* Stats Cards Section - Fully Responsive */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 w-full">
                {
                    statsCardDetails?.map((statsCardDetail, index) => (
                        <StatsCard
                            key={index}
                            title={statsCardDetail.name || 'Unknown'}
                            subtitle={statsCardDetail.subtitle || null}
                            value={statsCardDetail.value as number}
                        />
                    ))
                }
            </div>

            {/* Main Content Section - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-7 xl:grid-cols-7 2xl:grid-cols-7 gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7">
                {/* Active Project - Responsive Column Span */}
                <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                    <ActiveProject />
                </div>

                {/* Total Resource - Responsive Column Span */}
                <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-2">
                    <TotalResource />
                </div>

                {/* Budget Utilization - Responsive Column Span */}
                <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-2">
                    <BudjectUtilization />
                </div>
            </div>
            <div className="grid grid-cols-7 gap-7">
                <div className="col-span-2">
                    <TypeOfWork />
                </div>
                <div className="col-span-2">
                    <PriorityBreakdown />
                </div>
                <div className="col-span-3">
                    <EmergenceIssue />
                </div>
            </div>
            <div className="grid grid-cols-8 gap-7">
                <div className="col-span-5">
                    <IssuesAnalysis/>
                </div>
                <div className="col-span-3">
                    <RecentCommand/>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 flex flex-col h-full">
          <MySchedule className="h-full" />
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4 h-full">
          <BugOverview className="h-full"/>
          <AppIntegration className="flex-1" />
        </div>
      </div>
      <div className="flex">
          <AssignIssue />
      </div>
        </div>
    )
}

export default AdminDashboard
import ActiveProject from "@/components/dashboard/ActiveProject";
import StatsCard from "@/components/dashboard/StatsCard";
import TotalResource from "@/components/dashboard/TotalResource";

const AdminDashboard = () => {

    const statsCardDetails=[
        {
            name:'Total Projects',
            value:4,
            subtitle:'Assigned to me'
        },
        {
            name:'Assigned Issues',
            value:44,
            subtitle:'Issues accross all projects'
        },
        {
            name:'In progress',
            value:32,
            subtitle:'Currently being worked on'
        },
        {
            name:'Over Due Issues',
            value:5,
            subtitle:'Pending Beyond Deadline'
        },
        {
            name:'Completion Rate',
            value:'41 of 143',
            subtitle:'Issue completed'
        }
    ];
  return (
    <div className="flex flex-col gap-5 w-full h-full">
        {/* card Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-[23px] w-full">
            {
                statsCardDetails?.map((statsCardDetail)=>(
                    <StatsCard title={statsCardDetail.name ||'Unkown'} subtitle={statsCardDetail.subtitle || null} value={statsCardDetail.value as number}/>
                ))
            }
        </div>

        {/*Section 1  */}
        <div className="grid grid-cols-3 gap-5">
            <ActiveProject/>
            <TotalResource/>
        </div>
    </div>
  )
}

export default AdminDashboard
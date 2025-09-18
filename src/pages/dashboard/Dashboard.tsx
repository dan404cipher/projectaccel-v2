import AdminDashboard from "./AdminDashboard";
import MemberDashboard from "./MemberDashboard";

const Dashboard=()=>{

  const user={name:'Kamalesh',role:'Employee'};


  const renderDashboard = () => {
    switch (user.role) {
      case "admin":
        return <AdminDashboard/>;
      case "manager":
        return <h2>Welcome HR! You can manage employees and leave requests.</h2>;
      case "Employee":
        return <MemberDashboard/>
      default:
        return <h2>Welcome! Please select your dashboard.</h2>;
    }
  };


  return(
    <div className=" h-full flex flex-col font-roboto gap-3">
      {/* Welcome header */}
      <div className="flex flex-col">
        <div className="text-[#438197] text-2xl font-medium ">Welcome Back !!</div>
        <div className="text-[#666666] text-base font-medium">{user.name}</div>
      </div>
      <div className="w-full h-full">
        {renderDashboard()}
      </div>
    </div>
  )
}
export default Dashboard;
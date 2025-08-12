import { CustomTable } from "./CustomTable";

const AssignIssue = () => {
    return (
        <div className="w-full flex flex-col bg-white rounded-2xl shadow-sm">
            <div className="p-[1.5rem] flex flex-col">
                <div className="text-[20px] font-medium text-[#252525]">Assigned Issues</div>
                <span className="text-sm text-[#999999]">
                    Assigned issues of all projects
                </span>
            </div>
            <CustomTable selectable={true} draggable={true}/>
        </div>
    )
}

export default AssignIssue;
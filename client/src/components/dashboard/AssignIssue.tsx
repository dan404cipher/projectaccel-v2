import { CustomTable } from "./CustomTable";
const img2 = "/src/assets/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
const img3 = "/src/assets/icons/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png";
const img4 = "/src/assets/icons/27329e3b78d83b20619fddee55560c05c2cd1469.png";
const img5 = "/src/assets/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";
const img6 = "/src/assets/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";


const AssignIssue = () => {

    const columns = [
        {
            header: "Type",
            accessor: "type",
            sortable: true,
            render: (value) => (
                <div className="flex items-center gap-2">
                    <span className="bg-[#263238] w-6 h-6 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13.3346 5.33529H11.4613C11.1613 4.80195 10.748 4.33529 10.248 4.00195L11.3346 2.94195L10.3946 2.00195L8.94797 3.44862C8.32808 3.29819 7.68119 3.29819 7.0613 3.44862L5.60797 2.00195L4.66797 2.94195L5.74797 4.00195C5.24797 4.33529 4.8413 4.80862 4.5413 5.33529H2.66797V6.66862H4.0613C4.0213 6.88862 4.0013 7.10862 4.0013 7.33529V8.00195H2.66797V9.33529H4.0013V10.002C4.0013 10.2286 4.0213 10.4486 4.0613 10.6686H2.66797V12.002H4.5413C4.8042 12.4561 5.15403 12.8539 5.57078 13.1728C5.98753 13.4916 6.46303 13.7252 6.9701 13.8602C7.47718 13.9952 8.00589 14.0289 8.526 13.9594C9.04611 13.8899 9.54743 13.7186 10.0013 13.4553C10.608 13.1086 11.1146 12.602 11.4613 12.002H13.3346V10.6686H11.9413C11.9813 10.4486 12.0013 10.2286 12.0013 10.002V9.33529H13.3346V8.00195H12.0013V7.33529C12.0013 7.10862 11.9813 6.88862 11.9413 6.66862H13.3346V5.33529ZM10.668 10.002C10.668 10.7092 10.387 11.3875 9.88692 11.8876C9.38682 12.3877 8.70855 12.6686 8.0013 12.6686C7.29406 12.6686 6.61578 12.3877 6.11568 11.8876C5.61559 11.3875 5.33464 10.7092 5.33464 10.002V7.33529C5.33464 6.62804 5.61559 5.94977 6.11568 5.44967C6.61578 4.94957 7.29406 4.66862 8.0013 4.66862C8.70855 4.66862 9.38682 4.94957 9.88692 5.44967C10.387 5.94977 10.668 6.62804 10.668 7.33529V10.002ZM9.33464 6.66862V8.00195H6.66797V6.66862H9.33464ZM6.66797 9.33529H9.33464V10.6686H6.66797V9.33529Z" fill="white" />
                        </svg>
                    </span>
                    <span>{value}</span>
                </div>
            ),
        },
        {
            header: "Issue Title", accessor: "title", render: (value) => (
                <div className="w-[200px]">
                    {value}
                </div>
            )
        },
        {
            header: "Assign to",
            accessor: "assignees",
            sortable: true,
            render: (value, row) => (
                <div className="flex items-center ">
                    {value.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt="avatar"
                            className="w-6 h-6 rounded-full border-2 border-white -ml-2 first:ml-0"
                        />
                    ))}
                    <span className="ml-2 text-gray-500">{row.moreCount}+</span>
                </div>
            ),
        },
        {
            header: "Status",
            accessor: "status",
            sortable: true,
            render: (value) => (
                <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-sm">
                    {value}
                </span>
            ),
        },
        {
            header: "Priority",
            accessor: "priority",
            sortable: true,
            render: (value) => (
                <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-sm">
                    {value}
                </span>
            ),
        },
        {
            header: "Due date",
            sortable: true,
            accessor: "dueDate",
            render: (value) => <span className="text-red-500">{value}</span>,
        },
    ];
    
    const data = [
        {
            id: 1,
            type: "TA-117",
            title: "Publish blog page",
            assignees: [img2, img3, img4, img5, img6],
            moreCount: 24,
            status: "To-do",
            priority: "Low",
            dueDate: "Dec 5",
        },
        {
            id: 2,
            type: "TA-118",
            title: "Fix homepage bug",
            assignees: [img2, img3, img4],
            moreCount: 3,
            status: "In Progress",
            priority: "High",
            dueDate: "Dec 10",
        },
        {
            id: 2,
            type: "TA-118",
            title: "Fix homepage bug",
            assignees: [img2, img3, img4],
            moreCount: 3,
            status: "In Progress",
            priority: "High",
            dueDate: "Dec 10",
        },
        {
            id: 2,
            type: "TA-118",
            title: "Fix homepage bug",
            assignees: [img2, img3, img4],
            moreCount: 3,
            status: "In Progress",
            priority: "High",
            dueDate: "Dec 10",
        },
        {
            id: 2,
            type: "TA-118",
            title: "Fix homepage bug",
            assignees: [img2, img3, img4],
            moreCount: 3,
            status: "In Progress",
            priority: "High",
            dueDate: "Dec 10",
        },
        {
            id: 2,
            type: "TA-118",
            title: "Fix homepage bug",
            assignees: [img2, img3, img4],
            moreCount: 3,
            status: "In Progress",
            priority: "High",
            dueDate: "Dec 10",
        },
    
    ];
    return (
        <div className="w-full flex flex-col bg-white rounded-2xl shadow-sm">
            <div className="p-[1.5rem] flex flex-col">
                <div className="text-[20px] font-medium text-[#252525]">Assigned Issues</div>
                <span className="text-sm text-[#999999]">
                    Assigned issues of all projects
                </span>
            </div>
            <CustomTable selectable={true} draggable={true} data={data} columns={columns}/>
        </div>
    )
}

export default AssignIssue;
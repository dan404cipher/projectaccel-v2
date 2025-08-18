import { CustomTable } from "@/components/dashboard/CustomTable";
import { useState } from "react";

const img2 = "/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
const img3 = "/icons/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png";
const img4 = "/icons/27329e3b78d83b20619fddee55560c05c2cd1469.png";
const img5 = "/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";
const img6 = "/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";

const ActiveSprintListView = () => {

    const [data, setData] = useState([
        {
            title: 'Todo',
            data: [
                {
                    bugId: 'Bug-1',
                    title: 'Setup Project Repo',
                    description: 'Initialize git repo and basic folder structure',
                    priority: 'low',
                    assginee: [img2, img3],
                    message: [
                        { title: 'Need to confirm repo name' },
                        { title: 'Check with DevOps' },
                    ],
                    attachment: [{ title: 'requirements.txt' }],
                    date: 'Sep 12',
                },
                {
                    bugId: 'Bug-2',
                    title: 'Login Page UI',
                    description: 'Create initial login page design with form validation',
                    priority: 'medium',
                    assginee: [img3, img4],
                    message: [
                        { title: 'Use Tailwind for UI' },
                        { title: 'Need input validation' },
                        { title: 'Dark theme support' },
                    ],
                    attachment: [{ title: 'ui-mock.png' }, { title: 'validation.docx' }],
                    date: 'Sep 14',
                },
            ],
        },
        {
            title: 'In Process',
            data: [
                {
                    bugId: 'Bug-3',
                    title: 'User Authentication API',
                    description: 'Implement JWT-based login and register API',
                    priority: 'high',
                    assginee: [img2, img4],
                    message: [
                        { title: 'Password encryption pending' },
                        { title: 'Add refresh token' },
                        { title: 'Unit tests required' },
                    ],
                    attachment: [{ title: 'auth-flow.png' }],
                    date: 'Sep 15',
                },
                {
                    bugId: 'Bug-4',
                    title: 'Dashboard Widgets',
                    description: 'Build analytics widgets (chart, stats)',
                    priority: 'medium',
                    assginee: [img3],
                    message: [
                        { title: 'Check chart.js or ApexCharts' },
                        { title: 'Need mobile responsive' },
                    ],
                    attachment: [
                        { title: 'chart-design.png' },
                        { title: 'mobile-view.sketch' },
                    ],
                    date: 'Sep 16',
                },
            ],
        },
        {
            title: 'In Review',
            data: [
                {
                    bugId: 'Bug-5',
                    title: 'Notification System',
                    description: 'Real-time notification with socket.io',
                    priority: 'high',
                    assginee: [img2, img3, img4],
                    message: [
                        { title: 'Test with multiple users' },
                        { title: 'Check performance' },
                        { title: 'Need approval from QA' },
                    ],
                    attachment: [{ title: 'notification-schema.pdf' }],
                    date: 'Sep 18',
                },
                {
                    bugId: 'Bug-6',
                    title: 'Profile Page',
                    description: 'Add user profile update + avatar upload',
                    priority: 'low',
                    assginee: [img4],
                    message: [
                        { title: 'File upload works fine' },
                        { title: 'UI review pending' },
                    ],
                    attachment: [{ title: 'profile-wireframe.png' }],
                    date: 'Sep 19',
                },
            ],
        },
        {
            title: 'Completed',
            data: [
                {
                    bugId: 'Bug-7',
                    title: 'Landing Page',
                    description: 'Public landing page with hero + CTA',
                    priority: 'low',
                    assginee: [img2],
                    message: [{ title: 'SEO check done' }],
                    attachment: [{ title: 'landing-final.png' }],
                    date: 'Sep 10',
                },
                {
                    bugId: 'Bug-8',
                    title: 'Email Service',
                    description: 'Sendgrid integration for transactional emails',
                    priority: 'medium',
                    assginee: [img3, img4],
                    message: [
                        { title: 'Tested with staging account' },
                        { title: 'DKIM/SPF setup done' },
                    ],
                    attachment: [{ title: 'email-template.html' }],
                    date: 'Sep 11',
                },
            ],
        },
    ]);


    const columns = [
        {
            header: "Type",
            accessor: "bugId",
            sortable: true,
            render: (value, row) => (
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
            header: "Issue Title",
            accessor: "title",
            render: (value) => (
                <div className="w-[200px]">
                    {value}
                </div>
            )
        },
        {
            header: "Assign to",
            accessor: "assginee",
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
                    <span className="ml-2 text-gray-500">{value.length}+</span>
                </div>
            ),
        },
        {
            header: "Status",
            accessor: "status",
            sortable: true,
            render: (value, row) => {
                // Get the status from the parent group title
                const parentGroup = data.find(group =>
                    group.data.some(item => item.bugId === row.bugId)
                );
                return (
                    <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-sm">
                        {parentGroup?.title || 'Unknown'}
                    </span>
                );
            },
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
            accessor: "date",
            render: (value) => <span className="text-red-500">{value}</span>,
        },
    ];
    return (
        <div className="bg-[#F2F2F2] h-full rounded-2xl w-full flex flex-col gap-6">
            {/* List View Header  */}
            <div className=" flex items-center justify-between px-5 py-6">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-medium text-[#06263d]">List View / Sort by Status</h2>
                    <div className="flex items-center gap-1">
                        <div className="w-7 h-7 bg-[#455A64] rounded-full flex items-center justify-center">
                            <span className="text-white text-base font-medium">22</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-9 h-9 bg-[#67909b] rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <g clip-path="url(#clip0_5_28200)">
                                    <path d="M6.16363 10.8888C8.77168 10.8888 10.8859 8.77461 10.8859 6.16656C10.8859 3.5585 8.77168 1.44434 6.16363 1.44434C3.55557 1.44434 1.44141 3.5585 1.44141 6.16656C1.44141 8.77461 3.55557 10.8888 6.16363 10.8888Z" stroke="white" stroke-linejoin="round" />
                                    <path d="M7.73653 4.31734C7.5304 4.11068 7.28546 3.9468 7.01578 3.83511C6.74611 3.72341 6.45703 3.66612 6.16514 3.66651C5.87325 3.66612 5.58417 3.72341 5.31449 3.83511C5.04482 3.9468 4.79988 4.11068 4.59375 4.31734M9.56014 9.56151L11.9171 11.9185" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_5_28200">
                                        <rect width="13.3333" height="13.3333" fill="white" transform="translate(0.332031 0.333252)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className="w-9 h-9 bg-[#67909b] rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M2 10.6667L4.66667 13.3334M4.66667 13.3334L7.33333 10.6667M4.66667 13.3334V2.66675M7.33333 2.66675H14M7.33333 5.33342H12M7.33333 8.00008H10" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div className="w-9 h-9 bg-[#67909b] rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M2.55556 4.11111C2.96811 4.11111 3.36378 3.94722 3.6555 3.6555C3.94722 3.36378 4.11111 2.96811 4.11111 2.55556C4.11111 2.143 3.94722 1.74733 3.6555 1.45561C3.36378 1.16389 2.96811 1 2.55556 1C2.143 1 1.74733 1.16389 1.45561 1.45561C1.16389 1.74733 1 2.143 1 2.55556C1 2.96811 1.16389 3.36378 1.45561 3.6555C1.74733 3.94722 2.143 4.11111 2.55556 4.11111ZM13.4444 4.11111C13.857 4.11111 14.2527 3.94722 14.5444 3.6555C14.8361 3.36378 15 2.96811 15 2.55556C15 2.143 14.8361 1.74733 14.5444 1.45561C14.2527 1.16389 13.857 1 13.4444 1C13.0319 1 12.6362 1.16389 12.3445 1.45561C12.0528 1.74733 11.8889 2.143 11.8889 2.55556C11.8889 2.96811 12.0528 3.36378 12.3445 3.6555C12.6362 3.94722 13.0319 4.11111 13.4444 4.11111ZM15 13.4444C15 13.857 14.8361 14.2527 14.5444 14.5444C14.2527 14.8361 13.857 15 13.4444 15C13.0319 15 12.6362 14.8361 12.3445 14.5444C12.0528 14.2527 11.8889 13.857 11.8889 13.4444C11.8889 13.0319 12.0528 12.6362 12.3445 12.3445C12.6362 12.0528 13.0319 11.8889 13.4444 11.8889C13.857 11.8889 14.2527 12.0528 14.5444 12.3445C14.8361 12.6362 15 13.0319 15 13.4444ZM2.55556 15C2.96811 15 3.36378 14.8361 3.6555 14.5444C3.94722 14.2527 4.11111 13.857 4.11111 13.4444C4.11111 13.0319 3.94722 12.6362 3.6555 12.3445C3.36378 12.0528 2.96811 11.8889 2.55556 11.8889C2.143 11.8889 1.74733 12.0528 1.45561 12.3445C1.16389 12.6362 1 13.0319 1 13.4444C1 13.857 1.16389 14.2527 1.45561 14.5444C1.74733 14.8361 2.143 15 2.55556 15ZM4.857 2.94444C4.92302 2.55328 4.88822 2.15175 4.75589 1.77778H8.38889C8.90459 1.77778 9.39917 1.98264 9.76382 2.34729C10.1285 2.71195 10.3333 3.20652 10.3333 3.72222V5.66667H12.2778C12.7935 5.66667 13.2881 5.87153 13.6527 6.23618C14.0174 6.60084 14.2222 7.09541 14.2222 7.61111V11.2433C13.8482 11.1113 13.4467 11.0767 13.0556 11.143V7.61111C13.0556 7.40483 12.9736 7.207 12.8278 7.06114C12.6819 6.91528 12.4841 6.83333 12.2778 6.83333H10.3333V8.38889C10.3333 8.90459 10.1285 9.39917 9.76382 9.76382C9.39917 10.1285 8.90459 10.3333 8.38889 10.3333H6.83333V12.2778C6.83333 12.4841 6.91528 12.6819 7.06114 12.8278C7.207 12.9736 7.40483 13.0556 7.61111 13.0556H11.143C11.077 13.4467 11.1118 13.8483 11.2441 14.2222H7.61111C7.09541 14.2222 6.60084 14.0174 6.23618 13.6527C5.87153 13.2881 5.66667 12.7935 5.66667 12.2778V10.3333H3.72222C3.20652 10.3333 2.71195 10.1285 2.34729 9.76382C1.98264 9.39917 1.77778 8.90459 1.77778 8.38889V4.75667C2.15182 4.88873 2.55335 4.92327 2.94444 4.857V8.38889C2.94444 8.59517 3.02639 8.793 3.17225 8.93886C3.31811 9.08472 3.51594 9.16667 3.72222 9.16667H5.66667V7.61111C5.66667 7.09541 5.87153 6.60084 6.23618 6.23618C6.60084 5.87153 7.09541 5.66667 7.61111 5.66667H9.16667V3.72222C9.16667 3.51594 9.08472 3.31811 8.93886 3.17225C8.793 3.02639 8.59517 2.94444 8.38889 2.94444H4.857ZM8.38889 9.16667C8.59517 9.16667 8.793 9.08472 8.93886 8.93886C9.08472 8.793 9.16667 8.59517 9.16667 8.38889V6.83333H7.61111C7.40483 6.83333 7.207 6.91528 7.06114 7.06114C6.91528 7.207 6.83333 7.40483 6.83333 7.61111V9.16667H8.38889Z" fill="white" />
                            </svg>
                        </div>
                        <div className="w-9 h-9 bg-[#67909b] rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M7.50147 4.40653C7.13205 4.40653 6.76625 4.47929 6.42496 4.62066C6.08366 4.76203 5.77356 4.96924 5.51234 5.23045C5.25112 5.49167 5.04392 5.80178 4.90255 6.14307C4.76118 6.48437 4.68842 6.85017 4.68842 7.21958C4.68842 7.589 4.76118 7.95479 4.90255 8.29609C5.04392 8.63738 5.25112 8.94749 5.51234 9.20871C5.77356 9.46992 6.08366 9.67713 6.42496 9.8185C6.76625 9.95987 7.13205 10.0326 7.50147 10.0326H13.5401L12.865 9.3575C12.7959 9.29312 12.7405 9.21548 12.7021 9.12921C12.6636 9.04294 12.643 8.94982 12.6413 8.85539C12.6396 8.76096 12.657 8.66717 12.6924 8.5796C12.7277 8.49203 12.7804 8.41248 12.8472 8.3457C12.9139 8.27892 12.9935 8.22628 13.0811 8.19091C13.1686 8.15553 13.2624 8.13816 13.3569 8.13983C13.4513 8.1415 13.5444 8.16217 13.6307 8.2006C13.7169 8.23904 13.7946 8.29446 13.859 8.36355L15.7343 10.2389C15.866 10.3708 15.94 10.5495 15.94 10.7359C15.94 10.9223 15.866 11.101 15.7343 11.2329L13.859 13.1082C13.7946 13.1773 13.7169 13.2327 13.6307 13.2712C13.5444 13.3096 13.4513 13.3303 13.3569 13.332C13.2624 13.3336 13.1686 13.3163 13.0811 13.2809C12.9935 13.2455 12.9139 13.1929 12.8472 13.1261C12.7804 13.0593 12.7277 12.9798 12.6924 12.8922C12.657 12.8046 12.6396 12.7108 12.6413 12.6164C12.643 12.522 12.6636 12.4288 12.7021 12.3426C12.7405 12.2563 12.7959 12.1787 12.865 12.1143L13.5401 11.4392H7.50147C6.58401 11.439 5.69161 11.1398 4.95946 10.5869C4.22731 10.034 3.6953 9.25758 3.44404 8.3752C3.19277 7.49282 3.23594 6.55259 3.56701 5.69695C3.89807 4.84131 4.49899 4.11688 5.27872 3.63342C6.05845 3.14995 6.97452 2.93379 7.88813 3.01768C8.80174 3.10158 9.66312 3.48095 10.3418 4.09833C11.0204 4.71572 11.4793 5.53747 11.649 6.43909C11.8187 7.34072 11.69 8.27309 11.2822 9.09495H9.59813C9.96015 8.69019 10.1973 8.18931 10.2809 7.65275C10.3645 7.1162 10.2911 6.56691 10.0694 6.07119C9.84768 5.57546 9.48725 5.1545 9.03159 4.85912C8.57592 4.56373 8.0445 4.40654 7.50147 4.40653ZM0.703263 10.0326H3.17875C3.53697 10.5836 3.99719 11.061 4.53464 11.4392H0.703263C0.516746 11.4392 0.337868 11.3651 0.205981 11.2332C0.0740934 11.1013 0 10.9224 0 10.7359C0 10.5494 0.0740934 10.3705 0.205981 10.2386C0.337868 10.1067 0.516746 10.0326 0.703263 10.0326Z" fill="white" />
                            </svg>
                        </div>
                    </div>
                    <button className="bg-[#67909b] text-white px-5 py-2 rounded-lg text-sm font-medium">
                        Complete Sprint
                    </button>
                </div>
            </div>
            {/* List View Table header */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 bg-[#ffffff] rounded-2xl shadow-sm">
                    <div className="flex items-center justify-end gap-4 px-4 py-2">
                        <button className=" w-8 h-8 bg-[#67909b] rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <rect width="24.1459" height="24.1459" transform="translate(0 0.000976562)" fill="#67909B" />
                                <path d="M18.1103 13.0779H13.0799V18.1083C13.0799 18.3752 12.9739 18.6311 12.7852 18.8197C12.5965 19.0084 12.3406 19.1144 12.0738 19.1144C11.807 19.1144 11.5511 19.0084 11.3624 18.8197C11.1737 18.6311 11.0677 18.3752 11.0677 18.1083V13.0779H6.03733C5.7705 13.0779 5.5146 12.9719 5.32592 12.7833C5.13725 12.5946 5.03125 12.3387 5.03125 12.0719C5.03125 11.805 5.13725 11.5491 5.32592 11.3604C5.5146 11.1718 5.7705 11.0658 6.03733 11.0658H11.0677V6.03538C11.0677 5.76855 11.1737 5.51265 11.3624 5.32397C11.5511 5.13529 11.807 5.0293 12.0738 5.0293C12.3406 5.0293 12.5965 5.13529 12.7852 5.32397C12.9739 5.51265 13.0799 5.76855 13.0799 6.03538V11.0658H18.1103C18.3771 11.0658 18.633 11.1718 18.8217 11.3604C19.0104 11.5491 19.1164 11.805 19.1164 12.0719C19.1164 12.3387 19.0104 12.5946 18.8217 12.7833C18.633 12.9719 18.3771 13.0779 18.1103 13.0779Z" fill="white" />
                            </svg>
                        </button>
                    </div>
                    <CustomTable
                        data={data.flatMap(group => group.data)}
                        columns={columns}
                        draggable
                        selectable
                        className="bg-[#ffffff]"
                    />
                </div>
            </div>
        </div>
    );
};
export default ActiveSprintListView;


const img2 = "/icons/7e72a7998be770ff0cd3794fba26c10791f7cb58.png";
const img3 = "/icons/70956c3e4bf1aab578cf67e015bc27eb5d8014a7.png";
const img4 = "/icons/27329e3b78d83b20619fddee55560c05c2cd1469.png";
const img5 = "/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";
const img6 = "/icons/426cc48c65f01a64ae4fb95e309fac55efcf3530.png";

const recentComments = [
    {
        id: "BG-17",
        title: "Login forgot password bugfix",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        author: "Kate",
        timeAgo: "6 mins ago",
        avatar: img2
    },
    {
        id: "BG-18",
        title: "Dashboard loading issue",
        description: "Users experiencing slow loading times on dashboard page.",
        author: "John",
        timeAgo: "12 mins ago",
        avatar: img3
    },
    {
        id: "BG-19",
        title: "Mobile responsive fix",
        description: "Layout breaks on mobile devices in portrait mode.",
        author: "Sarah",
        timeAgo: "25 mins ago",
        avatar: img4
    },
    {
        id: "BG-20",
        title: "API endpoint error",
        description: "500 error occurring on user profile endpoint.",
        author: "Mike",
        timeAgo: "1 hour ago",
        avatar: img5
    }
];

const RecentCommand = ({className}:{className?:string}) => {
    return (
        <div className={`bg-white h-auto min-h-[300px] sm:min-h-[350px] lg:h-[395px] w-full rounded-2xl sm:rounded-3xl shadow-[0px_9px_20px_0px_rgba(46,35,94,0.07)] overflow-hidden ${className}`}>
            <div className="flex flex-col gap-4 sm:gap-6 items-start justify-start p-4 sm:p-6 w-full">
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-row gap-2 items-center justify-start w-full">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#06263D] rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M12.6673 6.66675C13.1978 6.66675 13.7065 6.87746 14.0815 7.25253C14.4566 7.62761 14.6673 8.13632 14.6673 8.66675V10.6667C14.6673 11.1972 14.4566 11.7059 14.0815 12.081C13.7065 12.456 13.1978 12.6667 12.6673 12.6667V13.3107C12.6673 14.0174 11.8433 14.4034 11.3007 13.9507L9.75932 12.6667H8.00065C7.47022 12.6667 6.96151 12.456 6.58644 12.081C6.21136 11.7059 6.00065 11.1972 6.00065 10.6667V8.66675C6.00065 8.13632 6.21136 7.62761 6.58644 7.25253C6.96151 6.87746 7.47022 6.66675 8.00065 6.66675H12.6673ZM10.6673 2.66675C11.1978 2.66675 11.7065 2.87746 12.0815 3.25253C12.4566 3.62761 12.6673 4.13632 12.6673 4.66675V5.33341H7.33398C6.62674 5.33341 5.94846 5.61437 5.44837 6.11446C4.94827 6.61456 4.66732 7.29284 4.66732 8.00008V10.6667C4.66732 11.3627 4.93398 11.9974 5.37132 12.4721L4.66732 13.0001C4.11798 13.4121 3.33398 13.0201 3.33398 12.3334V11.3334C2.80355 11.3334 2.29484 11.1227 1.91977 10.7476C1.5447 10.3726 1.33398 9.86385 1.33398 9.33342V4.66675C1.33398 4.13632 1.5447 3.62761 1.91977 3.25253C2.29484 2.87746 2.80355 2.66675 3.33398 2.66675H10.6673Z" fill="white" />
                            </svg>
                        </div>
                        <div className="text-base sm:text-lg lg:text-[20px] font-medium text-[#252525]">Recent Comments</div>
                        <div className="bg-[#586468] w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center">
                            <div className="text-xs sm:text-sm lg:text-[14px] font-medium text-white">44</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4 h-48 sm:h-64 lg:h-[291px] items-start justify-start overflow-y-auto w-full">
                    {recentComments.map((comment, index) => (
                        <div key={index} className="bg-[#f9f9f9] flex flex-row gap-3 sm:gap-4 items-start justify-start px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl w-full">
                            <div className="flex flex-row items-center justify-between px-0 py-px w-12 sm:w-[62px] flex-shrink-0">
                                <div className="bg-[#263238] w-4 h-4 sm:w-5 sm:h-5 rounded-full sm:rounded-[32px] flex items-center justify-center">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="sm:w-3 sm:h-3">
                                        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="white" strokeWidth="1" fill="white" />
                                    </svg>
                                </div>
                                <div className="text-[10px] sm:text-[12px] font-normal text-[#666666] text-right tracking-[-0.072px] hidden sm:block">{comment.id}</div>
                            </div>

                            <div className="flex flex-col gap-1 sm:gap-2 items-start justify-start flex-1 min-w-0">
                                <div className="flex flex-col gap-1 sm:gap-2 items-start justify-start w-full">
                                    <div className="text-sm sm:text-base lg:text-[16px] font-medium text-[#333333]">{comment.title}</div>
                                    <div className="text-xs sm:text-sm lg:text-[12px] font-normal text-[#999999] w-full">{comment.description}</div>
                                </div>

                                <div className="flex flex-row items-center justify-between w-full">
                                    <div className="flex flex-row gap-1 items-center justify-start">
                                        <img alt="avatar" className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" src={comment.avatar} />
                                        <div className="text-sm sm:text-base lg:text-[16px] font-medium text-[#333333] tracking-[-0.32px]">{comment.author}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15" fill="none">
                                                <path d="M3.20833 2.83398C2.87958 2.83398 2.56428 2.96458 2.33182 3.19705C2.09935 3.42952 1.96875 3.74481 1.96875 4.07357V8.01107C1.96875 8.33983 2.09935 8.65512 2.33182 8.88759C2.56428 9.12005 2.87958 9.25065 3.20833 9.25065H9.47917C9.80793 9.25065 10.1232 9.12005 10.3557 8.88759C10.5882 8.65512 10.7188 8.33983 10.7188 8.01107V4.07357C10.7188 3.74481 10.5882 3.42952 10.3557 3.19705C10.1232 2.96458 9.80793 2.83398 9.47917 2.83398H3.20833ZM2.69792 4.07357C2.69792 3.79182 2.92658 3.56315 3.20833 3.56315H9.47917C9.76092 3.56315 9.98958 3.79182 9.98958 4.07357V8.01107C9.98958 8.14644 9.93581 8.27626 9.84009 8.37199C9.74436 8.46771 9.61454 8.52148 9.47917 8.52148H3.20833C3.07296 8.52148 2.94314 8.46771 2.84741 8.37199C2.75169 8.27626 2.69792 8.14644 2.69792 8.01107V4.07357ZM4.66667 10.709C4.42814 10.709 4.19466 10.6403 3.99424 10.5109C3.79382 10.3816 3.63497 10.1972 3.53675 9.97982H9.47917C9.73771 9.97982 9.99372 9.92889 10.2326 9.82996C10.4714 9.73102 10.6885 9.586 10.8713 9.40318C11.0541 9.22037 11.1991 9.00333 11.2981 8.76448C11.397 8.52562 11.4479 8.26961 11.4479 8.01107V4.40198C11.6653 4.5002 11.8497 4.65905 11.979 4.85947C12.1084 5.05989 12.1771 5.29337 12.1771 5.5319V8.01107C12.1771 8.36536 12.1073 8.71619 11.9717 9.04352C11.8361 9.37084 11.6374 9.66826 11.3869 9.91878C11.1364 10.1693 10.8389 10.368 10.5116 10.5036C10.1843 10.6392 9.83346 10.709 9.47917 10.709H4.66667ZM6.125 12.1673C5.88647 12.1674 5.65299 12.0986 5.45257 11.9693C5.25215 11.8399 5.0933 11.6555 4.99508 11.4382H9.47917C11.3721 11.4382 12.9063 9.90398 12.9063 8.01107V5.86032C13.1236 5.95854 13.308 6.11738 13.4374 6.3178C13.5667 6.51822 13.6355 6.7517 13.6354 6.99023V8.01107C13.6354 10.3065 11.7746 12.1673 9.47917 12.1673H6.125Z" fill="#06263D" />
                                            </svg>
                                            <span className=" text-[12px] font-medium text-[#06263D]">5</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                                                <path d="M11.2285 3.01844C10.7353 2.52549 10.0665 2.24858 9.36921 2.24858C8.67191 2.24858 8.00314 2.52549 7.50996 3.01844L1.63846 8.88744C1.56737 8.95368 1.47335 8.98975 1.3762 8.98803C1.27905 8.98632 1.18635 8.94696 1.11765 8.87825C1.04894 8.80955 1.00959 8.71686 1.00787 8.61971C1.00616 8.52255 1.04222 8.42853 1.10846 8.35744L6.97846 2.48744C7.61253 1.85371 8.47237 1.49781 9.36884 1.49805C10.2653 1.49828 11.125 1.85463 11.7587 2.48869C12.3924 3.12276 12.7483 3.98261 12.7481 4.87908C12.7479 5.77555 12.3915 6.63521 11.7575 7.26894L6.09746 12.9239C5.72865 13.2902 5.22971 13.4953 4.70996 13.4943C4.19021 13.4934 3.69203 13.2864 3.32458 12.9188C2.95712 12.5512 2.75036 12.053 2.74958 11.5332C2.74881 11.0135 2.9541 10.5146 3.32046 10.1459L8.85896 4.60744C8.89329 4.5706 8.93469 4.54105 8.98069 4.52055C9.02669 4.50006 9.07635 4.48904 9.1267 4.48815C9.17705 4.48726 9.22707 4.49652 9.27376 4.51538C9.32045 4.53424 9.36287 4.56232 9.39848 4.59793C9.43409 4.63353 9.46216 4.67595 9.48102 4.72265C9.49988 4.76934 9.50914 4.81935 9.50826 4.86971C9.50737 4.92006 9.49635 4.96971 9.47585 5.01571C9.45535 5.06171 9.4258 5.10311 9.38896 5.13744L3.85196 10.6764C3.62842 10.9049 3.50401 11.2123 3.50573 11.532C3.50746 11.8516 3.63517 12.1577 3.86116 12.3837C4.08715 12.6098 4.39318 12.7376 4.71282 12.7394C5.03246 12.7412 5.33991 12.6169 5.56846 12.3934L11.2285 6.73844C11.4728 6.49425 11.6666 6.20431 11.7989 5.88518C11.9312 5.56605 11.9993 5.224 11.9993 4.87855C11.9994 4.5331 11.9314 4.19102 11.7992 3.87186C11.667 3.5527 11.4732 3.26271 11.229 3.01844" fill="#06263D" />
                                            </svg>
                                            <span className=" text-[12px] font-medium text-[#06263D]">14</span>
                                        </div>
                                        <div className="text-xs sm:text-sm lg:text-[12px] font-normal text-[#999999] tracking-[-0.24px]">{comment.timeAgo}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RecentCommand;
import React from "react";

interface EmergingIssue {
    id: number;
    title: string;
    project: string;
    timeLeft: string;
    priority: "high" | "medium" | "low";
}

const emergingIssues: EmergingIssue[] = [
    {
        id: 1,
        title: "Database connection timeout",
        project: "Hire-Accel Portal",
        timeLeft: "8 hrs",
        priority: "high"
    },
    {
        id: 2,
        title: "User authentication failure",
        project: "Hire-Accel Portal",
        timeLeft: "10 hrs",
        priority: "high"
    },
    {
        id: 3,
        title: "Payment gateway integration issue",
        project: "Hire-Accel Portal",
        timeLeft: "1 day",
        priority: "medium"
    },
    {
        id: 4,
        title: "Email notification system down",
        project: "Hire-Accel Portal",
        timeLeft: "2 days",
        priority: "low"
    }
];

const EmergenceIssue = () => {
    return (
        <div className="bg-white w-full h-full rounded-2xl sm:rounded-3xl shadow-[0px_9px_20px_0px_rgba(46,35,94,0.07)]">
            <div className="flex flex-col gap-4 sm:gap-6 items-start justify-start p-4 sm:p-6 w-full">
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-row gap-2 items-center justify-start">
                                                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#06263D] text-[#666666] rounded-lg flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                      <path d="M2.66602 9.33325C2.66602 8.53414 2.82202 7.80303 3.13402 7.13992C3.44602 6.47636 3.81779 5.88481 4.24935 5.36525C4.6809 4.8457 5.12313 4.40281 5.57602 4.03659C6.0289 3.67036 6.39224 3.38903 6.66602 3.19259V4.19992C6.66602 4.81681 6.87357 5.30436 7.28868 5.66259C7.70335 6.02081 8.16802 6.19992 8.68268 6.19992C8.89602 6.19992 9.09979 6.16525 9.29402 6.09592C9.48824 6.02703 9.67468 5.92481 9.85335 5.78925L10.14 5.56392C10.7093 5.99636 11.1616 6.54103 11.4967 7.19792C11.8318 7.85481 11.9993 8.56659 11.9993 9.33325C11.9993 10.3537 11.7091 11.2581 11.1287 12.0466C10.5482 12.835 9.80513 13.3857 8.89935 13.6986C9.13935 13.4919 9.32713 13.2453 9.46268 12.9586C9.59824 12.6719 9.66602 12.3635 9.66602 12.0333C9.66602 11.7341 9.60824 11.4457 9.49268 11.1679C9.37668 10.8897 9.21046 10.6408 8.99402 10.4213L7.33268 8.79792L5.68802 10.4226C5.46846 10.6421 5.29868 10.8879 5.17868 11.1599C5.05913 11.4319 4.99935 11.7233 4.99935 12.0339C4.99935 12.3637 5.06713 12.6721 5.20268 12.9593C5.33824 13.2464 5.52602 13.493 5.76602 13.6993C4.85979 13.3864 4.11668 12.8357 3.53668 12.0473C2.95668 11.2588 2.66646 10.3541 2.66602 9.33325ZM7.33268 9.72792L8.51868 10.8933C8.67424 11.0488 8.79335 11.2228 8.87602 11.4153C8.95824 11.6077 8.99935 11.8137 8.99935 12.0333C8.99935 12.4853 8.83757 12.8706 8.51402 13.1893C8.19002 13.5075 7.79668 13.6666 7.33402 13.6666C6.87135 13.6666 6.47779 13.5073 6.15335 13.1886C5.8289 12.8699 5.66646 12.4848 5.66602 12.0333C5.66602 11.8208 5.70535 11.6186 5.78402 11.4266C5.86268 11.235 5.98357 11.0577 6.14668 10.8946L7.33268 9.72792ZM13.9993 6.99992C13.9047 6.99992 13.8253 6.96792 13.7613 6.90392C13.6973 6.83992 13.6656 6.76059 13.666 6.66592C13.6665 6.57125 13.6985 6.49214 13.762 6.42859C13.8256 6.36503 13.9049 6.33325 14 6.33325C14.0951 6.33325 14.1742 6.36525 14.2373 6.42925C14.3005 6.49325 14.3322 6.57259 14.3327 6.66725C14.3331 6.76192 14.3011 6.84103 14.2367 6.90459C14.1722 6.96814 14.0936 6.99992 13.9993 6.99992ZM13.666 5.15325V2.33325H14.3327V5.15325H13.666Z" fill="white" />
                              </svg>
                          </div>
                        <div className="text-base sm:text-lg lg:text-[20px] font-medium text-[#252525]">Emergence Issues</div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 sm:gap-8 lg:gap-5 items-start justify-start w-full  overflow-y-auto h-[220px]">
                    {emergingIssues.slice(0, 4).map((issue, index) => (
                        <div key={issue.id} className="flex flex-row gap-2 sm:gap-4 items-center justify-start w-full">
                            <div className="flex flex-row items-center justify-between px-0 py-px w-12 sm:w-[62px] flex-shrink-0">
                                <div className="bg-[#263238] w-4 h-4 sm:w-5 sm:h-5 rounded-full sm:rounded-[32px] flex items-center justify-center">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="sm:w-3 sm:h-3">
                                        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="white" strokeWidth="1" fill="white" />
                                    </svg>
                                </div>
                                <div className="text-[10px] sm:text-[12px] font-normal text-[#666666] text-right tracking-[-0.072px] hidden sm:block w-16">BG – 17</div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 lg:gap-[91px] items-start sm:items-center justify-start flex-1 min-w-0">
                                <div className="flex flex-col gap-1 sm:gap-2 items-start justify-start flex-1 min-w-0">
                                    <div className="text-sm sm:text-base lg:text-[16px] font-medium text-[#333333] truncate w-full">{issue.title}</div>
                                    <div className="flex flex-row gap-1 sm:gap-2 items-start justify-start text-xs sm:text-[12px]">
                                        <div className="font-normal text-[#999999]">Projects</div>
                                        <div className="font-medium text-[#999999]">{issue.project}</div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1 items-start justify-start w-full sm:w-20 flex-shrink-0">
                                    <div className="text-xs sm:text-sm lg:text-[14px] font-medium text-[#252525] text-center w-full">Time Left</div>
                                    <div className="bg-[#c0ced2] h-4 sm:h-5 w-full sm:w-20 rounded-lg relative">
                                        <div className="text-[10px] sm:text-[12px] font-medium text-[#445256] absolute top-[2px] sm:top-[3px] left-[8px] sm:left-[27px] ">
                                            {issue.timeLeft}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmergenceIssue;
import React from "react";
import ReactApexChart from "react-apexcharts";
import imgIconamoonArrowUp2Light1 from "../../../public/icons/008bfc8c1a6860f58a85fd842ae8dba028cd6272.svg";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const issueAnalysisData = [
    { label: "Mon", value: 5, color: "#648E92" },
    { label: "Tue", value: 7.5, color: "#648E92" },
    { label: "Wed", value: 6, color: "#648E92" },
    { label: "Thu", value: 2.5, color: "#648E92" },
    { label: "Fri", value: 5.5, color: "#648E92" },
    { label: "Sat", value: 5.5, color: "#648E92" },
];

const IssuesAnalysis = ({className}:{className?:string}) => {
    const chartOptions = {
        chart: {
            type: "bar" as const,
            height: "100%",
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                borderRadius: 8,
                borderRadiusApplication: "end" as const,
                horizontal: false,
                columnWidth: "60%",
                distributed: false,
            },
        },
        colors: ["#648E92"],
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: issueAnalysisData.map(item => item.label),
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: {
                    fontSize: "14px",
                    fontWeight: 500,
                    colors: "#60646C",
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: "12px",
                    fontWeight: 500,
                    colors: "#60646C",
                },
                formatter: function (value: number) {
                    return value + "h";
                },
            },
            min: 0,
            max: 8,
            tickAmount: 8,
        },
        grid: {
            borderColor: "#e5e7eb",
            xaxis: {
                lines: { show: false },
            },
            yaxis: {
                lines: { show: true },
            },
        },
        tooltip: {
            enabled: false,
        },
    };

    const chartSeries = [
        {
            name: "Time Spent",
            data: issueAnalysisData.map(item => item.value),
        },
    ];

    return (
            <div className={`bg-white h-auto min-h-[300px] sm:min-h-[350px] lg:h-[395px] w-full rounded-2xl sm:rounded-3xl shadow-[0px_9px_20px_0px_rgba(46,35,94,0.07)] flex flex-col gap-2 p-[1.5rem] ${className}`}>
            <div className=" flex items-center justify-between  gap-4">
                <div className="flex items-center gap-2 ">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#06263D] rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M14.4739 4.86004C14.412 4.79756 14.3382 4.74796 14.257 4.71411C14.1758 4.68027 14.0886 4.66284 14.0006 4.66284C13.9126 4.66284 13.8255 4.68027 13.7442 4.71411C13.663 4.74796 13.5893 4.79756 13.5273 4.86004L9.33394 9.06004L6.47394 6.19337C6.41197 6.13089 6.33823 6.08129 6.257 6.04745C6.17576 6.0136 6.08862 5.99618 6.00061 5.99618C5.9126 5.99618 5.82547 6.0136 5.74423 6.04745C5.66299 6.08129 5.58925 6.13089 5.52728 6.19337L1.52728 10.1934C1.46479 10.2553 1.4152 10.3291 1.38135 10.4103C1.3475 10.4916 1.33008 10.5787 1.33008 10.6667C1.33008 10.7547 1.3475 10.8419 1.38135 10.9231C1.4152 11.0043 1.46479 11.0781 1.52728 11.14C1.58925 11.2025 1.66299 11.2521 1.74423 11.286C1.82547 11.3198 1.9126 11.3372 2.00061 11.3372C2.08862 11.3372 2.17576 11.3198 2.25699 11.286C2.33823 11.2521 2.41197 11.2025 2.47394 11.14L6.00061 7.60671L8.86061 10.4734C8.92259 10.5359 8.99632 10.5855 9.07756 10.6193C9.1588 10.6531 9.24594 10.6706 9.33394 10.6706C9.42195 10.6706 9.50909 10.6531 9.59033 10.6193C9.67157 10.5855 9.7453 10.5359 9.80728 10.4734L14.4739 5.80671C14.5364 5.74473 14.586 5.671 14.6199 5.58976C14.6537 5.50852 14.6711 5.42138 14.6711 5.33337C14.6711 5.24537 14.6537 5.15823 14.6199 5.07699C14.586 4.99575 14.5364 4.92202 14.4739 4.86004Z" fill="white"/>
</svg>
                    </div>
                    <div className="text-base sm:text-lg lg:text-[20px] font-medium text-[#252525]">Issues Analysis</div>
                </div>
                <div className="flex items-center gap-3 ">
                    <div className="flex items-center gap-1 text-sm text-[#60646C]">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M12 2H4C3.44772 2 3 2.44772 3 3V13C3 13.5523 3.44772 14 4 14H12C12.5523 14 13 13.5523 13 13V3C13 2.44772 12.5523 2 12 2Z" stroke="#60646C" strokeWidth="1.5" />
                            <path d="M3 6H13" stroke="#60646C" strokeWidth="1.5" />
                        </svg>
                        <span>11-18 Sep 2025</span>
                    </div>
                    <Select defaultValue="week">
                        <SelectTrigger className="w-[80px] h-8 bg-[#67909b] text-white border-none">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="week">Week</SelectItem>
                            <SelectItem value="month">Month</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex-1 flex gap-4 h-full">
                <div className="w-[30%] flex flex-col gap-2 items-start h-full justify-between">
                    <div className="text-sm sm:text-base lg:text-[16px] font-normal text-[#333333] w-full">Time Spent on Tasks</div>
                                         <div className="flex flex-col gap-3 sm:gap-4 items-start justify-start w-full">
                         <div className="flex flex-row gap-2 items-center justify-between w-full">
                             <div className="bg-[#f9f9f9] h-20 sm:h-24 lg:h-[107px] w-full sm:w-28 lg:w-[121px] rounded-xl sm:rounded-2xl shadow-[0px_2px_4px_0px_rgba(6,38,61,0.1)] flex flex-col gap-1 items-center justify-center p-2 sm:p-3">
                                 <div className="text-xl sm:text-2xl lg:text-[32px] font-medium text-[#06263D]">89</div>
                                 <div className="text-xs sm:text-sm lg:text-[14px] font-medium text-[#60646C] text-center h-8 sm:h-10 lg:h-11 w-full">Assigned<br />Issues</div>
                             </div>
                             <div className="bg-[#f9f9f9] h-20 sm:h-24 lg:h-[107px] w-full sm:w-28 lg:w-[121px] rounded-xl sm:rounded-2xl shadow-[0px_2px_4px_0px_rgba(6,38,61,0.1)] flex flex-col gap-1 items-center justify-center p-2 sm:p-3">
                                 <div className="text-xl sm:text-2xl lg:text-[32px] font-medium text-[#06263D]">85</div>
                                 <div className="text-xs sm:text-sm lg:text-[14px] font-medium text-[#60646C] text-center h-8 sm:h-10 lg:h-11 w-full">Completed<br />Issues</div>
                             </div>
                         </div>
                         <div className="bg-[#f9f9f9] h-20 sm:h-24 lg:h-[122px] w-full rounded-xl sm:rounded-2xl shadow-[0px_2px_4px_0px_rgba(6,38,61,0.1)] flex flex-col gap-2 items-start justify-center p-3">
                             <div className="text-xl sm:text-2xl lg:text-[32px] font-medium text-center text-[#06263D] w-full">90%</div>
                             <div className="text-xs sm:text-sm lg:text-[14px] font-medium text-[#60646C] h-8 sm:h-10 lg:h-11 w-full">This week's work tracking is higher than last week's</div>
                         </div>
                     </div>
                </div>
                <div className="w-[70%] h-full">
                    <ReactApexChart
                        options={chartOptions}
                        series={chartSeries}
                        type="bar"
                        height="100%"
                    />
                </div>
            </div>
        </div>
    );
};

export default IssuesAnalysis;
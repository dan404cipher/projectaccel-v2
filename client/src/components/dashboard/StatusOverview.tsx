import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export const StatusOverview = () => {
    const [state] = useState({
        series: [44, 55, 41, 17],
        options: {
            chart: {
                type: "donut" as const,
            },
            plotOptions: {
                pie: {
                    expandOnClick: false,
                    borderRadius: 8,
                    dataLabels: {
                        offset: 0,
                    },
                    startAngle: 0,
                    endAngle: 360,
                    donut: {
                        size: "80%",
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                label: "",
                                color: "#4B908F",
                                fontSize: "32px",
                                fontWeight: 600,
                                formatter: () => "32",
                            },
                        },
                    },
                }
            },
            stroke: {
                show: true,
                width: 0,
                colors: ['#fff'],
                lineCap: 'round' as const,
            },
            colors: ["#F59F0A", "#C84265", "#16A249", "#4E84B4"],
            legend: {
                position: "right" as const,
                show: false,
                fontSize: "14px",
                markers: {
                    size: 10,
                },
            },
            dataLabels: {
                enabled: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    });
    const stats = [
        { count: 43, label: "To-do", color: "bg-[#3B82F6]" }, // blue
        { count: 12, label: "In progress", color: "bg-[#F59E0B]" }, // yellow
        { count: 3, label: "In review", color: "bg-[#EF4444]" }, // red
        { count: 18, label: "Done", color: "bg-[#10B981]" }, // green
      ];

    return (
        <div className="w-full h-full bg-white rounded-[1.5rem] p-4">
            <span className="text-[20px] font-normal">
                Status Overview
            </span>
            <div className="flex flex-col items-center justify-center">
                <div>
                    <ReactApexChart
                        options={state.options}
                        series={state.series}
                        type="donut"
                        width={"89%"}
                    />
                </div>
                <div className="grid grid-cols-2 gap-6 w-full">
                    {stats.map((item, idx) => (
                       <div className="flex items-center bg-white rounded-xl shadow">
                       {/* Left vertical bar */}
                       <div className={`${item.color} w-2 h-14 rounded-l-full`} />
                       
                       {/* Text content */}
                       <div className="flex items-center gap-4 ml-4">
                         <span className="text-3xl font-bold text-[#161A41C7]">{item.count}</span>
                         <span className="text-[16px] font-semibold text-gray-400">{item.label}</span>
                       </div>
                     </div>
                    ))}
                </div>
            </div>
        </div>
    )
};
import { Clock, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BudjectUtilization: React.FC = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [chartData, setChartData] = useState({
        series: [95], // progress value
        options: {
            chart: {
                type: "radialBar",
                offsetY: -20,
                sparkline: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
                animations: {
                    enabled: true,
                },
            },
            plotOptions: {
                radialBar: {
                    startAngle: -130,
                    endAngle: 130,
                    hollow: {
                        margin: 0,
                        size: "60%",
                    },
                    track: {
                        background: "#f2f4f7",
                        strokeWidth: "60%",
                    },

                    strokeLinecap: "round",
                    dataLabels: {
                        show: true,
                        name: {
                            show: true,
                            offsetY: 20,
                            fontSize: "12px",
                            color: "#333333",
                            formatter: () => "Utilized from total budget all over project",
                        },
                        value: {
                            show: true,
                            offsetY: -10,
                            fontSize: "28px",
                            fontWeight: "bold",
                            color: "#161A41",
                            formatter: (val: number) => `${val}%`,
                        },
                    },
                },
            },
            fill: {
                colors: ["#648f96"], // customize progress color
            },
            labels: [""],
        },
    });
    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "project", label: "Project" }
    ];


    const projectOverviewList = [
        {
            name: 'ProjectAccel',
            percentage: 80,
            totalbudject: 2000000,
            currentBudject: 4000000,
        },
        {
            name: 'ProjectAccel',
            percentage: 80,
            totalbudject: 2000000,
            currentBudject: 4000000,
        },
        {
            name: 'ProjectAccel',
            percentage: 80,
            totalbudject: 2000000,
            currentBudject: 4000000,
        },
        {
            name: 'ProjectAccel',
            percentage: 80,
            totalbudject: 2000000,
            currentBudject: 4000000,
        },
        {
            name: 'ProjectAccel',
            percentage: 80,
            totalbudject: 2000000,
            currentBudject: 4000000,
        },
        {
            name: 'ProjectAccel',
            percentage: 80,
            totalbudject: 2000000,
            currentBudject: 4000000,
        },
    ]

    return (
        <div className="w-full h-full bg-[#FFFFFF] p-5 rounded-2xl flex flex-col gap-5 font-roboto font-medium">
            {/* header */}
            <div className="flex items-center justify-between">
                <span className="text-[#242424] text-xl font-medium">
                    Budget utilization
                </span>
                {/* tab bar */}
                <div className="bg-[#67909B] flex items-center gap-1 px-1 py-1 rounded-full">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                                ? "bg-white text-[#67909B]"
                                : "text-white hover:text-gray-200"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* tab content */}
            <div className="flex-1">
                {activeTab === "overview" && (
                    <div className="h-full flex items-center justify-center text-gray-500 flex-col">
                        <div className="relative flex items-center justify-center">
                            <ReactApexChart options={chartData.options as any} series={chartData.series} type="radialBar" height={350} />
                            <div className="absolute bottom-16 w-[50%] flex items-center justify-center flex-col pointer-events-none">
                                <span className="text-[#333333] text-xs text-center leading-tight px-2">Utilized from total budget all over project</span>
                            </div>
                        </div>
                        <div className="bg-gray-200 px-10 py-3 flex flex-col rounded-md mt-4">
                            <span className="text-[#333333] text-center text-2xl font-normal">₹ 2000000</span>
                            <span className="text-[#666666] text-center text-sm font-normal">Budget spent </span>
                        </div>
                    </div>
                )}

                {activeTab === "project" && (
                    <div className="h-full flex  text-gray-500">
                        <div className="flex flex-col gap-4 w-full overflow-y-scroll">
                            {
                                projectOverviewList.map((project)=>(
                                    <div className="flex items-start justify-between w-full">
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} className="text-orange-500" />
                                        <span>{project.name}</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="bg-[#DDDDDD] rounded-full h-4 w-full relative">
                                            <div className="bg-[#67909B] rounded-full h-4 relative" style={{ width: "80%" }}>
                                                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[12px] text-white font-medium">80%</span>
                                            </div>
                                        </div>
                                        <div className="text-sm">
                                            ₹ 2000000 / 40000000
                                        </div>
                                    </div>
                                </div>
                                ))
                            }
                          
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BudjectUtilization;
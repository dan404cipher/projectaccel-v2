import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const RoleDistribution: React.FC = () => {
    const labels = ["Design", "Developers", "QA", "Others"];
    const colors = ["#3B82F6", "#F97316", "#EC4899", "#8B5CF6"];
    const series = [12, 23, 18, 32];

    // Map labels, colors, and series together
    const mappedData = labels.map((label, index) => ({
        label,
        color: colors[index],
        value: series[index]
    }));

    const [state] = useState({
        series,
        options: {
            chart: {
                type: "donut" as const,
                sparkline: { enabled: true },
                events: {
                    dataPointSelection: () => false,
                    click: () => false
                },
                toolbar: {
                    show: false
                },
                selection: {
                    enabled: false
                },
                zoom: {
                    enabled: false
                },
                animations: {
                    enabled: false
                }
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: "85%",
                        stroke: {
                            width: 2,
                            colors: ['#fff']
                        },
                        dataLabels: {
                            enabled: false
                        },
                        strokeWidth: 0,
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: "16px",
                                offsetY: 20,
                            },
                            value: {
                                show: true,
                                fontSize: "28px",
                                fontWeight: 600,
                                offsetY: -20,
                            },
                            total: {
                                show: true,
                                label: "Total Members",
                                color: "#999",
                                fontSize: "16px",
                                offsetY: -10,
                                formatter: () => "72",
                            },
                        },
                    },
                },
            },
            labels,
            colors,
            stroke: {
                width: 2,
                colors: ['#fff']
            },
        }
    })
    return (
        <div className=" w-full h-full bg-[#FFFFFF] p-5 rounded-2xl flex flex-col gap-5 font-roboto font-medium ">
            <div className="text-[#242424]">Role Distribution</div>
            <div className="flex items-center justify-between gap-5 h-full">
                <div className=" pointer-events-none bg-red-500 h-[60%]">
                    <ReactApexChart options={state.options} series={state.series} type="donut" height={'100%'} width={'100%'} />
                </div>
                <div className="flex flex-col gap-2">
                    {
                        mappedData.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-md" style={{ backgroundColor: item.color }}></div>
                                <span className="text-sm font-medium">{item.label}</span>
                                <span className="text-sm font-medium">{item.value}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default RoleDistribution;
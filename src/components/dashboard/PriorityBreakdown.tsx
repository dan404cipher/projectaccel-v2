import { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";

export const PriorityBreakdown = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [chartHeight, setChartHeight] = useState(250);

    useEffect(() => {
        const updateHeight = () => {
            if (containerRef.current) {
                const container = containerRef.current;
                const headerHeight = 60; // Approximate height of the header text
                const padding = 32; // py-4 px-4 = 16px top + 16px bottom
                const remainingHeight = container.clientHeight - headerHeight - padding;
                setChartHeight(Math.max(remainingHeight, 200)); // Minimum height of 200px
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    const [state] = useState({
        series: [44, 55, 41, 17, 15],
        options: {
            chart: {
                type: "donut" as const,
                width: '100%',
                height: '100%',
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
                        size: "70%",
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
                width: 15,
                colors: ['#fff'],
                lineCap: 'round' as const,
            },
            colors: ["#67909B", "#95B2BA", "#67909B", "#C2D3D7", "#E1E9EB"],
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

    const items = [
        {
            name: "Highest",
            value: 50,
            color: "#67909B",
        },
        {
            name: "High",
            value: 40,
            color: "#95B2BA",
        },
        {
            name: "Medium",
            value: 30,
            color: "#67909B",
        },
        {
            name: "Low",
            value: 30,
            color: "#C2D3D7",
        },
        {
            name: "Lowest",
            value: 10,
            color: "#E1E9EB",
        },
    ]

    return (
        <div
            className="w-full h-full bg-card text-card-foreground shadow-sm p-4 rounded-[1.5rem] flex flex-col justify-start items-start overflow-hidden"
        >
            <div className="flex flex-col">
                <div className="text-lg font-medium">Priority Breakdown</div>
                <span className="text-base text-[#999]">
                    Priority breakdown of all projects
                </span>
            </div>
            <div className="flex-1 w-full flex ">
                <div className="w-[70%]">
                    <ReactApexChart
                        options={state.options}
                        series={state.series}
                        type="donut"
                        height={'100%'}
                        width={'100%'}
                    />
                </div>
                <div className="flex flex-col justify-center gap-4 w-[30%]">
                    {
                        items.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full" style={{ border: `3px solid ${item.color}` }}></div>
                                <span className="text-sm font-medium">{item.name}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/*
            <div className=" flex flex-1 bg-red-500 overflow-hidden">
                <div className=" bg-pink-500 w-[50%]">
              
                </div>
               
                <div className="flex flex-col gap-4 bg-violet-500">
                    {
                        items.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full" style={{ border: `3px solid ${item.color}` }}></div>
                                <span className="text-sm font-medium">{item.name}</span>
                            </div>
                        ))
                    }
                </div>
            </div> */}
        </div>
    );
};

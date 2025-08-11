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
             colors: ["#FBBF24", "#3B82F6", "#EF4444", "#22C55E", "#86EFAC"],
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
             value: 44,
             color: "#FBBF24",
         },
         {
             name: "High",
             value: 55,
             color: "#3B82F6",
         },
         {
             name: "Medium",
             value: 41,
             color: "#EF4444",
         },
         {
             name: "Low",
             value: 17,
             color: "#22C55E",
         },
         {
             name: "Lowest",
             value: 15,
             color: "#86EFAC",
         },
     ]

    return (
        <div
            ref={containerRef}
            className="w-full min-h-[325px] bg-card text-card-foreground shadow-sm pt-4 px-4 rounded-[1.5rem] flex flex-col justify-start items-start overflow-hidden"
        >
            <div className="flex flex-col">
                <div className="text-lg font-medium">Priority Breakdown</div>
                <span className="text-base text-[#999]">
                    Priority breakdown of all projects
                </span>
            </div>
            <div className=" flex items-center">
                <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="donut"
                    height={chartHeight}
                    width={"89%"}
                />
                <div className="flex flex-col gap-4">
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
        </div>
    );
};

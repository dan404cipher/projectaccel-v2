    import { useState, useRef, useEffect } from "react";
    import ReactApexChart from "react-apexcharts";

    const TypeOfWork = () => {
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
        series: [
        {
            data: [80, 35, 120, 160], // Bar lengths
        },
        ],
        options: {
        chart: {
            type: "bar" as const,
            height: "100%",
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
            borderRadius: 5,
            borderRadiusApplication: "end" as const,
            horizontal: true,
            barHeight: "30px",

            },
        },
        colors: ["#648E92"],
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: ["Epic", "Story", "Task", "Bug"],
            axisBorder: { show: false },
            axisTicks: { show: false },
                labels: {
                    show: false,
                }
        },
        grid: {
            borderColor: "#e5e7eb",
            xaxis: {
            lines: { show: true }, // show vertical lines
            },
            yaxis: {
            lines: { show: false },
            },
        },
        yaxis: {
            labels: {
            style: {
                fontSize: "14px",
                fontWeight: 400,
                colors: "#111827",
            },
            },
        },
        tooltip: {
            enabled: false,
        },
        },
    });

    return (
        <div ref={containerRef} className="w-full max-h-[350px] bg-card text-card-foreground shadow-sm pt-4 px-4 rounded-[1.5rem]">
        <div className="flex flex-col">
            <div className="text-lg font-medium">Type Of Work</div>
            <span className=" text-base text-[#999]">Issues in all projects</span>
        </div>
        <div>
            <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            height={chartHeight}
            />
        </div>
        </div>
    );
    };

    export default TypeOfWork;

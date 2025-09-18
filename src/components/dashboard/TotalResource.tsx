import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TotalResource: React.FC = () => {
    const [state]=useState({
        series:[12, 23, 18, 32 ],
        options:{
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
                  size: "70%",
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
            labels: ["Design", "Developers", "QA", "Others"],
            colors: ["#3B82F6", "#F97316", "#EC4899", "#8B5CF6"], 
          }
    })
    return (
        <div className="w-full h-full bg-[#FFFFFF] p-5 rounded-2xl flex flex-col  gap-5 font-roboto font-medium">
            <div className="text-[#242424] text-xl font-medium">Total Resource</div>
            <div className=" min-h-[250px] max-h-[250px] pointer-events-none">
            <ReactApexChart options={state.options} series={state.series} type="donut" height={'100%'} width={'100%'} />
            </div>
        </div>
    )
}

export default TotalResource;

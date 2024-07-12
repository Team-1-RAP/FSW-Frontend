import { BarChartProps } from "./types";
import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

export const BarChart = ({ data }: BarChartProps) => {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        align: "end",
        labels: {
          usePointStyle: true,
          color: "#718EBF",
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: false,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#718EBF",
        },
      },
      y: {
        beginAtZero: true,
        border: {
          display: false,
        },
        ticks: {
          color: "#718EBF",
        },
      },
    },
  };
  return (
    <div className="p-4 rounded-3xl shadow-lg bg-white">
      <Bar data={data} options={options} />
    </div>
  );
};

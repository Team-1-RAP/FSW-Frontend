export interface BarChartProps {
    data: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
        borderRadius: number;
        categoryPercentage: number;
        barPercentage: number;
        borderSkipped: boolean;
      }[];
    };
    ariaLabel: string;
  }
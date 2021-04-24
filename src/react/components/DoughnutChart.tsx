import Chart from 'chart.js';
import React, { useEffect, useRef, useState } from 'react'

interface Props {
  className: string,
  data: Chart.ChartData,
}

const DonutChart = (props: Props) => {
  const [chart, setChart] = useState<Chart>();
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const newChart = new Chart(chartRef.current, {
      type: 'doughnut',
      data: props.data,
      options: {
        animation: {
          duration: 1500,
        },
        legend: {
          display: false,
        }
      }
    })
    setChart(newChart);
  }, [chartRef])

  useEffect(() => {
    if (!chart) return;
    chart.data.labels = props.data.labels;
    chart.data.datasets = props.data.datasets;
    chart.update();
  }, [props.data])

  return (
    <canvas
      className={props.className}
      ref={chartRef}
    />
  )
}

export default DonutChart

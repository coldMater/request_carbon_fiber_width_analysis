import React, { useCallback } from 'react';
import { Line } from 'react-chartjs-2'

interface IChart{
    data: Number[];
    color: string;
}

const Chart: React.FC<IChart> = ({data, color}) => {
    const chartData = {
        labels: Array(data.length),
        datasets: [
            {
                pointBackgroundColor: color,
                pointBorderColor: color,
                fill: false,
                data: data,
                linetension: 0,
                showLine: false,
                pointRadius: 2.5,
            }
        ],
    }
    const option = {
        animation: false,
        tooltips: false,
        legend: false,
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                },
            }],
        }
    }
    return (
        <Line options={option} data={chartData} width={800} height={200}/>
    )
}

export default Chart;
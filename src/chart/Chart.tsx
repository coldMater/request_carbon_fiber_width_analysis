import React, { useCallback } from 'react';
import { Line } from 'react-chartjs-2'

interface IChart{
    data: Number[];
    color: string;
}

const Chart: React.FC<IChart> = ({data, color}) => {
    const chartData = {
        type: 'line',
        labels: Array(3001).fill(0).map((value, index)=>index),
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
                ticks: {
                    autoSkip: false,
                    callback: function(value: any, index: any, values: any) {
                        if(value%500==0){
                            return value;
                        }
                        return null;
                    },
                    maxRotation: 0,
                }
            }],
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 18,
                }
            }]

        }
    }
    return (
        <Line options={option} data={chartData} width={800} height={200}/>
    )
}

export default Chart;
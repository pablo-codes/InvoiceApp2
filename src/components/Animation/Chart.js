import React from 'react'
import './Chart.css'
import { Chart as ChartJs } from 'chart.js/auto'
import { Bar, Pie } from 'react-chartjs-2'
import ChartComponent from './Chart2'

const Charts = () => {

    const config = {
        type: 'line',
        options: {
            responsive: true,
            elements: {
                line: { tension: '0.4' }
            },

            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Total Impression'
                }
            }
        },
    };
    return (
        <div className='cont'  >
            <div className='chart1'>
                <ChartComponent />
            </div>

            <div className='cont2'>
                <div className=' chart2'>
                    <Bar data={{ labels: ['Impression', 'Click', 'View'], datasets: [{ labels: ['Impression', 'Click', 'View'], borderColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 159, 64)'], backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 159, 64)'], data: [200, 300, 400] }] }} options={config.options} />

                </div>
                <div className='chart2'>
                    <Pie data={{ labels: ['Impression', 'Click', 'View'], datasets: [{ borderColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 159, 64)'], backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 159, 64)'], data: [200, 300, 400] }] }} options={config.options} />
                </div>
            </div>

        </div>
    )
}

export default Charts
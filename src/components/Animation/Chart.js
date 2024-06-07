import React from 'react'
import './Chart.css'
import { Chart as ChartJs } from 'chart.js/auto'
import { Bar, Doughnut, Line } from 'react-chartjs-2'

const Charts = () => {
    return (
        <div className='cont'  >
            <div className='chart1'>
                <p> Chart 1</p>
            </div>
            <div className='cont2'>
                <div className=' chart2'>
                    <Bar data={{ labels: ['A', 'B', 'C'], datasets: [{ label: 'Revenue', data: [200, 300, 400] }] }} />

                </div>
                <div className='chart2'>
                    chart3
                </div>
            </div>

        </div>
    )
}

export default Charts
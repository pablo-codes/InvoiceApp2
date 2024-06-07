import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import Utils from './Util.js';
import 'chartjs-adapter-luxon';

const ChartComponent = () => {
    const chartRef = useRef(null);

    const actions = [
        {
            name: 'Randomize',
            handler() {
                const chart = chartRef.current;
                chart.data.datasets.forEach(dataset => {
                    dataset.data = Utils.numbers({ count: chart.data.labels.length, min: -100, max: 100 });
                });
                chart.update();
            }
        },
        {
            name: 'Add Dataset',
            handler() {
                const chart = chartRef.current;
                const data = chart.data;
                const dsColor = Utils.namedColor(chart.data.datasets.length);
                const newDataset = {
                    label: 'Dataset ' + (data.datasets.length + 1),
                    backgroundColor: Utils.transparentize(dsColor, 0.5),
                    borderColor: dsColor,
                    data: Utils.numbers({ count: data.labels.length, min: -100, max: 100 }),
                };
                chart.data.datasets.push(newDataset);
                chart.update();
            }
        },
        {
            name: 'Add Data',
            handler() {
                const chart = chartRef.current;
                const data = chart.data;
                if (data.datasets.length > 0) {
                    data.labels = Utils.months({ count: data.labels.length + 1 });

                    for (let index = 0; index < data.datasets.length; ++index) {
                        data.datasets[index].data.push(Utils.rand(-100, 100));
                    }

                    chart.update();
                }
            }
        },
        {
            name: 'Remove Dataset',
            handler() {
                const chart = chartRef.current;
                chart.data.datasets.pop();
                chart.update();
            }
        },
        {
            name: 'Remove Data',
            handler() {
                const chart = chartRef.current;
                chart.data.labels.splice(-1, 1); // remove the label first

                chart.data.datasets.forEach(dataset => {
                    dataset.data.pop();
                });

                chart.update();
            }
        }
    ];

    const DATA_COUNT = 7;
    const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

    const labels = Utils.months({ count: 7 });
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: Utils.numbers(NUMBER_CFG),
                borderColor: Utils.CHART_COLORS.red,
                backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
            },
            {
                label: 'Dataset 2',
                data: Utils.numbers(NUMBER_CFG),
                borderColor: Utils.CHART_COLORS.blue,
                backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
            }
        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Line Chart'
                }
            }
        },
    };

    return (
        <div>
            <Line ref={chartRef} data={data} options={config.options} />
            <div>
                {actions.map((action, index) => (
                    <button key={index} onClick={action.handler}>{action.name}</button>
                ))}
            </div>
        </div>
    );
};

export default ChartComponent;


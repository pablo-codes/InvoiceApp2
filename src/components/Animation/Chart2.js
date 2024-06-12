import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import Utils from './Util.js';
import 'chartjs-adapter-luxon';

const ChartComponent = () => {
    const chartRef = useRef(null);


    useEffect(() => {
        const chart = chartRef.current;

        if (chart) {


            chart.update();
        }
    }, []);
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
    const getGradient = (ctx, chartArea, color) => {
        const chartWidth = chartArea.right - chartArea.left;
        const chartHeight = chartArea.bottom - chartArea.top;
        let gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.7, 'white');
        return gradient;
    };

    const DATA_COUNT = 30;
    const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

    const labels = Utils.months({ count: 30 });
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Impression',
                fill: 'start',
                pointStyle: false,
                data: Utils.numbers(NUMBER_CFG),
                borderColor: Utils.CHART_COLORS.red,
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        // This case happens on initial chart load
                        return;
                    }
                    return getGradient(ctx, chartArea, Utils.CHART_COLORS.red);
                },
            },
            {
                label: 'Click',
                fill: 'start',
                pointStyle: false,
                data: Utils.numbers(NUMBER_CFG),
                borderColor: Utils.CHART_COLORS.blue,
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        // This case happens on initial chart load
                        return;
                    }
                    return getGradient(ctx, chartArea, Utils.CHART_COLORS.blue);
                },
            }, {
                label: 'View',
                fill: 'start',
                pointStyle: false,
                data: Utils.numbers(NUMBER_CFG),
                borderColor: Utils.CHART_COLORS.orange,
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        // This case happens on initial chart load
                        return;
                    }
                    return getGradient(ctx, chartArea, Utils.CHART_COLORS.orange);
                },
            }
        ]
    };

    const config = {
        type: 'line',
        data: data,
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


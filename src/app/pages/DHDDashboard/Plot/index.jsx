import React from 'react'
import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip
} from 'chart.js'
import { Line } from 'react-chartjs-2'

import './Plot.scss'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)

export function Plot() {
	// const { graphInformation } = props

	let xAxes = [1, 2, 3, 4, 5]
	const yAxes = [1, 2, 3, 4, 5]
	console.log('	const yAxes = [1, 2, 3, 4, 5')
	// graphInformation.map(datum => xAxes.push(datum.x))
	// graphInformation.map(datum => yAxes.push(datum.y))

	// xAxes = xAxes.map(datum => {
	// 	const milliseconds = datum * 1000
	// 	const dateObject = new Date(milliseconds)
	// 	const humanDateFormat = dateObject.toLocaleString([], {
	// 		hour12: false
	// 	})
	// 	return humanDateFormat
	// })
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top'
			},
			title: {
				display: true,
				text: 'Lastest activity'
			}
		}
	}
	const data = {
		labels: xAxes,
		datasets: [
			{
				label: 'CO2',
				data: yAxes,
				borderColor: 'rgba(243, 114, 181, 0.8)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)'
			}
		]
	}
	return <Line options={options} data={data} />
}

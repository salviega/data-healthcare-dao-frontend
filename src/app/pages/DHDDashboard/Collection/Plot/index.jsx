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

export function Plot (props) {
  const { information } = props

  const bmp = []
  const spo2 = []
  const date = []

  console.log('information: ', information)

  for (const key in information.bpm) {
    if (information.bpm.hasOwnProperty(key)) {
      bmp.push(information.bpm[key])
      spo2.push(information.spo2[key])
      date.push(information.date[key])
    }
  }

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
    labels: date,
    datasets: [
      {
        label: 'BMP',
        data: bmp,
        borderColor: 'rgba(243, 114, 181, 0.8)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'SPO2',
        data: spo2,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  }
  return <Line options={options} data={data} />
}

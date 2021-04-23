import React from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'


const brandUsersRevoked = getStyle('totalUser') || '#f1416c'

const MainChartExample = attributes => {
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const defaultDatasets = (() => {
    let elements = 27
    const data1 = []
    const data2 = []
    const data3 = []
    for (let i = 0; i <= elements; i++) {
      data1.push(random(50, 200))
      data2.push(random(80, 100))
      data3.push(65)
    }
    return [
      {
        label: 'TotalUsers',
        backgroundColor: hexToRgba(brandUsersRevoked, 6),
        borderColor: brandUsersRevoked,
        pointHoverBackgroundColor: brandUsersRevoked,
        borderWidth: 1,
        data: data3 
      }
    ]
  })()

  const defaultOptions = (() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
        position: 'bottom', 
        
      },
      scales: {
        vAxis: {
          title: 'My title',
          gridlines: {
            count: 10
          }
        },
        hAxis: {
          title: 'title hAxis',
          gridlines: {
            color: 'transparent'
          }
        },
      
        xAxes: [{
          gridLines: {
            drawOnChartArea: false
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(250 / 5),
            max: 250
          },
          gridLines: {
            display: true,
            color: '#e4e6ef',
            borderDash: [4]
          }
        }]
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
      tooltip: {
        enabled: true,
        position: 'nearest',
        text: (ctx) => 'Tooltip position mode: ' + ctx.chart.options.plugins.tooltip.position,
      }
    }
  }
  )()

  // render
  return (
    <CChartLine
      {...attributes}
      datasets={defaultDatasets}
      options={defaultOptions}
      labels={['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']}
    />
  )
}


export default MainChartExample

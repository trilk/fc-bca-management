import React from 'react'
import PropTypes from 'prop-types'
import { getColor } from '@coreui/utils'
import { CChartBar } from '@coreui/react-chartjs'
import { CCard, CCardBody, CCol } from '@coreui/react'

const ChartBarSimple = props => {

  const {
    backgroundColor,
    pointHoverBackgroundColor,
    dataPoints,
    label,
    pointed,
    ...attributes
  } = props

  const defaultDatasets = (() => {
    return [
      {
        data: dataPoints,
        backgroundColor: getColor(backgroundColor),
        pointHoverBackgroundColor: getColor(pointHoverBackgroundColor),
        label: label,
        barPercentage: 0.4,

        categoryPercentage: 1
      }
    ]
  })()

  const defaultOptions = (() => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false
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
    }
  })()

  // render
  return (
    <>
      <CCol xl={6}>
        <CCard>
          <CCardBody>
            <h4 className="pb-3">Delivery Statistics</h4>
            <CChartBar
              {...attributes}
              datasets={defaultDatasets}
              options={defaultOptions}
              labels={['0h','4h','8h','12h','16h','20h','24h' ]}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}

ChartBarSimple.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  //
  backgroundColor: PropTypes.string,
  pointHoverBackgroundColor: PropTypes.string,
  dataPoints: PropTypes.array,
  label: PropTypes.string,
  pointed: PropTypes.bool
};

ChartBarSimple.defaultProps = {
  backgroundColor: '#009ef7',
  dataPoints: [10, 22, 34, 46, 58, 70, 46, 23, 45, 78, 34, 12],
  label: 'Delivered'
};

export default ChartBarSimple

import propTypes from 'prop-types'
import { merge } from 'lodash'
import ReactApexChart from 'react-apexcharts'
//
import BaseOptionChart from './BaseOptionChart'

// ----------------------------------------------------------------------

// const CHART_DATA = [{ data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380] }]

ChartBar.propTypes = {
  data: propTypes.array.isRequired,
}

export default function ChartBar({ data }) {
  const chartData = {
    categories: data.map((item) => item.name),
    data: [
      {
        name: 'Số học viên',
        data: data.map((item) => Number(item.total)),
      },
    ],
  }
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { show: false },
    plotOptions: {
      bar: { horizontal: true, barHeight: '30%' },
    },
    xaxis: {
      categories: chartData.categories,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} học viên`,
      },
    },
  })

  return <ReactApexChart type="bar" series={chartData.data} options={chartOptions} height={320} />
}

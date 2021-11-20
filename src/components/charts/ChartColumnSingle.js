import propTypes from 'prop-types'
import { merge } from 'lodash'
import ReactApexChart from 'react-apexcharts'
//
import BaseOptionChart from './BaseOptionChart'

// ----------------------------------------------------------------------

// const CHART_DATA = [{ name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] }]

ChartColumnSingle.propTypes = {
  data: propTypes.array.isRequired,
}

export default function ChartColumnSingle({ data }) {
  const chartData = [
    {
      name: 'Số học viên',
      data: data.map((item) => Number(item.total)),
    },
  ]

  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: '16%' } },
    stroke: { show: false },
    xaxis: {
      categories: data.map((item) => item.name),
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} học viên`,
      },
    },
  })

  return <ReactApexChart type="bar" series={chartData} options={chartOptions} height={320} />
}

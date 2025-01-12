import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts"

interface options extends ApexOptions {
  options?: Object
}
const Charts = ({ data , type}) => {
  const [state, setState] = React.useState<options>({
    options: {
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined
        },
      chart: {
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        },
        type: "bar",
        height: 410,
        animations: {
          enabled: false
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top'
          }
        },
        dataLabels: {
          enabled: true,
          style: {
              colors: ['#000']
          },
          offsetY: 30
        },
        horizontal: false,

      },
      dataLabels: {
        enabled: false,

      },
      stroke: {
        width: 2,
        colors: ['#000'],
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 3,
        opacity: 0.5
      },


      yaxis: {

        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: true
        },

      },
      grid: {
        position: "back"
      },
      fill: {
        colors: ["#000"]
      }
      //   fill: {
      //     type: 'image',
      //     opacity: 0.87,
      //     image: {
      //       src: 'https://cdn.pixabay.com/photo/2023/10/08/17/04/swirls-8302543_1280.jpg',
      //       width: 600,
      //       height: 600,
      //     },
      //   },
    },


  });
  const [series, setseries] = useState([{
    name: 'Expense',
    data: []
  }])
  useEffect(() => {
    switch(type){
      case 'pie':
        setseries(data.series)
        
      break;
      default:
        setseries(data)
    }
  }, [data])

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={state.options} series={series} type="bar" height={410} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
export default Charts
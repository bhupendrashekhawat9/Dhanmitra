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
          type: 'image',
          opacity: 0.87,
          image: {
            src: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFic3RyYWN0fGVufDB8fDB8fHww',
            width: 600,
            height: 600,
          },
        },
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
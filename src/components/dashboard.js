import React, {Component} from 'react';
import ReactApexChart from 'react-apexcharts';

class dashboard extends Component {
    constructor(props) {
      super(props);
        const propertyStatus = Object.keys(props.status);
        console.log(props.pending, props.opened, props.closed, props.suspended, props.deleted)

      this.state = {
      
        series: [props.pending, props.opened, props.closed, props.suspended, props.deleted],
        // series: [15,309,83,72],
        options: {
          chart: {
            height: 350,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  fontSize: '22px',
                },
                value: {
                  fontSize: '16px',
                },
                total: {
                  show: true,
                  label: 'Total',
                  formatter: function (w) {
                    // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                    return props.pending + props.opened +  props.closed + props.suspended + props.deleted
                    
                  }
                }
              }
            }
          },
          labels: propertyStatus,
        },
      
      
      };
    }

  

    render() {
      return (
        

  <div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={350} />
</div>
)
      }
    }
export default dashboard;

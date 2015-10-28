var React = require('react');
var ChartistGraph = require('react-chartist');
var moment = require('moment');

// This is a "dumb" component
// It simply renders what is passed down to it

var LeaderChart = React.createClass({
    
  render: function() {
    
    var labelNames = this.props.series.map(function(s, index) {
      return <li className={"username ct-series-" + (index + 1)} key={s.key}>{s.name}</li>;
    });
    
    // These should be props?
    var options = {
      high: 300,
      low: -200,
      height: '500px',
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return moment(value).format('MMM DD YYYY');
        }
      }
    };
    
    var data = {
      labels: this.props.labels,
      series: this.props.series
    };
    
    return (
      <section id="mmr-line-chart">
        <ChartistGraph data={data} options={options} type="Line" />
        <ul>
          {labelNames}
        </ul>
      </section>
    );
  }
  
});


module.exports = LeaderChart;

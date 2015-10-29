var React = require('react');
var ChartistGraph = require('react-chartist');
var moment = require('moment');
var $ = require('jquery');

// This is a dumb component
// It simply renders what is passed down to it

var LeaderChart = React.createClass({
  
  onMouseOver: function(index, target) {
    var animation = {
      'animation': 'hover .5s ease-in forwards'
    };
    
    var $series = $(`g.ct-series-${index}`);
    var $parent = $series.parent();
    var $line = $series.children(`.ct-line`);
    var $points = $series.children(`line`);
    
    // svg z-index is controlled by dom order. moving the $series to the back
    // renders it on top
    $series.appendTo($parent);
    $line.css(animation);
  },
  
  onMouseLeave: function(index, target) {
    // $(`g.ct-series`).children('line, .ct-line').removeAttr('style');
    // $(`g.ct-series-${index}`).children('line, .ct-line').removeAttr('style');
    var animation = {
      'animation': 'leave .5s ease-in forwards'
    };
    
    var $series = $(`g.ct-series-${index}`);
    var $line = $series.children(`.ct-line`);
    var $points = $series.children(`line`);
    
    $line.css(animation);
  },
  
  render: function() {
    
    var labelNames = this.props.series.map((s, index) => {
      return (
        <li 
          ref={"li-" + index}
          onMouseOver={this.onMouseOver.bind(null, index + 1)}
          onMouseLeave={this.onMouseLeave.bind(null, index + 1)}
          className={"username ct-series-" + (index + 1)}
          key={s.key}
        >
          {s.name}
        </li>
      );
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

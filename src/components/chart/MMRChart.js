var React = require('react');
var ChartistGraph = require('react-chartist');
var moment = require('moment');
var $ = require('jquery');

var MMRViewActions = require('../../actions/MMRViewActions');
var MatchList = require('../matchlist/MatchList');

var CHART_Y_PADDING = 30;
var $toolTip;

var LeaderChart = React.createClass({
  
  shouldComponentUpdate: function(nextProps, nextState) {
    return true;
  },
  
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
  
  componentDidMount: function() {
    
    var $chart = $('.ct-chart');

    $toolTip = $chart
      .append('<div class="tooltip"></div>')
      .find('.tooltip')
      .hide();
  },
  
  componentDidUpdate: function() {
    var component = this;
    var $chart = $('.ct-chart');
    
    $chart.on('mouseenter', '.ct-point', function() {
      var $point = $(this);
      
      var seriesName = $point.parent().attr('ct:series-name');
      var value = $point.attr('ct:value');
      
      var index = $point.parent().children().filter('.ct-point').index($point);
      var account = component.props.accounts.find(function(account) {
        return account.username === seriesName;
      });
      
      var matchList = account[index];
      
      $toolTip.html(seriesName + '<br>' + value + '<br>' + matchList.endingMMR).show();
      
      MMRViewActions.showHoveredMatchList(matchList);
    });
    
    $chart.on('mouseleave', '.ct-point', function() {
      MMRViewActions.hideHoveredMatchList();
      $toolTip.hide();
    });
  },
  
  render: function() {
    console.log('chart is rerendering');
    
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
      high: this.props.maxY + CHART_Y_PADDING,
      low: this.props.minY - CHART_Y_PADDING,
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
    
    if (this.props.selectedDay) {
      console.log('day is hovered...');
    }
      
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

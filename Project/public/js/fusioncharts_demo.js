var chartData;

$(document).ready(function(){
  $.ajax({

    url: 'http://localhost:3000/users/getGraphs',
    type: 'GET',
    success : function(data) {
      chartData = data;
      

      var chartProperties = {
        "caption": "Variation of your nutrition levels with date",
        "xAxisName": "Date (mm/dd)",
        "yAxisName": "Nutrition Value"
      };

      var categoriesArray = [{
          "category" : data["categories"]
      }];

      var lineChart = new FusionCharts({
        type: 'msline',
        renderAt: 'chart-location',
        width: '700',
        height: '400',
        dataFormat: 'json',
        dataSource: {
          chart: chartProperties,
          categories : categoriesArray,
          dataset : data["dataset"]
        }
      });
      lineChart.render();
    }
  });
});


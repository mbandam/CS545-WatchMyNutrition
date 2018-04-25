var chartData;



$(document).ready(function(){
  let selectedValue="";
  $("input[type='radio']").on('change', function () {

  $.ajax({
    
    url: 'http://localhost:3000/users/getGraphs',
    type: 'GET',
    data: { 
      type: $("input[name='timeline']:checked").val()
    },
    success : function(data) {
      chartData = data;
      
      console.log("Corr" +data["dataset"][1].corr);
      var chartProperties = {
        "caption": "Variation of your Nutrition levels and Weight with date",
        "xAxisName": "Date (mm/dd)",
        "pYAxisName": "Nutrition Value",
        "sYAxisName": "Weight (in lbs)",
        "pYAxisMaxValue": "10",
        "pYAxisMinValue": "0",
        "paletteColors": "#0075c2,#1aaf5d,#f2c500",
        "captionFont": "Arial",
        "captionFontSize": "35",
        "captionFontColor": "#08648e",
        "captionFontBold": "1",
        "xAxisNameFont": "Arial",
        "xAxisNameFontSize": "20",
        "xAxisNameFontColor": "#08648e",
        "xAxisNameFontBold": "1",
        "xAxisNameFontItalic": "1",
        "yAxisNameFont": "Arial",
        "yAxisNameFontSize": "20",
        "yAxisNameFontColor": "#08648e",
        "yAxisNameFontBold": "1",
        "yAxisNameFontItalic": "1",
            "baseFontColor": "#333333",
            "baseFont": "Helvetica Neue,Arial",
            "captionFontSize": "14",
            "subcaptionFontSize": "14",
            "subcaptionFontBold": "0",
            "showBorder": "0",
            "bgColor": "#ffffff",
            "showShadow": "0",
            "canvasBgColor": "#ffffff",
            "canvasBorderAlpha": "0",
            "divlineAlpha": "100",
            "divlineColor": "#999999",
            "divlineThickness": "1",
            "divLineIsDashed": "1",
            "divLineDashLen": "1",
            "divLineGapLen": "1",
            "usePlotGradientColor": "0",
            "showplotborder": "0",
            "showXAxisLine": "1",
            "xAxisLineThickness": "1",
            "xAxisLineColor": "#999999",
            "showAlternateHGridColor": "0",
            "showAlternateVGridColor": "0",
            "legendBgAlpha": "0",
            "legendBorderAlpha": "0",
            "legendShadow": "0",
            "legendItemFontSize": "20",
            "labelFontSize": "13",
            "legendItemFontColor": "#666666",
            "showBorder": "1",
            "borderThickness": "2",
            "borderAlpha": "80",
            "bgColor": "#DDDDDD",
            "bgAlpha": "50",
            "setAdaptiveYMin":"1",
      };

     
      var categoriesArray = [{
          "category" : data["categories"]
      }];

      var lineChart = new FusionCharts({
        type: 'mscombidy2d',
        renderAt: 'chart-location',
        width: '800',
        height: '500',
        dataFormat: 'json',
        dataSource: {
          chart: chartProperties,
          categories : categoriesArray,
          dataset : data["dataset"]
        }
      });

     
      if(data["categories"].length > 0){
        lineChart.render();
        $("#error").hide();
      }
      else{
        lineChart.render();
        $("#error").show();
      }
     
    }
  });

  
});
  $.ajax({

    url: 'http://localhost:3000/users/getGraphs',
    type: 'GET',
    data: { 
      type: $("input[name='timeline']:checked").val()
    },
    success : function(data) {
      chartData = data;
      
      var chartProperties = {
        "caption": "Variation of your Nutrition levels and Weight with date",
        "xAxisName": "Date (mm/dd)",
        "pYAxisName": "Nutrition Value",
        "sYAxisName": "Weight (in lbs)",
        "pYAxisMaxValue": "10",
        "pYAxisMinValue": "0",
        "setAdaptiveYMin":"1",
        "paletteColors": "#0075c2,#1aaf5d,#f2c500",
        "captionFont": "Arial",
        "captionFontSize": "35",
        "captionFontColor": "#08648e",
        "captionFontBold": "1",
        "xAxisNameFont": "Arial",
        "xAxisNameFontSize": "20",
        "xAxisNameFontColor": "#08648e",
        "xAxisNameFontBold": "1",
        "xAxisNameFontItalic": "1",
        "yAxisNameFont": "Arial",
        "yAxisNameFontSize": "20",
        "yAxisNameFontColor": "#08648e",
        "yAxisNameFontBold": "1",
        "yAxisNameFontItalic": "1",
            "baseFontColor": "#333333",
            "baseFont": "Helvetica Neue,Arial",
            "captionFontSize": "14",
            "subcaptionFontSize": "14",
            "subcaptionFontBold": "0",
            "showBorder": "0",
            "bgColor": "#ffffff",
            "showShadow": "0",
            "canvasBgColor": "#ffffff",
            "canvasBorderAlpha": "0",
            "divlineAlpha": "100",
            "divlineColor": "#999999",
            "divlineThickness": "1",
            "divLineIsDashed": "1",
            "divLineDashLen": "1",
            "divLineGapLen": "1",
            "usePlotGradientColor": "0",
            "showplotborder": "0",
            "showXAxisLine": "1",
            "xAxisLineThickness": "1",
            "xAxisLineColor": "#999999",
            "showAlternateHGridColor": "0",
            "showAlternateVGridColor": "0",
            "legendBgAlpha": "0",
            "legendBorderAlpha": "0",
            "legendShadow": "0",
            "legendItemFontSize": "20",
            "labelFontSize": "13",
            "legendItemFontColor": "#666666",
            "showBorder": "1",
            "borderThickness": "2",
        "borderAlpha": "80",
        "bgColor": "#edeaea",
        "bgAlpha": "50"
      };

     
      var categoriesArray = [{
          "category" : data["categories"]
      }];

      var lineChart = new FusionCharts({
        type: 'mscombidy2d',
        renderAt: 'chart-location',
        width: '800',
        height: '500',
        dataFormat: 'json',
        dataSource: {
          chart: chartProperties,
          categories : categoriesArray,
          dataset : data["dataset"]
        }
      });

    
      if(data["categories"].length > 0){
        lineChart.render();
        $("#error").hide();
      }
      else{
        lineChart.render();
        $("#error").show();
      }
    }
  });
});


var app = getApp();

Page({
  data: {
    
  },
  onLoad: function (options) {
    var weatherData = app.globalData.g_weatherData;

    this.setData({ weatherData: weatherData});
  },
  
})
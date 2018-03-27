// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;

var app = getApp();

Page({
  data: {
    
  },
  onLoad: function(){
    var weatherData ;
    var that = this;

    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: '5G2BZ-Q7UKK-X2FJG-AI2GA-RVVVT-7FFHY'
    });
    
    // var today = new Date();
    // var timeNum = today.getHours() * 100 + today.getMinutes();
    // this.setData({ nowNum: timeNum });

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var location = res.longitude + "," + res.latitude;
        //console.log("location =" + location);
        that.lj_getWeather(location);
      }
    });
    
  },
  
  lj_getWeather: function(location){
    var that = this;

    wx.request({
      url: 'https://free-api.heweather.com/v5/weather?city=' + location+'&key=45f089df10e64f3591d88f0a2c6c7dc5',
      success: function (res) {
        console.log(res.data)
        var weatherData = res.data["HeWeather5"]["0"];
        console.log(weatherData);
        that.setData({ weatherData: weatherData });

        var sunupTime = weatherData.daily_forecast[0].astro.sr;
        sunupTime = sunupTime.replace(":", "") * 1;
        var sunsetTime = weatherData.daily_forecast[0].astro.ss;
        sunsetTime = sunsetTime.replace(":", "") * 1;
        that.setData({ sunup: sunupTime });
        that.setData({ sunset: sunsetTime });

        var today = new Date();
        var timeNum = today.getHours() * 100 + today.getMinutes();
        var nowDN;
        if (timeNum > sunsetTime || timeNum < sunupTime){
          nowDN = 'n';
        }else{
          nowDN = 'd';
        }
        that.setData({ now_dn: nowDN })

        //var hoursTime_num = [];
        var hourDN = [];
        for (var i = 0; i < weatherData.hourly_forecast.length; i++){
          var dateNum = weatherData.hourly_forecast[i].date;
          dateNum = dateNum.slice(11);
          dateNum = dateNum.replace(":","") * 1;
          //hoursTime_num[i] = dateNum;
          if (dateNum > sunsetTime || dateNum < sunupTime){
            hourDN[i] = "n";
          }else{
            hourDN[i] = "d";
          }
        }
        that.setData({ hours_dn: hourDN });
        //that.setData({ hours_num: hoursTime_num });
        
        app.globalData.g_weatherData = weatherData;

        //console.log(hoursTime_num);
        console.log(timeNum);
        console.log(hourDN);
        that.setData({ hide: "hideit" });
       
      }
    })
  },
  onShow: function () {
    // 调用接口
    qqmapsdk.getCityList({

      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  ontap1: function () {
    wx.navigateTo({
      url: 'weather-more/weather-more'
    });
  }
});
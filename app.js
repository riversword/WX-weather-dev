//app.js
App({
  onLaunch: function () {
    console.log("onLaunch");
  },
  onShow: function(){
    console.log("onShow");
    console.log(this.globalData.g_weatherData);
  },
  onHide: function(){
    console.log("onHide");
  },
  setGlobalData: function(name, value){
    this.setData({name: value});
  },
  globalData: {
    userInfo: null,
    g_weatherData: null
  }
})
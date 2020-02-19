// pages/scene/scene.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID: "",
    scene: {},
    iMade:false,
    height: 1000,
    motto: "..."
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var sceneID = options.sceneID
    //请求页面数据
    wx.request({
      url: app.globalData.host + '/getscenebysid',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        sceneID: options.sceneID
      },
      success: data => {
        var sceneInfo = data.data
        console.log(data.data)
        var d1 = new Date(data.data.startTime)
        sceneInfo.startTime = d1.getFullYear() + '-' + (d1.getMonth() + 1 < 10 ? "0" + (d1.getMonth() + 1) : d1.getMonth() + 1) + '-' + (d1.getDate() < 10 ? "0" + d1.getDate() : d1.getDate()) + ' ' + (d1.getHours() < 10 ? "0" + d1.getHours() : d1.getHours()) + ':' + (d1.getMinutes() < 10 ? "0" + d1.getMinutes() : d1.getMinutes())
        var d2 = new Date(data.data.endTime)
        sceneInfo.endTime = d2.getFullYear() + '-' + (d2.getMonth() + 1 < 10 ? "0" + (d2.getMonth() + 1) : d2.getMonth() + 1) + '-' + (d2.getDate() < 10 ? "0" + d2.getDate() : d2.getDate()) + ' ' + (d2.getHours() < 10 ? "0" + d2.getHours() : d2.getHours()) + ':' + (d2.getMinutes() < 10 ? "0" + d2.getMinutes() : d2.getMinutes())
        var ifmade = false
        if (app.globalData.userInfo.userID == data.data.originatorID) {
          ifmade =true
        }
        that.setData({
          scene: sceneInfo,
          iMade: ifmade
        })
        var scenelit = {
          sceneID: data.data.sceneID,
          theme: data.data.theme
        }
        var hasNearly = true
        wx.setStorageSync("scenelit", scenelit)
        wx.setStorageSync("hasNearly", hasNearly)
      }
    })
//设定组件高度
    let windowHeight = wx.getSystemInfoSync().windowHeight; // 屏幕的高度
    console.log(windowHeight)
    let query = wx.createSelectorQuery();
    query.select('.formHead').boundingClientRect(rect => {
      let contheight = windowHeight - rect.height;
      that.setData({
        height: contheight
      });
    }).exec();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (app.globalData.userInfo.userID == this.data.scene.originatorID) {///////maybe usable
      console.log(app.globalData.userInfo)
      this.setData({
        userID: app.globalData.userInfo.userID,
        iMade:true
      })
    }
    console.log(this.data.scene.originatorID)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var sendmsg = this.data.userInfo.userName + "邀请你参加" + this.data.scene.theme + " " + this.data.scene.message;　　 // 设置转发内容
    var that = this
    console.log(sendmsg)
    var shareObj = {
      title: sendmsg,
      path: '/pages/scene/scene?sceneID=' + that.data.scene.sceneID,
    };
  },

  nextstep(e) {
    this.setData({
      currentTab: e.target.dataset.current
    })
  },

  register(e) {
    if(this.data.userID == ""){
      wx.showModal({
        title: '请先登录再报名',
        showCancel:false,
        confirmText: "OK",
        success:function(){
          wx.navigateTo({
            url: '../userLogin/login',
          })
        }
      })
    }else{
      wx.request({
        url: '',
      })
    }
  },

})
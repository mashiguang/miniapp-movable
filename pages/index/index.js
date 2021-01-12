// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    options: [
      {id: 1, name: 'option1', y: 0, active: false},
      {id: 2, name: 'option2', y: 50, active: false},
      {id: 3, name: 'option3', y: 100, active: false},
      {id: 4, name: 'option4', y: 150, active: false}
    ]
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  touchstart(e) {
    console.log('touchstart', e)
    let id = e.currentTarget.dataset.id

    var options = this.data.options
    options.forEach(o => {
      o.active = false;
    })
    var o = options.find(o => o.id == id)
    console.log(o)
    o.active = true

    this.setData({
      options
    })

  },
  touchend(e) {
    var that = this
    console.log('touchend', e)

    wx.createSelectorQuery().selectAll('.option').boundingClientRect(rects => {
      rects.forEach(rect => {
        console.log('rect', rect)
      })

      rects.sort((a, b) => {
        return a.top - b.top
      })
      console.log('rects', rects)

      /* arr.sort((a, b) => {
        return a.top - b.top
      })
      console.log('arr', arr) */

      var options = that.data.options
      options.forEach(o => {
        var _i = rects.findIndex(r => r.dataset.id == o.id)
        o.y = _i * 50
      })
      console.log('options', options)
      /* that.setData({options}) */

      options.forEach((o, index) => {
        console.log(o)
        that.setData({
          ['options['+index+'].y'] : o.y
        })
      })

    }).exec()



  }

})

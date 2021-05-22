// pages/page2/page2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mover:{},
    moverOffset: 0,
    moverYorig: 0,
    options: [
      {id: 1, name: 'option1'},
      {id: 2, name: 'option2'},
      {id: 3, name: 'option3'},
      {id: 4, name: 'option4'}
    ]
  },

  touchstart: function(e) {
    
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var top = e.currentTarget.dataset.top;
    this.data.moverYorig = e.changedTouches[0].clientY;

    this.setData({
      'mover.id': id,
      'mover.index': index,
      'mover.top': top,
      'moverOffset': 0
    });
    
  },
  touchmove: function(e) {
    var moverYorig = this.data.moverYorig;
    var clientYcurr = e.changedTouches[0].clientY;
    this.setData({
      'moverOffset': clientYcurr - moverYorig
    });
  },
  touchend: function(e) {

    var topNow = this.data.mover.top + this.data.moverOffset;

    var target;

    for (let _i = 0; _i < this.data.options.length; _i++) {
      const opt = this.data.options[_i];
      if (topNow > opt.top && topNow < opt.bottom) {
        target = opt;
        break;
      }
    }

    if (!target) {
      this.reset();
      return;
    }

    if (target.id == this.data.mover.id) {
      this.reset();
      return;
    }

    var index = this.data.mover.index;
    var _obj = this.data.options[index];
    this.setData({
      ['options['+target.index+']'] : _obj,
      ['options['+index+']'] : target
    })
    
    this.reset();
    this.refresh();
  },
  reset: function() {
    this.setData({
      'mover': {},
      'moverOffset': 0,
      'moverYorig': 0
    });
  },
  refresh: function() {
    var vm = this;
    wx.createSelectorQuery().selectAll('.opt').boundingClientRect(rects => {
      rects.forEach((rect, index) => {
        var id = rect.dataset.id;
        var top = rect.top;
        var bottom = rect.bottom;
        var option = vm.data.options.find(opt => id == opt.id);
        option.top = top;
        option.bottom = bottom;
        option.index = index;
      })

      console.log('options', this.data.options);

      this.setData({
        'options': this.data.options
      });

    }).exec();

    
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.refresh();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
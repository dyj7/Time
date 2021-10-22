Page({
  data: {
    nickName: '',
    avatarUrl: '',
    name: '',
    password: '',
  },
  onLoad: function () {
  },
  bindGetUserInfo(e) {
    const { nickName, avatarUrl } = e.detail.userInfo;
    this.setData(nickName, avatarUrl);
  },
  async onLogin() {
    try {
      const { userInfo } = await wx.getUserProfile({ lang: 'zh_CN', desc: '获取你的头像和昵称'});
      this.setData({ avatarUrl: userInfo.avatarUrl,nickName:userInfo.nickName });
      wx.setStorageSync('nickName', userInfo.nickName)
      wx.setStorageSync('avatarUrl', userInfo.avatarUrl)
    } catch {
      wx.showToast({
        title: '未获取用户权限',
        icon: 'none',
      });
      return ;
    }
    const { name, password } = this.data;

    console.log(name, password)
    if (name !== '15666137067' || password !== '19980521') {
      wx.showToast({
        title: '账号或密码错误',
        icon: 'none',
      });
      return;
    }
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  onChangeInput(e) {
    const { type } = e.currentTarget.dataset;
    const { value } = e.detail;
    if (type === 'name') {
      this.setData({ name: value });
      return;
    }
    this.setData({ password: value });
  },
});

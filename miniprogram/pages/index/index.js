import moment from '../../libs/moment.js';

Page({
  data: {
    talks: [],
  },
  async onLoad() {
    const res = await this.getData();
    res.data.forEach((item) => {
      item.time = moment(item.time).format('YYYY[年]MM[月]DD[日] HH:mm');
    });
    this.setData({ talks: res.data });
  },
  async getData(event, context) {
    wx.cloud.init();
    const db = wx.cloud.database();
    const MAX_LIMIT = 20;
    const countResult = await db.collection('talks').count();
    const total = countResult.total;
    const batchTimes = Math.ceil(total / MAX_LIMIT);
    const tasks = [];
    for (let i = 0; i < batchTimes; i++) {
      const promise = db
        .collection('talks')
        .skip(i * MAX_LIMIT)
        .limit(MAX_LIMIT)
        .get();
      tasks.push(promise);
    }
    return (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      };
    });
  },
});

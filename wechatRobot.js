const axios = require("axios");
const moment = require("moment");

// 企业微信机器人的 Webhook 地址
const webhook_url =
  "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=9f02e48d-5c7e-4270-bb97-6bea1f0425ed";

// 计算每个月 23 号（含）前的最近一个工作日
function getNearestWorkday() {
  const today = moment();
  const targetDate = moment().date(23);

  if (today.isAfter(targetDate)) {
    targetDate.add(1, "month");
  }

  const diff = targetDate.diff(today, "days");
  const weekdays = Math.floor(diff / 7) * 5;
  const weekendDays = diff % 7;

  if (weekendDays > 5) {
    return targetDate.subtract(weekendDays - 5, "days").format("YYYY-MM-DD");
  } else {
    return targetDate.format("YYYY-MM-DD");
  }
}

// 发送消息的函数
async function sendMessage() {
  try {
    const message = {
      msgtype: "text",
      text: {
        content: "注意！今天是23号的前一个工作日~",
      },
    };

    const sendResponse = await axios.post(webhook_url, message);
    console.log(sendResponse.data);
  } catch (error) {
    console.error(error);
  }
}

// 运行
async function run() {
  const nearestWorkday = getNearestWorkday();
  console.log(`Attention! today is: ${nearestWorkday}`);

  if (moment().isSameOrBefore(nearestWorkday, "day")) {
    await sendMessage();
  } else {
    console.log("No message sent today.");
  }
}

run();

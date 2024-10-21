const axios = require("axios");
const moment = require("moment");

// 企业微信机器人的 Webhook 地址
const webhook_url =
  "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=9f02e48d-5c7e-4270-bb97-6bea1f0425ed";

// 计算每个月 23 号（含）前的最近一个工作日
function getNearestWorkday() {
  const targetDate = moment().date(23);

  if (targetDate.isoWeekday() === 7) {
    // 如果目标日期是周日，则将其向前推两天
    targetDate.subtract(2, "days");
  }else if (targetDate.isoWeekday() === 1) {
    // 如果目标日期是周一，则将其向前推三天
    targetDate.subtract(3, "days");
  }
  // 其余都直接减去一天
  targetDate.subtract(1, "days");
  return targetDate.format("YYYY-MM-DD");
}

// 发送消息的函数
async function sendMessage() {
  try {
    const message = {
      msgtype: "text",
      text: {
        // content: "又到了该填工资表领窝囊费的日子了（尖叫扭曲爬行）",
        content: "又来测试代码了",
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
  console.log(`Attention! nearestWorkday is: ${nearestWorkday}`);

  if (moment().isSame(nearestWorkday, "day")) {
    await sendMessage();
    console.log("今天就是23号的前一个工作日");
  } else {
    console.log("No message sent today.");
  }
}

run();

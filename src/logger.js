import log4js from "log4js";

log4js.configure({
  appenders: {
    tiphone: {
      type: "dateFile",
      filename: "logs/tiphone.log",
      maxLogSize: 1024 * 1024 * 1024,
      numBackups: 30,
    },
    console: {
      type: "stdout",
    },
  },
  categories: {
    default: {
      appenders: ["tiphone", "console"],
      level: "trace",
    },
  },
  pm2: true,
});

export const tiphoneLog = log4js.getLogger();

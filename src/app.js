import "dotenv/config";
import express from "express";
import fs from "fs";
import { tiphoneApi } from "./axios.js";
import { tiphoneLog } from "./logger.js";
import { encrypt, getDateTime } from "./utils.js";

const privateKey = fs.readFileSync('./key.pem');
const app = express();

app.use(express.json());

app.post("/tiphone/api", async (req, res) => {

  const { version, functionHead, path, body } = req.body;

  let local = getDateTime();

  const original_data = {
    head: {
      version: `${version}`,
      key: `${process.env.TIPHONE_SECRET_KEY}`,
      clientId: `${process.env.TIPHONE_CLIENT_ID}`,
      function: `${functionHead}`,
      reqTime: `${local.toISOString()}`,
      reqMsgId: `${Math.round(local.getTime() / 1000)}`,
    },
    body: body
  }

  const data = Buffer.from(JSON.stringify(original_data));

  const signature = encrypt(data, privateKey)

  const final_data = {
    request: original_data,
    signature: signature,
  }

  tiphoneLog.info("[request_data]", JSON.stringify(final_data));

  tiphoneApi.post(`${path}`, JSON.stringify(final_data))
    .then(response => {
      tiphoneLog.info("[response_success]", JSON.stringify(response.data));
      res.json(response.data);
    })
    .catch(e => {
      tiphoneLog.error("[catch_error]", JSON.stringify(e));
      res.json(e);
    });

});

app.listen(process.env.PORT, process.env.IP_SERVER).on("listening", () => {
  console.log(`🚀 are live on ${process.env.PORT}`);
});

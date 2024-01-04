import axios from "axios";
import fs from "fs";
import path from "path";
import chalk from 'chalk'
import FormData from "form-data";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const debugConfig = require("../settings/config.json");

axios.interceptors.response.use((res) => {
  return res.data;
});

const baseUrl = debugConfig.debugUrl;

function uploadZip() {
  let params = {};
  let formData = new FormData();
  let cwd = process.cwd();
  formData.append(
    "File",
    fs.createReadStream(path.join(cwd, "output", "dist.zip"))
  );
  formData.append("AppId", debugConfig.appId);
  formData.append("Name", debugConfig.label);
  formData.append("Code", `${debugConfig.namespace}${debugConfig.name}${debugConfig.debugSuffix}`);
  formData.append("Platform", debugConfig.platform);
  axios
    .post(`${baseUrl}CodeComponent/UploadDebugCodeComponent`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
      params,
    })
    .then((res) => {
      if(res.errcode === 0) {
        console.log(chalk.green("代码上传成功！"))
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
uploadZip();

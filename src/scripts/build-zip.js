import fs from "fs";
import path from "path";
import archiver from "archiver";
import chalk from "chalk";
import ora from "ora";
import { execa } from "execa";
import { copyConfig, copyDist } from "./copy.js";
import { emptyDir } from "./utils.js";

const cwd = process.cwd();

const args = process.argv.slice(2)

console.log(args)

const target = ["temp"];

if (!fs.existsSync(path.join(cwd, target[0]))) {
  fs.mkdirSync(path.join(cwd, target[0]));
} else {
  emptyDir(path.join(cwd, target[0]));
}

if(args && args[0] === 'debug') {
  await execa("npm", ["run", "build:debug"]);
  copyDist("dev");
}else{
  await execa("npm", ["run", "build:dev"]);
  copyDist("dev");
  await execa("npm", ["run", "build:prod"]);
  copyDist("prod");
}




copyConfig();

const spinner = ora("代码压缩");
spinner.start();

if (!fs.existsSync(path.join(cwd, "output"))) {
  fs.mkdirSync(path.join(cwd, "output"));
}

const output = fs.createWriteStream(path.join(cwd, "output", "/dist.zip"));
const archive = archiver("zip", {
  zlib: { level: 9 },
});

archive.on("error", function (err) {
  spinner.fail();
  throw err;
});

output.on("close", function () {
  spinner.succeed();
  console.log(
    chalk.green(`
     --------- ---------压缩完毕--------- ---------
     生成文件大小${(archive.pointer() / 1024).toFixed(1)}kB
     请在当前项目路径下寻找 dist.zip 文件,系统路径为 ${cwd}\\output\\dist.zip
     `)
  );
});

archive.pipe(output);
for (let i of target) {
  archive.directory(i, false);
}
archive.finalize();

import fs from "fs";
const emptyDir = (path) => {
  const files = fs.readdirSync(path);
  files.forEach((file) => {
    const filePath = `${path}/${file}`;
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      emptyDir(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  });
};

export { emptyDir };

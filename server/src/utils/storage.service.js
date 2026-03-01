import dotenv from "dotenv";
dotenv.config();
import ImageKit from "@imagekit/nodejs";

var imagekit = new ImageKit({
  privateKey: process.env.privateKey,
});

async function uploadFile(image) {
  const result = await imagekit.files.upload({
    file: image.buffer.toString("base64"),
    fileName: image.originalname,
  });
  return result;
}

export default uploadFile;

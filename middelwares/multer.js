import multer from "multer";

const multerUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 500, // 5MB limit per file
  },
});

const singleAvatar = multerUpload.single("avatar");
const attachments = multerUpload.array("files", 10); // Max 10 files

export { singleAvatar, attachments };

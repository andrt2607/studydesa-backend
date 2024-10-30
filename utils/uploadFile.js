const multer = require("multer");

const FILE_TYPE = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

const storage = multer.diskStorage({
  //cb itu callback
  destination: function (req, file, cb) {
    const isValidFormat = FILE_TYPE[file.mimetype];
    let uploadError = new Error("Invalid format file");

    if (isValidFormat) {
      uploadError = null;
    }

    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const filename = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE[file.mimetype];
    const uniqueFilename = filename + "-" + Date.now() + "-" + extension;
    cb(null, uniqueFilename);
  },
});

exports.uploadOption = multer({ storage: storage });

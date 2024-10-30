const { initMq } = require("../../config/queue");

const testHitQueue = async (req, res) => {
  try {
    initMq()
      .then((resp) => console.log("success init mq"))
      .catch((err) => console.log("error init mq ", err));
    res.status(200).json({
      message: "success testhitqueue",
    });
  } catch (error) {
    console.log("error try catch", error);
    res.status(400).json({
      message: "error testhitqueue",
    });
  }
};

const uploadImageFileDesa = async (req, res) => {
  const file = req.file;

  if (!file) {
    res.status(400);
    throw new Error("Tidak ada file yang diinput");
  }

  const filename = file.filename;
  // req.protocol = http
  // req.get('host') = localhost:3000
  const pathFile = `${req.protocol}://${req.get(
    "host"
  )}/public/uploads/${filename}`;

  return res.status(200).json({
    pathFile: pathFile,
  });
};

module.exports = { testHitQueue, uploadImageFileDesa };

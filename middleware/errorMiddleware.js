const { StatusCodes } = require("http-status-codes");

const errorMiddleware = (err, req, res, next) => {
  //   console.log("ini isi error", err.name);
  //   console.log("ini isi errorsssss", err.errors);
  //   console.log("ini isi msg", err.message);
  //   console.log("ini isi statuscode", err.statusCode);
  //   next();
  let customError = {
    status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Terjadi kesalahan",
  };
  if (err.name.includes("ValidationError")) {
    // console.log("masuk sini : ", Object.values(err.errors));
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.status = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.status).json({ msg: customError.msg });
  //   console.log("ini hasilnya custom error", customError);
  //   console.log("tes value", err.name);
  //   console.log("tes value isi eror : ", err);
};

module.exports = errorMiddleware;

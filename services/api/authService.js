const { where, Op } = require("sequelize");
const { User, Mahasiswa, UserMahasiswa } = require("../../models");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const user = require("../../models/user");
const { StatusCodes } = require("http-status-codes");

const createJWT = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = createJWT(user.username);
  const cookieOption = {
    //untuk mengubah menjadi milisecond
    expire: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  user.password = undefined;
  res.cookie("jwt", token, cookieOption);
  res.status(statusCode).json({
    status: "success",
    data: {
      user,
    },
  });
};

const getUserByUid = async (req, res, next) => {
  try {
    const result = await User.findOne({
      where: {
        uid: {
          [Op.eq]: req.params.id,
        },
      },
    });
    if (!result) {
      return res.status(StatusCodes.OK).json({
        message: "Data kosong",
        data: result,
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "Data user berhasil ditemukan",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    let { username, email, password, phone } = req.body;
    const uuid_mhs = v4();
    const result = await User.create({
      uuid_mhs,
      username,
      email,
      password,
      phone,
    });
    const newMahasiswa = await Mahasiswa.create({
      uuid_mhs: result.uuid_mhs,
    });
    const dataUserByUUID = await User.findOne({
      where: {
        uuid_mhs: {
          [Op.eq]: result.uuid_mhs,
        },
      },
    });
    const dataMahasiswaByUUID = await Mahasiswa.findOne({
      where: {
        uuid_mhs: {
          [Op.eq]: newMahasiswa.uuid_mhs,
        },
      },
    });
    const newUserMhs = await UserMahasiswa.create({
      user_id: dataUserByUUID.id,
      mahasiswa_id: dataMahasiswaByUUID.id,
    });
    createSendToken(result, 201, res);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    let { username, password, confirmPassword } = req.body;
    if (password != confirmPassword) {
      return res.status(400).json({
        message: "Password tidak sama",
        data: {},
      });
    }
    const userData = await User.findOne({
      where: {
        username: {
          [Op.eq]: username,
        },
      },
    });
    if (!userData) {
      return res.status(404).json({
        message: "User tidak ditemukan",
        data: {},
      });
    }
    if (!(await userData.CheckPassword(password, userData.password))) {
      return res.status(400).json({
        message: "Password user salah",
        data: {},
      });
    } else {
      createSendToken(userData, 200, res);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserByUid, registerUser, loginUser };

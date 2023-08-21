const { where, Op } = require("sequelize");
const { User } = require("../../models");

const jwt = require("jsonwebtoken");

const createJWT = (username) => {
  jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const getUserByUid = async (req, res) => {
  try {
    const result = await User.findOne({
      where: {
        uid: {
          [Op.eq]: req.params.id,
        },
      },
    });
    if (!result) {
      return res.status(200).json({
        message: "Data kosong",
        data: result,
      });
    }
    return res.status(200).json({
      message: "Data user berhasil ditemukan",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Terjadi kesalahan",
      data: {},
    });
  }
};

const registerUser = async (req, res) => {
  try {
    let { username, email, password, phone } = req.body;
    const idv4 = v4();
    const result = await Desa.create({
      uid: idv4,
      username,
      email,
      password,
      phone,
    });
    return res.status(201).json({
      message: "Berhasil register user",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Terjadi kesalahan",
      data: {},
    });
  }
};

const loginUser = async (req, res) => {
  try {
    let { username, password, confirmPassword } = req.body;
    if (password != confirmPassword) {
      return res.status(201).json({
        message: "Password tidak sama",
        data: {},
      });
    }
    // const idv4 = v4();
    const userData = await Desa.findOne({
      where: {
        id: {
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
    if (userData.password != password) {
      return res.status(400).json({
        message: "Password user salah",
        data: {},
      });
    }
    const token = createJWT(username);
    return res.status(201).json({
      message: "Berhasil register user",
      token: token,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Terjadi kesalahan",
      data: {},
    });
  }
};

module.exports = { getUserByUid, registerUser, loginUser };

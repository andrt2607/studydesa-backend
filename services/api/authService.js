const { where, Op } = require("sequelize");
const { User, Mahasiswa, UserMahasiswa } = require("../../models");
const {v4} = require('uuid')
const jwt = require("jsonwebtoken");
const user = require("../../models/user");

const createJWT = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
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
    const uuid_mhs = v4();
    // console.log('ini generate v4 : ', idv4)
    const result = await User.create({
      uuid_mhs,
      username,
      email,
      password,
      phone,
    });
    // console.log('ini result user create : ', result.uuid_mhs)
    const newMahasiswa = await Mahasiswa.create({
      uuid_mhs: result.uuid_mhs,
      // birthday_date: null
    })
    // console.log('ini result user_id : ', result.id)
    // console.log('ini result mahasiswa_id : ', newMahasiswa.id)
    const dataUserByUUID = await User.findOne({
      where: {
        uuid_mhs:{
          [Op.eq]: result.uuid_mhs
        }
      }
    })
    const dataMahasiswaByUUID = await Mahasiswa.findOne({
      where: {
        uuid_mhs:{
          [Op.eq]: newMahasiswa.uuid_mhs
        }
      }
    })
    const newUserMhs = await UserMahasiswa.create({
      user_id:dataUserByUUID.id,
      mahasiswa_id:dataMahasiswaByUUID.id
    })
    // console.log('ini usermahasiswa : ', newUserMhs)
    return res.status(201).json({
      message: "Berhasil register user",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Terjadi kesalahan",
      data: error.errors,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    let { username, password, confirmPassword } = req.body;
    // const params = req.channel
    // console.log(params);
    // return res.send(params)
    if (password != confirmPassword) {
      return res.status(400).json({
        message: "Password tidak sama",
        data: {},
      });
    }
    // const idv4 = v4();
    const userData = await User.findOne({
      where: {
        username: {
          [Op.eq]: username,
        },
      },
    });
    // console.log("ini isi userdata : ", userData)
    if (!userData) {
      return res.status(404).json({
        message: "User tidak ditemukan",
        data: {},
      });
    }
    console.log('password ', password)
    console.log('password db', userData.password)
    if (!await userData.CheckPassword(password, userData.password)) {
      return res.status(400).json({
        message: "Password user salah",
        data: {},
      });
    }else{
      const token = createJWT(userData.username);
      console.log('ini token : ', token)
      return res.status(201).json({
        message: "Berhasil login user",
        token,
        // data: reuslt,
      });
    }
    // return
  } catch (error) {
    return res.status(400).json({
      message: "Terjadi kesalahan",
      data: {},
    });
  }
};

module.exports = { getUserByUid, registerUser, loginUser };

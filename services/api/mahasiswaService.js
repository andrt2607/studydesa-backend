const { Mahasiswa, UserMahasiswa } = require("../../models");
const { Op } = require("sequelize");

const updateFakultas = async (req, res, next) => {
  try {
    // console.log('testing');
    const dataMahasiswa = await UserMahasiswa.findOne({
      where: {
        user_id: {
          [Op.eq]: req.params.currentUser.id,
        },
      },
    });
    // console.log('ini data mhs : ', dataMahasiswa)
    await Mahasiswa.update(
      { fakultas_id: req.body.fakultas_id },
      {
        where: {
          id: dataMahasiswa.id,
        },
      }
    );
    return res.status(200).json({
      message: "berhasil update fakultas mahasiswa",
    });
  } catch (error) {
    next(error);
    // return res.status(400).json({
    //     message: 'terjadi kesalahan',
    //   })
  }
};

const updateBirthdayDate = async (req, res, next) => {
  try {
    // console.log('testing');
    const dataMahasiswa = await UserMahasiswa.findOne({
      where: {
        user_id: {
          [Op.eq]: req.params.currentUser.id,
        },
      },
    });
    console.log("ini data mhs : ", req.body.birthday_date);
    await Mahasiswa.update(
      { birthday_date: req.body.birthday_date },
      {
        where: {
          id: dataMahasiswa.id,
        },
      }
    );
    return res.status(200).json({
      message: "berhasil update birth date mahasiswa",
    });
  } catch (error) {
    next(error);
    // return res.status(400).json({
    //     message: 'terjadi kesalahan',
    //   })
  }
};

module.exports = { updateFakultas, updateBirthdayDate };

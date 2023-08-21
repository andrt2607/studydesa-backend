// const desa = require("../../models/desa");
const { Op } = require("sequelize");
const { Desa } = require("../../models");
const { v4 } = require("uuid");

const createDesa = async (req, res) => {
  try {
    let { name, problem, lat_des, long_des, photo, contact_person } = req.body;
    const idv4 = v4();
    // console.log("tes", name);
    const result = await Desa.create({
      uid: idv4,
      name,
      problem,
      lat_des,
      long_des,
      photo,
      contact_person,
    });
    return res.status(201).json({
      message: "Berhasil buat data desa",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Terjadi kesalahan",
      data: {},
    });
  }
};

const getAllDesa = async (req, res) => {
  try {
    const result = await Desa.findAll();
    if (!result) {
      return res.status(200).json({
        message: "Data kosong",
        data: result,
      });
    }
    return res.status(200).json({
      message: "Data semua desa berhasil ditemukan",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Terjadi kesalahan",
      data: {},
    });
  }
};

const getDesaById = async (req, res) => {
  try {
    const result = await Desa.findOne({
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
      message: "Data desa berhasil ditemukan",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Terjadi kesalahan",
      data: {},
    });
  }
};

const updateDesa = async (req, res) => {
  try {
    let { name, problem, lat_des, long_des, photo, contact_person } = req.body;
    let { id } = req.params;
    const result = await Desa.findOne({
      where: {
        uid: {
          [Op.eq]: id,
        },
      },
    });
    if (!result) {
      return res.status(200).json({
        message: "Data kosong",
        data: result,
      });
    }
    await Desa.update(
      { name, problem, lat_des, long_des, photo, contact_person },
      {
        where: {
          uid: id,
        },
      }
    );
    return res.status(200).json({
      message: "Data desa berhasil update",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Terjadi kesalahan",
      data: {},
    });
  }
};

const deleteDesa = async (req, res) => {
  const result = await Desa.findOne({
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
  await Desa.destroy({
    where: {
      uid: {
        [Op.eq]: req.params.id,
      },
    },
  });
};

module.exports = {
  createDesa,
  getAllDesa,
  getDesaById,
  deleteDesa,
  updateDesa,
};

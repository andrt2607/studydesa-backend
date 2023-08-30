// const desa = require("../../models/desa");
const { Op } = require("sequelize");
const { Desa, UserMahasiswa } = require("../../models");
const { v4 } = require("uuid");
const { client } = require("../../config/redis");
const { cacheTTLUnit } = require("../../constant/constant");
const {StatusCodes} = require('http-status-codes')

const createDesa = async (req, res, next) => {
  const cacheKey = `desa:${req.body.name}`
  const cacheTTL = 10 * cacheTTLUnit
  try {
    let { name, problem, lat_des, long_des, photo, contact_person } = req.body;
    const idv4 = v4();
    const dataMahasiswa = await UserMahasiswa.findOne({
      where: {
        user_id: {
          [Op.eq]: req.params.currentUser.id,
        },
      },
    });
    const reqBodyNewDesa = {
      uid: idv4,
      name,
      problem,
      lat_des,
      long_des,
      photo,
      contact_person,
      mahasiswa_id: dataMahasiswa.mahasiswa_id,
    }
    await client.setEx(cacheKey, cacheTTL ,JSON.stringify(reqBodyNewDesa))
    const result = await Desa.create(reqBodyNewDesa);
    return res.status(StatusCodes.CREATED).json({
      message: "Berhasil buat data desa",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllDesa = async (req, res, next) => {
  try {
    const cacheKey = `alldesa`
    const desaCache = await client.get(cacheKey)
    const cacheTTL = 10 * cacheTTLUnit
    if(desaCache != null){
      return res.status(StatusCodes.OK).json({
        message: "Data semua desa berhasil ditemukan",
        data: desaCache,
      });
    }
      const desaFromDB = await Desa.findAll()
      if (desaFromDB.length === 0) {
        return res.status(StatusCodes.OK).json({
          message: "Data kosong",
          data: result,
        });
      }
        await client.setEx(cacheKey, cacheTTL ,JSON.stringify(desaFromDB))
        return res.status(StatusCodes.OK).json({
          message: "Data semua desa berhasil ditemukan",
          data: desaFromDB,
        });
  } catch (error) {
    next(error);
  }
};

const getDesaById = async (req, res, next) => {
  try {
    const cacheKey = `alldesa:${req.params.id}`
    const cacheTTL = 10 * cacheTTLUnit
    const desaCache = await client.get(cacheKey)
    const respMessage = `Data desa dengan id ${req.params.id} berhasil ditemukan`
    if(desaCache){
      return res.status(StatusCodes.OK).json({
        message: respMessage,
        data: desaCache,
      });
    }
    const desaFromDB = await Desa.findOne({
      where: {
        uid: {
          [Op.eq]: req.params.id,
        },
      },
    });
    if (!desaFromDB) {
      return res.status(StatusCodes.OK).json({
        message: "Data desa kosong",
        data: desaFromDB,
      });
    }
    await client.setEx(cacheKey, cacheTTL , JSON.stringify(desaFromDB))
    return res.status(StatusCodes.OK).json({
      message: respMessage,
      data: desaFromDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateDesa = async (req, res, next) => {
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
      return res.status(StatusCodes.OK).json({
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
    return res.status(StatusCodes.OK).json({
      message: "Data desa berhasil update",
      data: result,
    });
  } catch (error) {
    next(error);
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
    return res.status(StatusCodes.OK).json({
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
  return res.status(StatusCodes.OK).json({
    message: "Data berhasil dihapus",
  });
};

module.exports = {
  createDesa,
  getAllDesa,
  getDesaById,
  deleteDesa,
  updateDesa,
};

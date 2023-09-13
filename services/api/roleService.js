const { Role, User } = require("../../models");
const { Op } = require("sequelize");

const createRole = async (req, res, next) => {
  try {
    let { name } = req.body;
    const result = Role.create({
      name,
    });
    return res.status(200).json({
      message: "Berhasil tambah role",
      data: result,
    });
  } catch (error) {
    next(error);
    // return res.status(400).json({
    //     message: "Terjadi kesalahan",
    //     data: {},
    //   });
  }
};

//get user by pagination
const getUserPagination = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;

    const { count, rows } = await User.findAndCountAll({
      where: {
        [Op.or]: [{
          username: {
            [Op.like]: '%' + search + '%'
          }
        }, {
          email: {
            [Op.like]: '%' + search + '%'
          }
        }]
      },
      offset: offset,
      limit: limit,
    });

    return res.status(200).json({
      page: page,
      limit: limit,
      totalRows: rows,
      totalPage: count
    });
  } catch (error) {
    next(error)
  }
}

module.exports = { createRole, getUserPagination };

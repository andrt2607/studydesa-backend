const { Role } = require("../../models");

const createRole = async(req, res) => {
    try {
        let {name} = req.body
        const result = Role.create({
            name
        })
        return res.status(200).json({
            message: "Berhasil tambah role",
            data: result,
          });
    } catch (error) {
        return res.status(400).json({
            message: "Terjadi kesalahan",
            data: {},
          });
    }
}

module.exports = {createRole}
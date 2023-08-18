const {db} = require('../databases/mysql')
const Sequelize = require('sequelize') 
const Model = Sequelize.Model

class DesaKKN extends Model{}

DesaKKN.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // defaultValue: Sequelize.UUIDV4,
      },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    problem_desa: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lat_des: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    long_des: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    contact_person: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    mahasiswa_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
},{
    sequelize: db,
    modelName: "desakkn",
    tableName: "desakkn",
    timestamps: true
})

// DesaKKN.sync().then(
//     (res) => console.log("success make table desa kkn")
// ).catch(
//     (err) => console.log("failed make table desa kkn : ", err)
// )

module.exports = {DesaKKN}
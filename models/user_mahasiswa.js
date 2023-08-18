const {db} = require('../databases/mysql')
const Sequelize = require('sequelize') 
const Model = Sequelize.Model

class UserMahasiswa extends Model{}

UserMahasiswa.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    mahasiswa_id: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},{
    sequelize: db,
    modelName: 'user_mahasiswa',
    tableName: 'user_mahasiswa',
    timestamps: true
})

UserMahasiswa.sync().then(
    (res) => console.log("success make table user_mahasiswa")
).catch(
    (err) => console.log("failed make table user_mahasiswa : ", err)
)

module.exports = {UserMahasiswa}
const {db} = require('../databases/mysql')
const Sequelize = require('sequelize') 
const Model = Sequelize.Model

class Fakultas extends Model{}

Fakultas.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
},{
    sequelize: db,
    modelName: 'fakultas',
    tableName: 'fakultas',
    timestamps: true
})

// Fakultas.sync().then(
//     (res) => console.log("success make table fakultas")
// ).catch(
//     (err) => console.log("failed make table fakultas : ", err)
// )

module.exports = {Fakultas}
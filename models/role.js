const {db} = require('../databases/mysql')
const Sequelize = require('sequelize') 
const Model = Sequelize.Model

class Role extends Model{}

Role.init({
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
    modelName: 'role',
    tableName: 'role',
    timestamps: true
})

// Role.sync().then(
//     (res) => console.log("success make table role")
// ).catch(
//     (err) => console.log("failed make table role : ", err)
// )

module.exports = {Role}
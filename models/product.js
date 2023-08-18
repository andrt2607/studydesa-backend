const {db} = require('../databases/mysql')
const Sequelize = require('sequelize') 
const Model = Sequelize.Model

class Product extends Model{}

Product.init({
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    }
},{
    sequelize: db,
    modelName: 'product',
    tableName: 'product',
    timestamps: true
})

Product.sync()

module.exports = {Product}
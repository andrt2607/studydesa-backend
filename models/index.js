// const { MahasiswaDesa } = require("./mahasiswa_desa");
const { DesaKKN } = require("./desaKKN");
const { Role } = require("./role");
const { Fakultas } = require("./fakultas");
const { UserMahasiswa } = require("./user_mahasiswa");
const { Mahasiswa } = require("./mahasiswa");
const { User } = require("./user");
const Sequelize = require('sequelize') 
const Model = Sequelize.Model

// Model.sync().then(
//       (res) => {
//         console.log("success make table")
// //         User.belongsToMany(Mahasiswa, {through: UserMahasiswa, foreignKey: 'user_id', otherKey: 'mahasiswa_id'})
// // Mahasiswa.belongsToMany(User, {through: UserMahasiswa, foreignKey: 'mahasiswa_id', otherKey: 'user_id'})
//     }
//   ).catch(
//       (err) => console.log("failed make table", err)
//   )
// const { Product } = require("./product");

// const productModel = require("./product");
//relation user mahasiswa
User.belongsToMany(Mahasiswa, {through: UserMahasiswa, foreignKey: 'user_id', otherKey: 'mahasiswa_id'})
Mahasiswa.belongsToMany(User, {through: UserMahasiswa, foreignKey: 'mahasiswa_id', otherKey: 'user_id'})
//relation mahasiswa desa
// Mahasiswa.belongsToMany(Desa, {through: MahasiswaDesa, foreignKey: 'mahasiswa_id', otherKey: 'desa_id'})
// Desa.belongsToMany(Mahasiswa, {through: MahasiswaDesa, foreignKey: 'desa_id', otherKey: 'mahasiswa_id'})
// Fakultas.hasMany(Mahasiswa, {foreignKey: 'fakultas_id', sourceKey:'id'})
// Mahasiswa.belongsTo(Fakultas)
// Role.hasMany(Mahasiswa, {foreignKey: 'role_id', sourceKey:'id'})
// Mahasiswa.belongsTo(Role)
// Mahasiswa.hasMany(DesaKKN, {foreignKey: 'mahasiswa_id', sourceKey:'id'});
// DesaKKN.belongsTo(Mahasiswa)
// Desa.hasMany(Mahasiswa, {foreignKey: 'desa_id', sourceKey:'id'})
// Mahasiswa.belongsTo(Desa)
// Model.sync().then(
//       (res) => console.log("success make table")
//   ).catch(
//       (err) => console.log("failed make table", err)
//   )

module.exports = {
  // DesaKKN,
  // Product,
  // ...require("./product"),
  // ...require("./user"),
  // ...require("./mahasiswa"),
  // ...require("./user_mahasiswa"),
  // ...require("./role"),
  // ...require("./desa"),
  // ...require("./mahasiswa_desa"),
};

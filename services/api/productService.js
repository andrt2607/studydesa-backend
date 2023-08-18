// const {Product} = require('../../models/product')
const { Product } = require("../../models");
const { v4 } = require("uuid");

const createProduct = async (req, res) => {
  try {
    let { name } = req.body;
    const id = v4();
    Product.crea;
    const result = await Product.create({
      id,
      name,
    });
    res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: "bad request",
    });
  }
};

module.exports = { createProduct };

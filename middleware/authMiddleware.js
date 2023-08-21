const jwt = require('jsonwebtoken')
const {User} = require('../models')

exports.authMiddleware = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1]
    }

    if(!token){
        return next(res.status(401).json({
            status: 401,
            message: "anda belum login, token tdk ditemukan"
        }))
    }

    let decode;
    try {
        decode = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return next(res.status(401).json({
            error: error,
            message: 'token yg dimasukkan tdk ditemukan/tidak ada'
        }))
    }

    const currentUser = await User.findByPk(decode.id)
    // console.log("ini isi currentuser mdw : ", currentUser)
    if(!currentUser){
        return next(res.status(401).json({
            status: 401,
            message: "user sudah terhapus token tdk bsa dipakai"
        }))
    }

    req.params = {
        currentUser
    }
    next()
}
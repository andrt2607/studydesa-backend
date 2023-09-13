const { initMq } = require("../../config/queue")

const testHitQueue = async (req, res) => {
    try {
        initMq().then((resp) => console.log('success init mq')).catch((err) => console.log('error init mq ', err))
        res.status(200).json({
            message: 'success testhitqueue'
        })
    } catch (error) {
        console.log('error try catch', error)
        res.status(400).json({
            message: 'error testhitqueue'
        })
    }
}

module.exports = {testHitQueue}
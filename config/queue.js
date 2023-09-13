const amqp = require('amqplib')

const rabbitMqUrl = 'amqp://localhost?heartbeat=5'

let connection = null
let channel = null

async function initMq(){
    try {
        connection = await amqp.connect(rabbitMqUrl, {timeout: 10000})
        connection.on('error', e => console.log(`[rabbitmq] connection error ${e && e.toString() || ''}`))
        channel = await connection.createChannel()
        const queueName = 'myqueue'
        await channel.assertQueue(queueName, {durable: false})

        //send message to queue
        const message = 'Testing send msg rabbitmq'
        channel.sendToQueue(queueName, Buffer.from(message))
        console.log(`sent : ${message}`);

        //close connection
        await channel.close()
        await connection.close()
    } catch (error) {
        console.log(`[rabbitmq] initMQ error ${e && e.toString() || ''}`)
    }
}

module.exports = {initMq}

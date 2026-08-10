import amqp from 'amqplib';

export class RabbitMQ {

    static connection;
    static channel;
    static queueName = 'emailQueue';

    static async connect() {
        this.connection = await amqp.connect('amqp://localhost');
        this.channel = await this.connection.createChannel();

        await this.channel.assertQueue(this.queueName, {
            durable: true,
            arguments: {
                'x-queue-type': 'quorum'
            }
        });
    }

    static async sendToQueue(message) {
        this.channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(message)), {
            persistent: true
        });
    }

}
import amqp from 'amqplib';

export class RabbitMQ {

    static connection;
    static channel;
    static queueName = 'emailQueue';

    static async connect() {
        try {
            this.connection = await amqp.connect('amqp://localhost');
            this.channel = await this.connection.createChannel();

            await this.channel.assertQueue(this.queueName, {
                durable: true,
                arguments: {
                    'x-queue-type': 'quorum'
                }
            });

            console.log("RabbitMQ connected successfully")

        } catch (error) {
            console.log("Failed to connect to RabbitMQ", error)
        }
    }

    static sendToQueue(message) {
        if (!message) {
            console.log("Message is empty");
            return;
        }

        this.channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(message)), {
            persistent: true
        });
    }

    static consumeFromQueue(callback) {
        this.channel.consume(this.queueName, async (message) => {
            if (!message) {
                console.log("Message is empty")
                return;
            }

            try {
                const content = JSON.parse(
                    message.content.toString()
                );

                console.log("Message received:", content);

                await callback(content);
                this.channel.ack(message);

            } catch (error) {
                console.error("Error processing message:", error);
            }
        });

    }

}
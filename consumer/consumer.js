const amqp = require('amqplib');
const queueName = 'legalEventQueue'; // will be config.

connect();
async function connect() {
  try {
    //connect to RabbitMQ
    const connection = await amqp.connect('amqp://localhost:5672');
    // create a channel in of communication in RabbitMQ
    const channel = await connection.createChannel();
    //assertQueue, make sure its up and if not, create it.
    const result = await channel.assertQueue(`${queueName}`);
    console.log(`Waiting for msgs, assertion result ${result}`);

    channel.consume(`${queueName}`, (message) => {
      const input = JSON.parse(message.content.toString());
      console.log(`received message ${input}`);
      const isValid = true;
      if (isValid) {
        channel.ack(message);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

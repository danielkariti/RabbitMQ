const amqp = require('amqplib');
const legalEventQueueName = 'legalEventQueue'; // will be config.

const msg = {
  projectName: 'diamond',
  projectId: 1,
  username: 'vuma',
  fields: 4,
  field5: true,
};
connect();
async function connect() {
  try {
    //connect to RabbitMQ - URL will be config
    const connection = await amqp.connect('amqp://localhost:5672');
    // create a channel in of communication in RabbitMQ
    const channel = await connection.createChannel();
    //assertQueue, make sure its up and if not, create it.
    const assertRes = await channel.assertQueue(`${queueName}`);
    console.log('assertion result', assertRes);

    //send a message to the queue as a stringified JSON inside a buffer
    channel.sendToQueue(`${queueName}`, Buffer.from(JSON.stringify(msg)));

    console.log('Message sent successfully:', msg);
    //close connection - if connecting is too slow - can keep the channel up
    channel.close();
  } catch (error) {
    console.error(error);
  }
}

import mqtt from 'mqtt';

// HiveMQ broker URL
const BROKER_URL = 'wss://b5b0a733da9d4bc5a9435dc3adf32503.s1.eu.hivemq.cloud:8884/mqtt'; // Websocket URL
const USERNAME = 'viethoang';  // Username for MQTT authentication
const PASSWORD = '24102003@hH';  // Password for MQTT authentication

// Create MQTT client
let client = null;

// Connect to MQTT broker
export const connectMQTT = () => {
  client = mqtt.connect(BROKER_URL, {
    username: USERNAME,
    password: PASSWORD,
    protocol: 'wss', // WebSocket Secure
    reconnectPeriod: 1000,  // Reconnect period in ms
  });

  // When connected to the broker
  client.on('connect', () => {
    console.log('Connected to MQTT Broker');
  });

  // Handle connection errors
  client.on('error', (err) => {
    console.error('Connection error:', err);
  });

  // Handle message reception
  client.on('message', (topic, message) => {
    console.log(`Received message: ${message.toString()} on topic: ${topic}`);
  });
};

// Subscribe to a topic
export const subscribeTopic = (topic, callback) => {
    if (client) {
      client.subscribe(topic, (err) => {
        if (err) {
          console.error(`Subscription error: ${err}`);
        } else {
          console.log(`Subscribed to topic: ${topic}`);
        }
      });
  
      if (callback) {
        client.on('message', (receivedTopic, message) => {
          if (receivedTopic === topic) {
            callback(receivedTopic, message);
          }
        });
      }
    }
  };
  

// Publish a message to a topic
export const publishMessage = (topic, message) => {
  if (client) {
    client.publish(topic, JSON.stringify(message), { qos: 1 }, (err) => {
      if (err) {
        console.error(`Publish error: ${err}`);
      } else {
        console.log(`Message sent to topic: ${topic}`);
      }
    });
  }
};

// Disconnect from the MQTT broker
export const disconnectMQTT = () => {
  if (client) {
    client.end();
    console.log('Disconnected from MQTT Broker');
  }
};

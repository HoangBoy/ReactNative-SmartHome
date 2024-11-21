import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import MQTT from 'react-native-mqtt';

const MqttComponent = () => {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    MQTT.createClient({
      uri: 'mqtts://b5b0a733da9d4bc5a9435dc3adf32503.s1.eu.hivemq.cloud',
      clientId: 'react_native_client',
      userName: 'viethoang',
      password: '24102003@hH',
    }).then(client => {
      client.on('connect', () => {
        console.log('Connected to MQTT broker');
        client.subscribe('home/device/1/control');
        client.subscribe('home/device/2/control');
        client.subscribe('home/device/3/control');
        client.subscribe('home/device/4/control');
        client.subscribe('home/sensors/temperature_humidity');
      });

      client.on('message', (topic, message) => {
        console.log(`Received message: ${message}`);
        if (topic === 'home/sensors/temperature_humidity') {
          const data = JSON.parse(message);
          setSensorData(data);
        }
      });
    });

    return () => {
      MQTT.disconnect();
    };
  }, []);

  return (
    <View>
      <Text>Temperature: {sensorData?.temperature}°C</Text>
      <Text>Humidity: {sensorData?.humidity}%</Text>
    </View>
  );
};

export default MqttComponent;

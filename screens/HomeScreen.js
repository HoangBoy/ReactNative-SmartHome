import React, { useEffect, useState } from 'react';
import { Platform, Dimensions } from 'react-native';
import { SafeAreaView, View, Text, Image, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';
import { LightBulbIcon, ArrowDownCircleIcon, ArrowUpCircleIcon, Bars3CenterLeftIcon, BoltIcon } from 'react-native-heroicons/solid';
import { storeColors } from '../theme';
import SensorInfo from '../components/SensorInfo';
import ModeApp from '../components/ModeApp';
import ButtonSwitch from '../components/ButtonSwitch';
import { connectMQTT, publishMessage, subscribeTopic, getMQTTClient  } from './mqttService';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';  // Kiểm tra môi trường web

const HomeScreen = () => {
  const navigation = useNavigation();

  const [isSwitchEnableHeater, setIsSwitchEnableHeater] = useState(false);
  const [isSwitchEnableFan, setIsSwitchEnableFan] = useState(false);
  const [isSwitchEnableLed, setIsSwitchEnableLed] = useState(false);
  const [onHeater, setOnHeater] = useState('Off');
  const [onFan, setOnFan] = useState('Off');
  const [onLed, setOnLed] = useState('Off');
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
  });
  const handleLogout = async () => {
    // Ngắt kết nối MQTT
  
    // Clear token, navigate về login
    navigation.replace('LoginScreen');
  };

  const handleMQTTMessage = (topic, message) => {
    if (topic === 'home/sensors/temperature_humidity') {
      try {
        const data = JSON.parse(message);
        setSensorData({
          temperature: data.temperature,
          humidity: data.humidity,
        });
        console.log("Updated Sensor Data: ", { temperature: data.temperature, humidity: data.humidity });
      } catch (error) {
        console.error('Error parsing sensor data:', error);
      }
    }
  };

  useEffect(() => {
    connectMQTT();
    subscribeTopic('home/device/1/control');
    subscribeTopic('home/device/2/control');
    subscribeTopic('home/device/3/control');
    subscribeTopic('home/device/4/control');
    subscribeTopic('home/sensors/temperature_humidity', handleMQTTMessage);

    return () => {
      const client = getMQTTClient();
      if (client) {
        client.unsubscribe('home/sensors/temperature_humidity');
      }
    };
  }, []);

  const openDoor = () => {
    const message = {
      Id: 4,
      Name: 'Cửa nhà',
      Status: 'open',
      Message: 'Thiet bi Cua nha da bat',
    };
    publishMessage('home/device/4/control', message);
    Alert.alert('Đang mở cửa nhà');
  };

  const closeDoor = () => {
    const message = {
      Id: 4,
      Name: 'Cửa nhà',
      Status: 'close',
      Message: 'Thiet bi Cua nha da tat',
    };
    publishMessage('home/device/4/control', message);
    Alert.alert('Đang đóng cửa nhà');
  };

  const toggleSwitchFan = () => {
    const newState = !isSwitchEnableFan;
    setIsSwitchEnableFan(newState);
    setOnFan(newState ? 'On' : 'Off');

    const message = {
      Id: 2,
      Name: 'Quat phong ngu',
      Status: newState ? 'on' : 'off',
      Message: newState ? 'Thiet bi Quat phong ngu da bat' : 'Thiet bi Quat phong ngu da tat',
    };
    publishMessage('home/device/2/control', message);
  };

  const toggleSwitchLed = () => {
    const newState = !isSwitchEnableLed;
    setIsSwitchEnableLed(newState);
    setOnLed(newState ? 'On' : 'Off');

    const message = {
      Id: 1,
      Name: 'Den phong khach',
      Status: newState ? 'on' : 'off',
      Message: newState ? 'Thiet bi Den phong khach da bat' : 'Thiet bi Den phong khach da tat',
    };
    publishMessage('home/device/1/control', message);
  };

  const toggleSwitchHeater = () => {
    const newState = !isSwitchEnableHeater;
    setIsSwitchEnableHeater(newState);
    setOnHeater(newState ? 'On' : 'Off');

    const message = {
      Id: 3,
      Name: 'Binh nong lanh',
      Status: newState ? 'on' : 'off',
      Message: newState ? 'Thiet bi Binh nong lanh da bat' : 'Thiet bi Binh nong lanh da tat',
    };
    publishMessage('home/device/3/control', message);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 30,
    },
    logoutButton: {
      backgroundColor: '#f44336',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  }); 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 16, maxWidth: isWeb ? 1200 : width, alignSelf: 'center', flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Bars3CenterLeftIcon size={25} color={storeColors.textBlack} />
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Smart Home</Text>
            <ArrowDownCircleIcon size={15} color={storeColors.textBlack} />
          </View>
         
            <TouchableOpacity onPress={() => Alert.alert('Go to Profile Screen')}>
              <Image source={require('../assets/images/avatar.jpg')} style={{ width: 40, height: 40, borderRadius: 20 }} />
            </TouchableOpacity>
        
        </View>
        
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={{ marginTop: 16, marginHorizontal: 16 }}>
            {/* Hiển thị Nhiệt độ và Độ ẩm */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 16 }}>
              <SensorInfo
                title="Nhiệt độ"
                source={require('../assets/icons/temperature.png')}
                value={sensorData.temperature || 'Chưa có dữ liệu'}
              />
              <SensorInfo
                title="Độ ẩm"
                source={require('../assets/icons/humidity.png')}
                value={sensorData.humidity || 'Chưa có dữ liệu'}
              />
              <SensorInfo
                title="Thời tiết"
                source={require('../assets/icons/cloud.png')}
                value={sensorData.weather || 'Có nắng'}
              />
            </View>

            {/* Các chức năng điều khiển */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <ModeApp icon={<LightBulbIcon size={15} color={storeColors.textBlack} />} text="Light mode" onPress={() => Alert.alert('Chế độ sáng')} />
              <ModeApp icon={<LightBulbIcon size={15} color={storeColors.textBlack} />} text="Dark mode" onPress={() => Alert.alert('Chế độ tối')} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <ModeApp icon={<ArrowUpCircleIcon size={20} color={storeColors.textBlack} />} text="Mở cửa nhà" onPress={openDoor} />
              <ModeApp icon={<ArrowDownCircleIcon size={20} color={storeColors.textBlack} />} text="Đóng cửa nhà" onPress={closeDoor} />
            </View>

            {/* Các button điều khiển thiết bị */}
            <View style={{ marginTop: 20 }}>
              <ButtonSwitch title="Quạt phòng ngủ" state={onFan} source={require('../assets/icons/fan.png')} value={isSwitchEnableFan} onValueChange={toggleSwitchFan} />
              <ButtonSwitch title="Đèn phòng khách" state={onLed} source={require('../assets/icons/led.png')} value={isSwitchEnableLed} onValueChange={toggleSwitchLed} />
              <ButtonSwitch title="Bình nóng lạnh" state={onHeater} source={require('../assets/icons/image.png')} value={isSwitchEnableHeater} onValueChange={toggleSwitchHeater} />
            </View>
          </View>

          {/* Thông tin thiết kế */}
          <View style={{ marginTop: 40, alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: '#666' }}>Cre Việt Hoàng</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Đăng Xuất</Text>
      </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};


export default HomeScreen;

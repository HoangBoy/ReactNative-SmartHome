import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { LightBulbIcon, ArrowDownCircleIcon, ArrowUpCircleIcon, Bars3CenterLeftIcon, BoltIcon } from 'react-native-heroicons/solid';
import { storeColors } from '../theme';
import SensorInfo from '../components/SensorInfo';
import ModeApp from '../components/ModeApp';
import ButtonSwitch from '../components/ButtonSwitch';
import { connectMQTT, publishMessage, subscribeTopic } from './mqttService';

const HomeScreen = () => {
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
    // Đăng ký các chủ đề cần lắng nghe
    subscribeTopic('home/device/1/control');
    subscribeTopic('home/device/2/control');
    subscribeTopic('home/device/3/control');
    subscribeTopic('home/device/4/control');
    subscribeTopic('home/sensors/temperature_humidity', handleMQTTMessage); // Đăng ký để nhận thông báo về nhiệt độ và độ ẩm

    return () => {
      // Nếu cần hủy đăng ký khi component bị hủy
      mqttClient.unsubscribe('home/sensors/temperature_humidity');
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

  return (
    <SafeAreaView>
      <View className="p-4">
        <View className="flex-row justify-between items-center">
          <Bars3CenterLeftIcon size={25} color={storeColors.textBlack} />
          <View className="flex-row justify-center items-center">
            <Text>Smart Home</Text>
            <ArrowDownCircleIcon size={15} color={storeColors.textBlack} />
          </View>
          <TouchableOpacity onPress={() => Alert.alert('Go to Profile Screen')}>
            <Image source={require('../assets/images/avatar.jpg')} className="w-8 h-8 rounded-full" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <View className="mt-4 mx-4">
          <View className="flex-row item-center justify-between gap-2">
            {/* Hiển thị nhiệt độ và độ ẩm */}
            <SensorInfo 
              title="Nhiệt độ" 
              source={require('../assets/icons/temperature.png')} 
              value={sensorData.temperature || 'Chưa có dữ liệu'}  // Nếu temperature không có giá trị thì hiển thị "Chưa có dữ liệu"
            />
            <SensorInfo 
              title="Độ ẩm" 
              source={require('../assets/icons/humidity.png')} 
              value={sensorData.humidity || 'Chưa có dữ liệu'}  // Nếu humidity không có giá trị thì hiển thị "Chưa có dữ liệu"
            />
            <SensorInfo 
              title="Thời tiết" 
              source={require('../assets/icons/cloud.png')} 
              value={sensorData.weather || 'Có nắng'}  // Nếu weather không có giá trị thì hiển thị "Chưa có dữ liệu"
            />
          </View>
          {/* Các chức năng khác của ứng dụng */}
          <View className="flex-row justify-between items-center flex-1 w-full mt-4">
            <View className="my-2">
              <ModeApp icon={<LightBulbIcon size={15} color={storeColors.textBlack} />} text="Light mode" onPress={() => Alert.alert('Chế độ sáng')} />
              <ModeApp icon={<LightBulbIcon size={15} color={storeColors.textBlack} />} text="Dark mode" onPress={() => Alert.alert('Chế độ tối')} />
            </View>

            <View className="my-2">
              <ModeApp 
                icon={<ArrowUpCircleIcon size={20} color={storeColors.textBlack} />} 
                text="Mở cửa nhà" 
                onPress={openDoor} 
              />
              <ModeApp 
                icon={<ArrowDownCircleIcon size={20} color={storeColors.textBlack} />} 
                text="Đóng cửa nhà" 
                onPress={closeDoor} 
              />
            </View>
          </View>

          {/* Các button điều khiển thiết bị */}
          <View>
            <ButtonSwitch title="Quạt phòng ngủ" state={onFan} source={require('../assets/icons/fan.png')} value={isSwitchEnableFan} onValueChange={toggleSwitchFan} />
            <ButtonSwitch title="Đèn phòng khách" state={onLed} source={require('../assets/icons/led.png')} value={isSwitchEnableLed} onValueChange={toggleSwitchLed} />
            <ButtonSwitch title="Bình nóng lạnh" state={onHeater} source={require('../assets/icons/image.png')} value={isSwitchEnableHeater} onValueChange={toggleSwitchHeater} />
          </View>
        </View>

        <View>
          <Text className="">Design by Việt Hoàng</Text>
          <Text className=""></Text>
          <Text className=""></Text>
          <Text className=""></Text>
          <Text className=""></Text>
          <Text className=""></Text>
          <Text className=""></Text>
          <Text className=""></Text>
         
          


        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

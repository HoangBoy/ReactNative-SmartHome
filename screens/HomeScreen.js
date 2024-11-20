import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useRef } from "react";
import {
  ArrowDownCircleIcon,
  ArrowDownIcon,
  ArrowUpCircleIcon,
  Bars3CenterLeftIcon,
  BoltIcon,
  LightBulbIcon,
} from "react-native-heroicons/solid";
import { storeColors } from "../theme";
import SensorInfo from "../components/SensorInfo";
import ModeApp from "../components/ModeApp";
import ButtonSwitch from "../components/ButtonSwitch";
import { useState } from "react";
import WebSocket from "react-native-websocket";


const SERVER_URL = "ws://192.168.1.2:8080";
const HomeScreen = () => {
  const [isSwitchEnableHeater, setIsSwitchEnableHeater] = useState(false);
  const [isSwitchEnableFan, setIsSwitchEnableFan] = useState(false);
  const [isSwitchEnableLed, setIsSwitchEnableLed] = useState(false);
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
  });
  const [onHeater, setOnHeater] = useState("Off");
  const [onFan, setOnFan] = useState("Off");
  const [onLed, setOnLed] = useState("Off");
  const websocketRef = useRef(null);

  const onMessage = (event) => {
    const data = JSON.parse(event.data);
    setSensorData(data);
  };

  const handleOnError = (error) => {
    console.log("🚀 ~ handleOnError ~ error:", error);
  };

  const toggleSwitchFan = () => {
    if (websocketRef.current) {
      const message = {
        type: "fanControl",
        status: !isSwitchEnableFan ? "on" : "off",
      };
      websocketRef.current.send(JSON.stringify(message));
    }
    const newState = !isSwitchEnableFan;
    setIsSwitchEnableFan(newState);
    setOnFan(newState ? "On" : "Off");
  };

  const toggleSwitchLed = () => {
    if (websocketRef.current) {
      const message = {
        type: "ledControl",
        status: !isSwitchEnableLed ? "on" : "off",
      };
      websocketRef.current.send(JSON.stringify(message));
    }
    const newState = !isSwitchEnableLed;
    setIsSwitchEnableLed(newState);
    setOnLed(newState ? "On" : "Off");
  };

  const toggleSwitchHeater = () => {
    if (websocketRef.current) {
      const message = {
        type: "heaterControl",
        status: !isSwitchEnableHeater ? "on" : "off",
      };
      websocketRef.current.send(JSON.stringify(message));
    }
    const newState = !isSwitchEnableHeater;
    setIsSwitchEnableHeater(newState);
    setOnHeater(newState ? "On" : "Off");
  }

  return (
    <SafeAreaView>
      <View className="p-4">
        <View className="flex-row justify-between items-center">
          <Bars3CenterLeftIcon size={25} color={storeColors.textBlack} />
          <View className="flex-row justify-center items-center">
            <Text>Smart Home</Text>
            <ArrowDownIcon size={15} color={storeColors.textBlack} />
          </View>
          <TouchableOpacity onPress={() => Alert.alert("Go to Profile Screen")}>
            <Image
              source={require("../assets/images/avatar.jpg")}
              className="w-8 h-8 rounded-full"
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <WebSocket ref={websocketRef} url={SERVER_URL} />

        <View className="mt-4 mx-4">
          <View className="flex-row item-center justify-between gap-2">
            <SensorInfo
              title="Nhiệt độ"
              source={require("../assets/icons/temperature.png")}
              value="0"
            />
            <SensorInfo
              title="Độ ẩm"
              source={require("../assets/icons/humidity.png")}
              value="0"
            />
            <SensorInfo
              title="Thời tiết"
              source={require("../assets/icons/cloud.png")}
              value="0"
            />
          </View>

          <View className="flex-row justify-between items-center flex-1 w-full mt-4">
            <View className="my-2">
              <ModeApp
                icon={<LightBulbIcon size={15} color={storeColors.textBlack} />}
                text="Light mode"
                onPress={() => Alert.alert(`Chế độ sáng`)}
              />
              <ModeApp
                icon={<LightBulbIcon size={15} color={storeColors.textBlack} />}
                text="Dark mode"
                onPress={() => Alert.alert(`Chế độ tối`)}
              />
            </View>

            <View className="my-2">
              <ModeApp
                icon={<ArrowUpCircleIcon size={20} color={storeColors.textBlack} />}
                text="Mở cửa nhà"
                onPress={() => Alert.alert(`Đang mở cửa nhà`)}
              />
              <ModeApp
                icon={<ArrowDownCircleIcon size={20} color={storeColors.textBlack} />}
                text="Đóng cửa nhà"
                onPress={() => Alert.alert(`Đang đóng cửa nhà`)}
              />
            </View>
          </View>

          <View className="my-6 rounded-2xl bg-blue-400">
            <View className="px-4 py-5">
              <TouchableOpacity className="flex-row items-center">
                <View className="bg-white p-3 rounded-full">
                  <BoltIcon />
                </View>
                <View className="ml-5">
                  <Text className="text-white font-bold py-1">2.45kWh</Text>
                  <Text className="text-white">Năng lượng sử dụng hôm nay</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View className="flex">
              <ButtonSwitch
                title="Quạt phòng ngủ"
                state={onFan}
                source={require("../assets/icons/fan.png")}
                value={isSwitchEnableFan}
                onValueChange={toggleSwitchFan}
              />
              <ButtonSwitch
                title="Đèn phòng khách"
                state={onLed}
                source={require("../assets/icons/led.png")}
                value={isSwitchEnableLed}
                onValueChange={toggleSwitchLed}
              />
               <ButtonSwitch
                title="Bình nóng lạnh"
                state={onHeater}
                source={require("../assets/icons/image.png")}
                value={isSwitchEnableHeater}
                onValueChange={toggleSwitchHeater}
              />
              <View>
                <Text className=""></Text>
                <Text className=""></Text>
                <Text className=""></Text>
                <Text className="">Design by Việt Hoàng</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

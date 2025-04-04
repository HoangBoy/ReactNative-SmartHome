// screens/LoginScreen.js
import React, { useState } from "react";

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  
  
  const handleLogin = () => {
    // Kiểm tra đăng nhập (dữ liệu đăng nhập mẫu)
    if (username === "hoangdz" && password === "h123@") {
      // Nếu đăng nhập thành công, chuyển đến HomeScreen
      navigation.replace("Home");
    } else {
      // Nếu đăng nhập thất bại
      Alert.alert("Thông báo", "Tài khoản hoặc mật khẩu không chính xác");
    }
  };

  const getMQTTClient = () => {
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.container}>
        {/* Logo and Title */}
        <View style={styles.header}>
          <Image
            source={require("../assets/logosmh.jpg")} // Thêm logo hình ảnh
            style={styles.logo}
          />
          <Text style={styles.title}>My Smart Home</Text>
        </View>

        {/* Welcome Text */}
        <Text style={styles.welcomeText}>Chào mừng bạn quay lại!</Text>
        <Text style={styles.subtitle}>Nhập tên đăng nhập và mật khẩu của bạn</Text>

        {/* Username Input */}
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        {/* Password Input */}
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Mật khẩu"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Log In Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Đăng Nhập</Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => Alert.alert("Quên mật khẩu")}
        >
          <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        {/* Create New Account */}
        <View style={styles.signUpContainer}>
          <Text style={styles.orText}>Hoặc</Text>
          <TouchableOpacity onPress={() => Alert.alert("Đăng ký")}>
            <Text style={styles.createAccountText}>Tạo tài khoản mới</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: "#fff", // Match background
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 100, // Thay đổi kích thước logo
    height: 100, // Thay đổi kích thước logo
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000", // Dark text
    marginBottom: 5,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 30,
  },
  input: {
    height: 40, // Slightly smaller input
    borderColor: "#ddd",
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 40, // Slightly smaller input
    paddingHorizontal: 10,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#000", // Dark login button
    borderRadius: 20, // More rounded
    paddingVertical: 12, // Slightly smaller padding
    alignItems: "center",
    marginBottom: 15,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16, // Slightly smaller text
    fontWeight: "bold",
  },
  forgotPasswordButton: {
    alignItems: "center",
    marginBottom: 20, // Adjust spacing
  },
  forgotPasswordText: {
    color: "gray",
    fontSize: 12, // Smaller text
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30, // Add some space
  },
  orText: {
    color: "gray",
    fontSize: 12, // Smaller text
    marginRight: 5,
  },
  createAccountText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 12, // Smaller text
  },
});

export default LoginScreen;

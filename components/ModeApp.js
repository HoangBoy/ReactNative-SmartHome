import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ModeApp = (props) => {
  const { icon, text, onPress } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginVertical: 8,
        borderColor: '#E5E5E5',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5, // Chỉ áp dụng cho Android
      }}
      activeOpacity={0.7} // Giảm độ sáng khi nhấn nút
    >
      <View style={{ marginRight: 10 }}>
        {icon} {/* Icon hiển thị bên trái */}
      </View>
      <Text style={{ color: '#333', fontSize: 16, fontWeight: '500' }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ModeApp;

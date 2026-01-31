import { router } from "expo-router"; // Direct export is fine!
import { Text, View, TouchableOpacity } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50 p-6">
      
      <Text className="text-3xl font-bold text-slate-900 mb-2">
        NativeWind Pro
      </Text>
      
      <Text className="text-base text-slate-500 text-center mb-8">
        Your high-performance Expo stack is now ready.
      </Text>

      <TouchableOpacity 
        activeOpacity={0.7}
        className="bg-blue-600 px-8 py-4 rounded-2xl shadow-lg shadow-blue-400"
        onPress={() => {
          console.log("Button Pressed!");
          // Use the absolute path from the /app folder
          router.push("../WelcomeScreen"); 
        }}
      >
        <Text className="text-white font-semibold text-lg text-center">
          Get Started
        </Text>
      </TouchableOpacity>

    </View>
  );
}
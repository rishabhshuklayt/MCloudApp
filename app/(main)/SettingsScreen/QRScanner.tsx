import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { ChevronLeft, Layers, RefreshCw, Zap } from "lucide-react-native";
import React, { useState } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const QRScannerScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(false);

  if (!permission) return <View className="flex-1 bg-[#020617]" />;

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-[#020617] items-center justify-center px-10">
        <Layers color="#6366f1" size={60} className="mb-6 opacity-20" />
        <Text className="text-white text-2xl font-black text-center">
          Camera Access
        </Text>
        <Text className="text-slate-500 text-center mt-2 mb-8 font-medium">
          We need your camera to scan system credentials and invite codes.
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-indigo-600 px-8 py-4 rounded-[24px] shadow-xl shadow-indigo-500/40"
        >
          <Text className="text-white font-black uppercase tracking-widest">
            Enable Lens
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    // You can process your data here (e.g., if it's a mongoURI or Invite)
    alert(`System Scanned: ${data}`);
  };

  return (
    <View className="flex-1 bg-black">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        enableTorch={torch}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      />

      {/* --- FUTURISTIC OVERLAY --- */}
      <View
        style={StyleSheet.absoluteFillObject}
        className="items-center justify-center"
      >
        {/* The Scanning Frame */}
        <View className="w-72 h-72 border-2 border-white/20 rounded-[40px] items-center justify-center">
          {/* Animated corner accents */}
          <View className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-indigo-500 rounded-tl-[30px]" />
          <View className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-indigo-500 rounded-tr-[30px]" />
          <View className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-indigo-500 rounded-bl-[30px]" />
          <View className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-indigo-500 rounded-br-[30px]" />

          {/* Glass blur effect hint (Transparent center) */}
          <View className="w-64 h-64 bg-indigo-500/5 rounded-[30px] border border-white/5" />
        </View>
        <Text className="text-white/60 font-bold mt-8 tracking-[4px] uppercase text-[10px]">
          Align QR Code within Frame
        </Text>
      </View>

      {/* --- TOP CONTROLS --- */}
      <SafeAreaView className="absolute top-0 left-0 right-0 px-6 pt-4">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-black/40 p-3 rounded-2xl border border-white/10 backdrop-blur-md"
          >
            <ChevronLeft color="#fff" size={24} />
          </TouchableOpacity>
          <Text className="text-white font-black text-lg tracking-tighter">
            System Scanner
          </Text>
          <TouchableOpacity
            onPress={() => setTorch(!torch)}
            className={`${torch ? "bg-yellow-500" : "bg-black/40"} p-3 rounded-2xl border border-white/10`}
          >
            <Zap
              color={torch ? "#000" : "#fff"}
              size={24}
              fill={torch ? "#000" : "none"}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* --- BOTTOM ACTION --- */}
      {scanned && (
        <View className="absolute bottom-20 left-0 right-0 items-center px-10">
          <TouchableOpacity
            onPress={() => setScanned(false)}
            className="bg-white w-full py-5 rounded-[30px] flex-row items-center justify-center shadow-2xl"
          >
            <RefreshCw color="#020617" size={20} className="mr-3" />
            <Text className="text-[#020617] font-black text-base uppercase">
              Scan Again
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default QRScannerScreen;

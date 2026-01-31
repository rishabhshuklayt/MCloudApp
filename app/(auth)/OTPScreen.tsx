import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ArrowLeft, ShieldCheck, RefreshCcw } from 'lucide-react-native';

interface OTPScreenProps {
  route: {
    params: {
      email: string;
      purpose: 'SIGNUP' | 'FORGOT_PASSWORD' | 'AUTH';
    };
  };
  navigation: any;
}

const OTPScreen = ({ route, navigation }: OTPScreenProps) => {
  const { email, purpose } = route.params;
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(30);
  const inputRef = useRef<TextInput>(null);
  const CODE_LENGTH = 6;

  // 1. Timer Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Purpose-based API Caller
  const verifyOTP = async (finalCode: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    
    console.log(`Calling API for purpose: ${purpose} with code: ${finalCode}`);
    
    // Industry Logic: Switch based on purpose
    try {
      if (purpose === 'SIGNUP') {
        // await api.verifySignup(email, finalCode)
      } else if (purpose === 'FORGOT_PASSWORD') {
        // await api.verifyReset(email, finalCode)
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (err) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setCode(''); // Clear on error
    }
  };

  const handleTextChange = (text: string) => {
    setCode(text);
    if (text.length === CODE_LENGTH) {
      verifyOTP(text);
      Keyboard.dismiss();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-8">
      {/* Header */}
      <TouchableOpacity onPress={() => navigation.goBack()} className="mt-4">
        <ArrowLeft color="#0f172a" size={24} />
      </TouchableOpacity>

      <Animated.View entering={FadeInDown.delay(200)} className="mt-10 items-center">
        <View className="w-20 h-20 bg-blue-50 rounded-full items-center justify-center mb-6">
          <ShieldCheck size={40} color="#3b82f6" />
        </View>
        <Text className="text-3xl font-poppins-bold text-slate-900">Verify It's You</Text>
        <Text className="text-slate-500 font-poppins-reg text-center mt-3 leading-6">
          We sent a {CODE_LENGTH}-digit code to{"\n"}
          <Text className="font-poppins-medium text-slate-900">{email}</Text>
        </Text>
      </Animated.View>

      {/* OTP Input Boxes */}
      <TouchableOpacity 
        activeOpacity={1} 
        onPress={() => inputRef.current?.focus()}
        className="flex-row justify-between mt-12"
      >
        {Array(CODE_LENGTH).fill(0).map((_, i) => (
          <View 
            key={i}
            className={`w-12 h-16 rounded-2xl border-2 items-center justify-center bg-slate-50
              ${code.length === i ? 'border-blue-600' : 'border-slate-100'}`}
          >
            <Text className="text-2xl font-poppins-bold text-slate-900">
              {code[i] || ""}
            </Text>
          </View>
        ))}
      </TouchableOpacity>

      {/* Hidden Actual Input */}
      <TextInput
        ref={inputRef}
        value={code}
        onChangeText={handleTextChange}
        maxLength={CODE_LENGTH}
        keyboardType="number-pad"
        className="absolute opacity-0"
        autoFocus
      />

      {/* Resend Logic */}
      <View className="mt-10 items-center">
        {timer > 0 ? (
          <Text className="text-slate-400 font-poppins-medium">
            Resend code in <Text className="text-blue-600">{timer}s</Text>
          </Text>
        ) : (
          <TouchableOpacity 
            className="flex-row items-center" 
            onPress={() => { setTimer(30); setCode(''); }}
          >
            <RefreshCcw size={16} color="#3b82f6" />
            <Text className="text-blue-600 font-poppins-bold ml-2">Resend Code</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Manual Verify Button (Optional backup) */}
      <TouchableOpacity 
        disabled={code.length !== CODE_LENGTH}
        onPress={() => verifyOTP(code)}
        className={`mt-auto mb-10 h-16 rounded-2xl items-center justify-center 
          ${code.length === CODE_LENGTH ? 'bg-slate-900' : 'bg-slate-200'}`}
      >
        <Text className="text-white font-poppins-bold text-lg">Verify & Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OTPScreen;
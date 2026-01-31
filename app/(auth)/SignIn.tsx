// import BASE_URL from "@/constants/API";
import { BASE_URL } from "@/constants/API";
import { useAuth } from "@/context/AuthContext";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { ArrowLeft, ChevronRight, Lock, Mail } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

const LoginScreen = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login } = useAuth();

  // Validation function
  const validateEmail = (emailValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError("Please enter a valid business email");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (passwordValue: string) => {
    if (passwordValue.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const nextStep = async () => {
    console.log("Next step triggered");
    console.log("Email entered:", email);
    if (validateEmail(email)) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setStep(2);
      setApiError("");
      console.log("Email validation passed, moving to step 2");
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      console.log("Email validation failed");
    }
  };

  const onSubmit = async () => {
    console.log("Sign In button pressed");
    console.log("Email:", email);
    console.log("Password:", password);

    if (!validatePassword(password)) {
      console.log("Password validation failed");
      return;
    }

    try {
      console.log("Starting login request");
      setLoading(true);
      setApiError("");

      const requestBody = {
        email: email,
        password: password,
      };
      console.log("Request body being sent:", requestBody);
      console.log("API URL:", `${BASE_URL}/auth/login`);

      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("API Response status:", response.status);

      if (response.status === 200) {
        const responseData = await response.json();
        console.log("Response data:", responseData.token);

        if (responseData.token) {
          // Use AuthContext to set token and update auth state
          try {
            await login(responseData.token);
          } catch (e) {
            console.error("Error saving token via AuthContext:", e);
          }

          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          Alert.alert("Success", "Login successful!");
          console.log("Login successful and token stored via AuthContext");

          // Navigate to home screen (replace so user can't go back to auth)
          router.replace("/(main)/HomeScreen");
        } else {
          setApiError("No token received from server");
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
      } else {
        const errorData = await response.json();
        console.log("Error response:", errorData);
        setApiError(errorData.message || "Login failed. Please try again.");
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setApiError(
        error.message ||
          "An error occurred. Please check your connection and try again.",
      );
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-surface px-8"
    >
      {/* Header */}
      <View className="mt-20">
        <TouchableOpacity
          onPress={() => (step === 2 ? setStep(1) : null)}
          className="mb-8"
        >
          <ArrowLeft color={step === 2 ? "#0f172a" : "transparent"} size={24} />
        </TouchableOpacity>

        <Text className="text-3xl font-poppins-bold text-secondary">
          {step === 1 ? "Welcome Back" : "Security Check"}
        </Text>
        <Text className="text-muted font-poppins-reg text-base mt-2">
          {step === 1
            ? "Enter your email to continue"
            : "Now enter your secure password"}
        </Text>
      </View>

      {/* Form Steps */}
      <View className="mt-12">
        {step === 1 ? (
          <Animated.View entering={FadeInRight} exiting={FadeOutLeft}>
            <View className="flex-row items-center border-b border-border py-3 px-1">
              <Mail size={20} color="#64748b" />
              <TextInput
                placeholder="name@company.com"
                className="flex-1 ml-4 font-poppins-medium text-secondary text-lg"
                placeholderTextColor="#94a3b8"
                onChangeText={setEmail}
                value={email}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            {emailError ? (
              <Text className="text-red-500 font-poppins-reg text-xs mt-2">
                {emailError}
              </Text>
            ) : null}
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInRight} exiting={FadeOutLeft}>
            <View className="flex-row items-center border-b border-border py-3 px-1">
              <Lock size={20} color="#64748b" />
              <TextInput
                placeholder="••••••••"
                secureTextEntry
                className="flex-1 ml-4 font-poppins-medium text-secondary text-lg"
                placeholderTextColor="#94a3b8"
                onChangeText={setPassword}
                value={password}
                autoFocus
              />
            </View>
            {passwordError ? (
              <Text className="text-red-500 font-poppins-reg text-xs mt-2">
                {passwordError}
              </Text>
            ) : null}
          </Animated.View>
        )}
      </View>

      {/* Action Button */}
      <TouchableOpacity
        onPress={() => {
          console.log("Button pressed, current step:", step);
          if (step === 1) {
            nextStep();
          } else {
            onSubmit();
          }
        }}
        disabled={loading}
        activeOpacity={0.9}
        className="bg-secondary h-16 rounded-xl-card flex-row items-center justify-center mt-12 shadow-xl shadow-slate-300"
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <>
            <Text className="text-white font-poppins-bold text-lg mr-2">
              {step === 1 ? "Continue" : "Sign In"}
            </Text>
            <ChevronRight color="white" size={20} />
          </>
        )}
      </TouchableOpacity>

      {/* Error Message */}
      {apiError && (
        <View className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
          <Text className="text-red-600 font-poppins-reg text-sm">
            {apiError}
          </Text>
        </View>
      )}

      <TouchableOpacity className="mt-6 items-center">
        <Text className="text-primary font-poppins-medium text-sm">
          Forgot Password?
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

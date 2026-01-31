// import { View, Text } from 'react-native'
// import React, { useRef } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import LottieView from 'lottie-react-native' // Import Lottie
// import { ANIMATION } from '@/constants/animation'

// const WelcomeScreen = () => {
//   const animation = useRef<LottieView>(null);

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <View className="flex-1 items-center p-6">
//         <Text className="text-3xl font-bold text-slate-900 mb-8">
//           Welcome
//         </Text>

//         {/* This replaces your Image */}
//         <LottieView
//           autoPlay
//           loop
//           enableMergePathsAndroidForKitKatAndAbove
//           ref={animation}
//           style={{
//             width: 350,
//             height: 350,
//           }}
//           colorFilters={[
//     {
//       keypath: "**",
//       color: "#3b82f6", // Your Tailwind blue-500 hex code
//     },
//   ]}
//           // Path to your JSON file
//           source={ANIMATION.WelcomeAnime}
//         />

//         <Text className="text-base text-slate-500 text-center mt-8">
//           Your industry-grade Lottie animation is now running.
//         </Text>
//       </View>
//     </SafeAreaView>
//   )
// }

// export default WelcomeScreen

// import React from 'react';
// import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import LottieView from 'lottie-react-native';
// import * as Haptics from 'expo-haptics';
// import { Chrome, Github, Mail, ArrowRight } from 'lucide-react-native';
// import { ANIMATION } from '@/constants/animation';

// const WelcomeScreen = () => {

//   const handlePress = () => {
//     // Pro touch: adds a tiny vibration when clicking
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-slate-50">
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//         <View className="flex-1 px-8 pt-4">

//           {/* 1. The Visual Header */}
//           <View className="items-center justify-center py-4">
//             <LottieView
//               autoPlay
//               loop
//               source={ANIMATION.WelcomeAnime}
//               style={{ width: 320, height: 320 }}
//               resizeMode="contain"
//             />
//           </View>

//           {/* 2. Welcome Text Block */}
//           <View className="mt-2">
//             <Text className="text-4xl font-bold text-slate-900 tracking-tight">
//               Cloud Hosting{"\n"}
//               <Text className="text-blue-600">Simplified.</Text>
//             </Text>
//             <Text className="text-lg text-slate-500 mt-4 leading-6">
//               Deploy, manage, and scale your applications with MCloud's
//               industry-grade infrastructure.
//             </Text>
//           </View>

//           {/* 3. Primary Action Buttons */}
//           <View className="mt-10 gap-y-4">
//             <TouchableOpacity
//               onPress={handlePress}
//               activeOpacity={0.8}
//               className="bg-blue-600 h-16 rounded-2xl flex-row items-center justify-center shadow-lg shadow-blue-300"
//             >
//               <Text className="text-white text-lg font-bold mr-2">Get Started</Text>
//               <ArrowRight color="white" size={20} />
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={handlePress}
//               className="h-16 rounded-2xl border border-slate-200 items-center justify-center bg-white"
//             >
//               <Text className="text-slate-900 text-lg font-semibold">Sign In</Text>
//             </TouchableOpacity>
//           </View>

//           {/* 4. Social Handles Section */}
//           <View className="mt-auto pb-8">
//             <View className="flex-row items-center mb-6">
//               <View className="flex-1 h-[1px] bg-slate-200" />
//               <Text className="px-4 text-slate-400 font-medium">Or continue with</Text>
//               <View className="flex-1 h-[1px] bg-slate-200" />
//             </View>

//             <View className="flex-row justify-center gap-x-6">
//               <SocialButton icon={<Chrome size={24} color="#64748b" />} />
//               <SocialButton icon={<Github size={24} color="#64748b" />} />
//               <SocialButton icon={<Mail size={24} color="#64748b" />} />
//             </View>
//           </View>

//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// // Reusable Social Icon Component
// const SocialButton = ({ icon }: { icon: React.ReactNode }) => (
//   <TouchableOpacity
//     onPress={() => Haptics.selectionAsync()}
//     className="w-14 h-14 rounded-full border border-slate-200 items-center justify-center bg-white shadow-sm"
//   >
//     {icon}
//   </TouchableOpacity>
// );

// export default WelcomeScreen;

import { ANIMATION } from "@/constants/animation";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { ArrowRight, Chrome, Github, Mail } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeScreen = () => {
  const handlePress = (style = Haptics.ImpactFeedbackStyle.Medium) => {
    Haptics.impactAsync(style);
    router.push("./SignIn");
  };
  const handlePressRegistration = (
    style = Haptics.ImpactFeedbackStyle.Medium,
  ) => {
    Haptics.impactAsync(style);
    router.push("./Signup");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Main Container - No ScrollView needed if we balance spacing */}
      <View className="flex-1 px-8 py-6 justify-between">
        {/* 1. TOP SECTION: Branding & Animation */}
        <View className="items-center">
          <View className="w-full items-start mb-2">
            <Text className="text-blue-600 font-bold tracking-widest text-xs uppercase">
              MCloud Platform
            </Text>
          </View>
          <LottieView
            autoPlay
            loop
            source={ANIMATION.WelcomeAnime}
            style={{ width: 280, height: 280 }} // Reduced slightly to save space
            resizeMode="contain"
          />
        </View>

        {/* 2. MIDDLE SECTION: Value Proposition */}
        <View>
          <Text className="text-4xl font-extrabold text-slate-900 leading-[44px]">
            Cloud Storage{"\n"}
            <Text className="text-blue-600">Simplified.</Text>
          </Text>
          <Text className="text-slate-500 text-lg mt-3 leading-6 font-medium">
            Store your Docs in seconds on your own Private DB through our
            high-performance Backend Servcies.
          </Text>
        </View>

        {/* 3. BOTTOM SECTION: Actions & Social */}
        <View>
          {/* Main Buttons */}
          <View className="gap-y-3 mb-8">
            <TouchableOpacity
              onPress={() => handlePressRegistration()}
              activeOpacity={0.9}
              className="bg-slate-900 h-14 rounded-2xl flex-row items-center justify-center"
            >
              <Text className="text-white text-base font-bold mr-2">
                Create Account
              </Text>
              <ArrowRight color="white" size={18} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handlePress(Haptics.ImpactFeedbackStyle.Light)}
              className="h-14 rounded-2xl items-center justify-center bg-slate-50 border border-slate-100"
            >
              <Text className="text-slate-900 text-base font-bold">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social Login - Optimized for Zero Scroll */}
          <View>
            <View className="flex-row items-center mb-5">
              <View className="flex-1 h-[1px] bg-slate-100" />
              <Text className="px-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                Quick Connect
              </Text>
              <View className="flex-1 h-[1px] bg-slate-100" />
            </View>

            <View className="flex-row justify-between">
              <SocialButton
                icon={<Chrome size={22} color="#1e293b" />}
                label="Google"
              />
              <SocialButton
                icon={<Github size={22} color="#1e293b" />}
                label="Github"
              />
              <SocialButton
                icon={<Mail size={22} color="#1e293b" />}
                label="Email"
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Modern Wide Social Button
const SocialButton = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <TouchableOpacity
    onPress={() => Haptics.selectionAsync()}
    className="flex-1 flex-row h-12 mx-1 rounded-xl border border-slate-100 items-center justify-center bg-white shadow-sm shadow-slate-200"
  >
    {icon}
  </TouchableOpacity>
);

export default WelcomeScreen;

// import { useAuth } from "@/context/AuthContext";
// import { LinearGradient } from "expo-linear-gradient"; // Install: npx expo install expo-linear-gradient
// import {
//   Activity,
//   ArrowUpRight,
//   Bell,
//   Cpu,
//   LayoutGrid,
//   LogOut,
//   Search,
//   TrendingUp,
//   User,
//   Zap,
// } from "lucide-react-native";
// import React from "react";
// import {
//   Dimensions,
//   ImageBackground,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const { width } = Dimensions.get("window");

// const HomeScreen = () => {
//   const { user, logout } = useAuth();
//   const displayName = user?.firstName || "Developer";

//   return (
//     <View className="flex-1 bg-[#0f172a]">
//       {/* 1. TOP GRADIENT BLEND - Syncs with Status Bar */}
//       <LinearGradient
//         colors={["#4f46e5", "#1e1b4b", "#0f172a"]}
//         style={{ position: "absolute", top: 0, left: 0, right: 0, height: 300 }}
//       />

//       <SafeAreaView className="flex-1">
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 100 }}
//         >
//           {/* --- PREMIUM HEADER --- */}
//           <View className="px-6 pt-4 flex-row justify-between items-center">
//             <View>
//               <Text className="text-indigo-200 text-xs font-bold uppercase tracking-[2px]">
//                 Overview
//               </Text>
//               <Text className="text-white text-3xl font-black tracking-tight">
//                 Hi, {displayName} 👋
//               </Text>
//             </View>
//             <TouchableOpacity className="bg-white/10 p-3 rounded-2xl border border-white/20">
//               <Bell color="#fff" size={22} />
//             </TouchableOpacity>
//           </View>

//           {/* --- SEARCH BAR (Glassmorphism) --- */}
//           <View className="px-6 mt-6">
//             <View className="flex-row items-center bg-white/10 px-4 py-3 rounded-2xl border border-white/10">
//               <Search color="#94a3b8" size={20} />
//               <Text className="text-slate-400 ml-3 font-medium">
//                 Search analytics...
//               </Text>
//             </View>
//           </View>

//           {/* --- FEATURED HERO CARD (Image + Gradient) --- */}
//           <View className="px-6 mt-8">
//             <ImageBackground
//               source={{
//                 uri: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
//               }}
//               imageStyle={{ borderRadius: 32 }}
//               className="w-full h-48 overflow-hidden"
//             >
//               <LinearGradient
//                 colors={["transparent", "rgba(0,0,0,0.8)"]}
//                 className="flex-1 p-6 justify-end"
//               >
//                 <View className="flex-row justify-between items-center">
//                   <View>
//                     <Text className="text-white/70 text-xs font-bold uppercase">
//                       Current Server Load
//                     </Text>
//                     <Text className="text-white text-2xl font-black italic">
//                       89.4% Capacity
//                     </Text>
//                   </View>
//                   <View className="bg-emerald-500 px-3 py-1 rounded-full">
//                     <Text className="text-white text-[10px] font-bold">
//                       STABLE
//                     </Text>
//                   </View>
//                 </View>
//               </LinearGradient>
//             </ImageBackground>
//           </View>

//           {/* --- HORIZONTAL STATS --- */}
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             className="pl-6 mt-8"
//           >
//             <StatCard
//               icon={<Cpu color="#818cf8" size={20} />}
//               label="CPU"
//               value="24%"
//               color="indigo"
//             />
//             <StatCard
//               icon={<Activity color="#fbbf24" size={20} />}
//               label="RAM"
//               value="4.2GB"
//               color="amber"
//             />
//             <StatCard
//               icon={<TrendingUp color="#34d399" size={20} />}
//               label="Traffic"
//               value="+12%"
//               color="emerald"
//             />
//           </ScrollView>

//           {/* --- QUICK ACTIONS (Bento Box) --- */}
//           <View className="px-6 mt-8">
//             <Text className="text-white text-xl font-black mb-4 tracking-tight">
//               Control Center
//             </Text>
//             <View className="flex-row flex-wrap justify-between">
//               <ActionCard
//                 icon={<LayoutGrid color="#fff" size={24} />}
//                 title="Projects"
//                 bg="#6366f1"
//               />
//               <ActionCard
//                 icon={<User color="#fff" size={24} />}
//                 title="Team"
//                 bg="#f59e0b"
//               />
//               <ActionCard
//                 icon={<Zap color="#fff" size={24} />}
//                 title="Metrics"
//                 bg="#10b981"
//               />
//               <ActionCard
//                 icon={<LogOut color="#fff" size={24} />}
//                 title="Exit"
//                 bg="#ef4444"
//                 action={logout}
//               />
//             </View>
//           </View>
//         </ScrollView>
//       </SafeAreaView>

//       {/* 2. BOTTOM NAV BLEND - Glassy Background */}
//       <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
//         <LinearGradient
//           colors={["transparent", "#0f172a"]}
//           style={{ height: 40 }}
//         />
//         <View className="bg-[#1e293b]/90 border-t border-white/10 px-10 pt-4 pb-8 flex-row justify-between items-center">
//           <LayoutGrid color="#6366f1" size={28} />
//           <Activity color="#94a3b8" size={28} />
//           <View className="bg-indigo-600 p-3 rounded-2xl -mt-12 shadow-lg shadow-indigo-500">
//             <Zap color="#fff" size={28} fill="#fff" />
//           </View>
//           <User color="#94a3b8" size={28} />
//           <ArrowUpRight color="#94a3b8" size={28} />
//         </View>
//       </View>
//     </View>
//   );
// };

// // --- Sub-Components ---

// const StatCard = ({ icon, label, value, color }: any) => (
//   <View className="bg-white/5 border border-white/10 p-4 rounded-[24px] mr-4 w-32">
//     <View
//       className={`bg-${color}-500/20 w-10 h-10 rounded-xl items-center justify-center mb-3`}
//     >
//       {icon}
//     </View>
//     <Text className="text-slate-400 text-xs font-medium">{label}</Text>
//     <Text className="text-white text-lg font-bold">{value}</Text>
//   </View>
// );

// const ActionCard = ({ icon, title, bg, action }: any) => (
//   <TouchableOpacity
//     onPress={action}
//     activeOpacity={0.7}
//     style={{ backgroundColor: bg }}
//     className="w-[48%] p-6 rounded-[32px] mb-4 items-center shadow-lg"
//   >
//     <View className="bg-white/20 p-3 rounded-2xl mb-2">{icon}</View>
//     <Text className="text-white font-black text-sm uppercase tracking-widest">
//       {title}
//     </Text>
//   </TouchableOpacity>
// );

// export default HomeScreen;

import { useAuth } from "@/context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Activity,
  ArrowUpRight,
  Bell,
  Cpu,
  LayoutGrid,
  LogOut,
  Search,
  ShieldCheck,
  TrendingUp,
  User,
  Zap,
} from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const HomeScreen = () => {
  const { logout, user } = useAuth();
  const insets = useSafeAreaInsets();
  const displayName = user?.firstName || "Marc";

  return (
    <View className="flex-1 bg-[#020617]">
      {/* 1. SOFT GLOW BACKGROUND (The "Luxury" Light Leak) */}
      <View className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl" />
      <View className="absolute top-[40%] -left-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
          className="px-6"
        >
          {/* --- MINIMALIST HEADER --- */}
          <View className="flex-row justify-between items-center mt-4">
            <View>
              <Text className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                Master Node
              </Text>
              <Text className="text-white text-3xl font-black">
                {displayName}.
              </Text>
            </View>
            <View className="flex-row gap-x-3">
              <TouchableOpacity className="bg-white/5 p-3 rounded-2xl border border-white/10 shadow-sm">
                <Bell color="#94a3b8" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={logout}
                className="bg-red-500/10 p-3 rounded-2xl border border-red-500/20"
              >
                <LogOut color="#ef4444" size={20} />
              </TouchableOpacity>
            </View>
          </View>

          {/* --- GLASS SEARCH BAR --- */}
          <View className="mt-8 bg-white/5 rounded-3xl border border-white/10 flex-row items-center px-5 py-4">
            <Search color="#64748b" size={18} />
            <Text className="text-slate-500 ml-3 font-medium">
              Search infrastructure...
            </Text>
          </View>

          {/* --- THE "HERO" BENTO BOX --- */}
          <View className="mt-8">
            <LinearGradient
              colors={["#4f46e5", "#3b82f6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-[40px] p-8 shadow-2xl shadow-indigo-500/40 overflow-hidden"
            >
              {/* Subtle Texture Overlay */}
              <View className="absolute top-0 left-0 right-0 bottom-0 opacity-10">
                <LayoutGrid
                  color="#fff"
                  size={200}
                  strokeWidth={0.5}
                  style={{
                    transform: [{ rotate: "45deg" }, { translateX: 50 }],
                  }}
                />
              </View>

              <View className="flex-row justify-between items-start">
                <View>
                  <View className="bg-white/20 self-start px-3 py-1 rounded-full border border-white/30">
                    <Text className="text-white text-[10px] font-black uppercase tracking-tighter">
                      System Pulse
                    </Text>
                  </View>
                  <Text className="text-white text-4xl font-black mt-4 tracking-tighter">
                    98.2<Text className="text-indigo-200 text-2xl">%</Text>
                  </Text>
                  <Text className="text-indigo-100 text-sm font-medium opacity-80 mt-1">
                    Operational Efficiency
                  </Text>
                </View>
                <View className="bg-white/20 p-4 rounded-3xl">
                  <TrendingUp color="#fff" size={32} />
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* --- KPI STATS GRID --- */}
          <View className="flex-row justify-between mt-6">
            <SmallStat
              label="CPU"
              value="12%"
              icon={<Cpu color="#818cf8" size={16} />}
            />
            <SmallStat
              label="Latency"
              value="24ms"
              icon={<Zap color="#fbbf24" size={16} />}
            />
            <SmallStat
              label="Security"
              value="Max"
              icon={<ShieldCheck color="#34d399" size={16} />}
            />
          </View>

          {/* --- INTERACTIVE ACTION GRID --- */}
          <Text className="text-white text-xl font-bold mt-10 mb-4 tracking-tight">
            Management Suite
          </Text>
          <View className="flex-row flex-wrap justify-between">
          
              <RichCard
                title="Deployment"
                desc="12 Active"
                icon={<ArrowUpRight color="#fff" />}
                color="#6366f1"
              />
           
            <RichCard
              title="Analytics"
              desc="Real-time"
              icon={<Activity color="#fff" />}
              color="#10b981"
            />
            <RichCard
              title="Team"
              desc="4 Online"
              icon={<User color="#fff" />}
              color="#f59e0b"
            />
            <RichCard
              title="Logs"
              desc="3 Alerts"
              icon={<LayoutGrid color="#fff" />}
              color="#64748b"
            />
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* --- PREMIUM BOTTOM NAV BAR --- */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: insets.bottom + 10,
        }}
        className="px-8"
      >
        <View className="bg-[#0f172a]/90 border border-white/10 rounded-[40px] flex-row justify-around items-center py-4 shadow-2xl overflow-hidden">
          <LayoutGrid color="#6366f1" size={24} />
          <Activity color="#64748b" size={24} />

          {/* Floating "Zap" Core */}
          <TouchableOpacity className="bg-white p-4 rounded-3xl -mt-10 shadow-lg border-4 border-[#020617]">
            <Zap color="#020617" size={26} fill="#020617" />
          </TouchableOpacity>

          <Search color="#64748b" size={24} />
          <TouchableOpacity
            onPress={() => router.push("/(main)/ProfileScreen")}
          >
            <User color="#64748b" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// --- RICH SUB-COMPONENTS ---

const SmallStat = ({ label, value, icon }: any) => (
  <View className="bg-white/5 border border-white/10 p-4 rounded-3xl w-[31%] items-center">
    <View className="mb-2">{icon}</View>
    <Text className="text-white text-lg font-black">{value}</Text>
    <Text className="text-slate-500 text-[10px] font-bold uppercase">
      {label}
    </Text>
  </View>
);

const RichCard = ({ title, desc, icon, color }: any) => (
  <TouchableOpacity
    activeOpacity={0.8}
    className="w-[48%] bg-white/5 border border-white/10 p-6 rounded-[35px] mb-4 shadow-sm"
  >
    <View
      style={{ backgroundColor: color }}
      className="w-12 h-12 rounded-2xl items-center justify-center mb-4 shadow-xl"
    >
      {icon}
    </View>
    <Text className="text-white font-black text-base">{title}</Text>
    <Text className="text-slate-500 text-xs font-medium mt-1">{desc}</Text>
  </TouchableOpacity>
);

export default HomeScreen;

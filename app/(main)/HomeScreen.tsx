import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import {
  ArrowUpRight,
  LayoutGrid,
  LogOut,
  User,
  Zap,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  // SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("User");

  const { user, logout } = useAuth();

  useEffect(() => {
    // Logic to pull user name from SecureStore or API
    setUserName(user?.firstName);
    console.log("babu ", user);
  }, []);

  const handleLogout = async () => {
    console.log("babu ", user);
    await logout();
    router.replace("/(auth)/WelcomeScreen");
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView showsVerticalScrollIndicator={false} className="px-6">
        {/* --- HEADER --- */}
        <View className="flex-row justify-between items-center mt-8 mb-8">
          <View>
            <Text className="text-slate-500 text-base font-medium">
              Welcome back,
            </Text>
            <Text className="text-slate-900 text-3xl font-bold">
              {userName} 👋
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm"
          >
            <LogOut color="#ef4444" size={24} />
          </TouchableOpacity>
        </View>

        {/* --- MAIN STATUS CARD --- */}
        <View className="bg-indigo-600 p-6 rounded-[32px] flex-row justify-between items-center mb-8 shadow-xl shadow-indigo-300">
          <View>
            <Text className="text-indigo-100 text-sm font-semibold tracking-wider uppercase">
              System Status
            </Text>
            <Text className="text-white text-xl font-bold mt-1">
              All Systems Active
            </Text>
          </View>
          <View className="bg-indigo-500 p-3 rounded-full">
            <Zap color="#fff" size={28} fill="#fff" />
          </View>
        </View>

        {/* --- QUICK ACTIONS GRID --- */}
        <Text className="text-slate-900 text-xl font-bold mb-4">
          Quick Actions
        </Text>
        <View className="flex-row flex-wrap justify-between">
          <ActionCard
            icon={<LayoutGrid color="#6366f1" size={24} />}
            title="Projects"
          />
          <ActionCard icon={<User color="#f59e0b" size={24} />} title="Team" />
          <ActionCard
            icon={<Zap color="#10b981" size={24} />}
            title="Analytics"
          />
          <ActionCard
            icon={<ArrowUpRight color="#ef4444" size={24} />}
            title="Deploy"
          />
        </View>

        {/* --- RECENT ACTIVITY --- */}
        <View className="mt-4 mb-10">
          <Text className="text-slate-900 text-xl font-bold mb-4">
            Recent Activity
          </Text>
          {[1, 2].map((item) => (
            <View
              key={item}
              className="flex-row items-center bg-white p-4 rounded-2xl mb-3 border border-slate-100"
            >
              <View className="w-2 h-2 rounded-full bg-emerald-500 mr-4" />
              <View className="flex-1">
                <Text className="text-slate-800 font-semibold">
                  Server Update v.1.0.{item}
                </Text>
                <Text className="text-slate-400 text-xs mt-1">
                  Successfully deployed to production
                </Text>
              </View>
              <Text className="text-slate-400 text-xs font-medium">2h ago</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Action Card Sub-component
const ActionCard = ({ icon, title }: { icon: any; title: string }) => (
  <TouchableOpacity className="w-[48%] bg-white p-6 rounded-[24px] mb-4 items-center border border-slate-100 shadow-sm">
    <View className="bg-slate-50 p-4 rounded-2xl mb-3">{icon}</View>
    <Text className="text-slate-700 font-bold text-sm">{title}</Text>
  </TouchableOpacity>
);

export default HomeScreen;

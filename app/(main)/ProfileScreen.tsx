import { router } from "expo-router";
import {
    Bell,
    ChevronRight,
    CreditCard,
    HelpCircle,
    LogOut,
    Moon,
    Settings,
    Shield,
    User,
    Zap,
} from "lucide-react-native";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-[#020617]">
      {/* 1. AMBIENT BACKGROUND GLOW */}
      <View className="absolute top-[-10%] left-[-20%] w-full h-[50%] bg-indigo-600/10 rounded-full blur-[100px]" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
          className="px-6"
        >
          {/* --- PROFILE HEADER --- */}
          <View className="items-center mt-8">
            <View className="relative">
              <View className="p-1 rounded-[40px] border-2 border-indigo-500/50 shadow-2xl shadow-indigo-500/20">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2664&auto=format&fit=crop",
                  }}
                  className="w-28 h-28 rounded-[36px]"
                />
              </View>
              <View className="absolute -bottom-2 -right-2 bg-indigo-600 p-2 rounded-2xl border-4 border-[#020617]">
                <Zap color="#fff" size={16} fill="#fff" />
              </View>
            </View>

            <Text className="text-white text-3xl font-black mt-6 tracking-tighter">
              Marc Richards
            </Text>
            <View className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mt-2">
              <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                Premium Member
              </Text>
            </View>
          </View>

          {/* --- BENTO STATS GRID --- */}
          <View className="flex-row gap-x-4 mt-10">
            <View className="flex-1 bg-white/5 border border-white/10 p-5 rounded-[32px]">
              <Text className="text-slate-500 text-[10px] font-black uppercase mb-1">
                Total Savings
              </Text>
              <Text className="text-white text-2xl font-black">$12,450</Text>
            </View>
            <View className="flex-1 bg-indigo-600 p-5 rounded-[32px] shadow-lg shadow-indigo-500/30">
              <Text className="text-indigo-100 text-[10px] font-black uppercase mb-1">
                Current Plan
              </Text>
              <Text className="text-white text-2xl font-black italic">
                PRO +
              </Text>
            </View>
          </View>

          {/* --- OPTIONS LIST SECTION --- */}
          <View className="mt-10">
            <Text className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 ml-2">
              Account Settings
            </Text>

            <View className="bg-white/5 border border-white/10 rounded-[35px] overflow-hidden">
              <OptionItem
                icon={<User color="#6366f1" size={22} />}
                title="Personal Information"
              />
              <OptionDivider />
              <OptionItem
                icon={<Shield color="#10b981" size={22} />}
                title="Security & Privacy"
              />
              <OptionDivider />
              <TouchableOpacity
                onPress={() =>
                  router.push("/(main)/SettingsScreen/MyCredsScrenn")
                }
              >
                <OptionItem
                  icon={<Shield color="#10b981" size={22} />}
                  title="My Credentials"
                />

                <OptionDivider />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/(main)/SettingsScreen/QRScanner")}
              >
                <OptionItem
                  icon={<Shield color="#10b981" size={22} />}
                  title="My Credentials"
                />

                <OptionDivider />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  router.push("/(main)/SettingsScreen/InviteScreen")
                }
              >
                <OptionItem
                  icon={<Shield color="#10b981" size={22} />}
                  title="Invite Team"
                />

                <OptionDivider />
              </TouchableOpacity>
               <TouchableOpacity
                onPress={() =>
                  router.push("/(main)/FileScreen/ImageScreen")
                }
              >
                <OptionItem
                  icon={<Shield color="#10b981" size={22} />}
                  title="Image Gallery"
                />

                <OptionDivider />
              </TouchableOpacity>
              <OptionItem
                icon={<Bell color="#f59e0b" size={22} />}
                title="Notification Prefs"
              />
              <OptionDivider />
              <OptionItem
                icon={<CreditCard color="#ec4899" size={22} />}
                title="Payment Methods"
              />
            </View>
          </View>

          <View className="mt-8">
            <Text className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 ml-2">
              Preferences
            </Text>
            <View className="bg-white/5 border border-white/10 rounded-[35px] overflow-hidden">
              <OptionItem
                icon={<Moon color="#94a3b8" size={22} />}
                title="Dark Mode"
                value="On"
              />
              <OptionDivider />
              <OptionItem
                icon={<Settings color="#94a3b8" size={22} />}
                title="App Settings"
              />
              <OptionDivider />
              <OptionItem
                icon={<HelpCircle color="#94a3b8" size={22} />}
                title="Support Center"
              />
            </View>
          </View>

          {/* --- LOGOUT BUTTON --- */}
          <TouchableOpacity className="mt-10 bg-red-500/10 border border-red-500/20 py-5 rounded-[30px] items-center">
            <View className="flex-row items-center">
              <LogOut color="#ef4444" size={20} />
              <Text className="text-red-500 font-black text-base ml-3">
                Sign Out of System
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

// --- HELPER COMPONENTS ---

const OptionItem = ({ icon, title, value }: any) => (
  <TouchableOpacity
    activeOpacity={0.6}
    className="flex-row items-center justify-between px-6 py-5"
  >
    <View className="flex-row items-center">
      <View className="bg-white/5 p-2.5 rounded-xl border border-white/5">
        {icon}
      </View>
      <Text className="text-white font-bold text-[15px] ml-4">{title}</Text>
    </View>
    <View className="flex-row items-center">
      {value && (
        <Text className="text-slate-500 mr-2 font-medium">{value}</Text>
      )}
      <ChevronRight color="#334155" size={20} />
    </View>
  </TouchableOpacity>
);

const OptionDivider = () => <View className="h-[1px] bg-white/5 mx-6" />;

export default ProfileScreen;

import { router } from "expo-router";
import {
    Check,
    ChevronLeft,
    Edit3,
    Eye,
    Mail,
    Send,
    ShieldCheck,
    Users,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

const InviteScreen = () => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("Write"); // Default
  const [isSending, setIsSending] = useState(false);

  const roles = [
    { id: "Read", icon: <Eye size={20} />, desc: "Can view metrics only" },
    { id: "Write", icon: <Edit3 size={20} />, desc: "Can manage resources" },
    {
      id: "Admin",
      icon: <ShieldCheck size={20} />,
      desc: "Full system control",
    },
  ];

  const handleInvite = () => {
    if (!email.includes("@"))
      return Alert.alert("Error", "Enter a valid email");

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      Alert.alert("Sent!", `Invite sent to ${email} as ${selectedRole}`);
      setEmail("");
    }, 1500);
  };

  return (
    <View className="flex-1 bg-[#020617]">
      {/* LUXURY GLOW */}
      <View className="absolute top-[-10%] right-[-20%] w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
          {/* --- HEADER --- */}
          <View className="flex-row items-center mt-6">
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-white/5 p-2 rounded-xl border border-white/10 mr-4"
            >
              <ChevronLeft color="#fff" size={20} />
            </TouchableOpacity>
            <View>
              <Text className="text-white text-2xl font-black tracking-tighter">
                Invite Partner
              </Text>
              <Text className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                Collaborator Access
              </Text>
            </View>
          </View>

          {/* --- EMAIL INPUT --- */}
          <View className="mt-10">
            <Text className="text-slate-500 text-[10px] font-black uppercase ml-4 mb-2 tracking-widest">
              Recipient Email
            </Text>
            <View className="bg-white/5 border border-white/10 rounded-[30px] p-2 flex-row items-center">
              <View className="pl-4 pr-2">
                <Mail color="#94a3b8" size={18} />
              </View>
              <TextInput
                placeholder="partner@system.com"
                placeholderTextColor="#334155"
                value={email}
                onChangeText={setEmail}
                className="flex-1 text-white font-medium text-[15px] h-12"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* --- ROLE SELECTOR (BENTO STYLE) --- */}
          <View className="mt-8">
            <Text className="text-slate-500 text-[10px] font-black uppercase ml-4 mb-4 tracking-widest">
              Select Permission Level
            </Text>

            {roles.map((role) => (
              <TouchableOpacity
                key={role.id}
                onPress={() => setSelectedRole(role.id)}
                activeOpacity={0.7}
                className={`mb-3 p-5 rounded-[32px] border-2 flex-row items-center justify-between ${
                  selectedRole === role.id
                    ? "bg-indigo-600/10 border-indigo-500"
                    : "bg-white/5 border-white/5"
                }`}
              >
                <View className="flex-row items-center">
                  <View
                    className={`p-3 rounded-2xl ${selectedRole === role.id ? "bg-indigo-600" : "bg-white/5"}`}
                  >
                    {React.cloneElement(role.icon as React.ReactElement, {
                      color: "#fff",
                    })}
                  </View>
                  <View className="ml-4">
                    <Text className="text-white font-bold text-base">
                      {role.id}
                    </Text>
                    <Text className="text-slate-500 text-xs font-medium">
                      {role.desc}
                    </Text>
                  </View>
                </View>

                {selectedRole === role.id && (
                  <View className="bg-indigo-500 p-1 rounded-full">
                    <Check color="#fff" size={14} strokeWidth={4} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* --- SEND BUTTON --- */}
          <TouchableOpacity
            onPress={handleInvite}
            disabled={isSending}
            className="mt-10 bg-white py-5 rounded-[35px] flex-row items-center justify-center shadow-xl shadow-white/10"
          >
            {isSending ? (
              <Text className="text-[#020617] font-black text-base uppercase">
                Processing...
              </Text>
            ) : (
              <>
                <Text className="text-[#020617] font-black text-base uppercase mr-2">
                  Send Invitation
                </Text>
                <Send color="#020617" size={18} />
              </>
            )}
          </TouchableOpacity>

          {/* --- ACTIVE TEAM HINT --- */}
          <View className="mt-12 mb-20 items-center">
            <View className="flex-row items-center opacity-50">
              <Users color="#94a3b8" size={16} />
              <Text className="text-slate-500 text-xs font-medium ml-2">
                4 active seats remaining in Pro plan
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default InviteScreen;

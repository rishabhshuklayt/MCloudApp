import { router } from "expo-router";
import {
    CheckCircle2,
    ChevronLeft,
    Cpu,
    Database,
    Lock,
    RefreshCw,
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

const CredentialsScreen = () => {
  const insets = useSafeAreaInsets();

  // Separate states so updating one doesn't affect the other
  const [mongoUri, setMongoUri] = useState(
    "mongodb+srv://admin:••••••••@cluster0.x.mongodb.net/",
  );
  const [llmKey, setLlmKey] = useState("sk-ant-api03-••••••••••••••••");
  const [loadingField, setLoadingField] = useState<string | null>(null);

  const handleUpdate = (field: string, value: string) => {
    setLoadingField(field);

    // Simulate API call
    setTimeout(() => {
      setLoadingField(null);
      Alert.alert("Success", `${field} updated securely.`);
    }, 1500);
  };

  return (
    <View className="flex-1 bg-[#020617]">
      {/* AMBIENT BACKGROUND GLOW */}
      <View className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          className="px-6"
        >
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
                Security Vault
              </Text>
              <Text className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                Environment Keys
              </Text>
            </View>
          </View>

          {/* --- INFO CARD --- */}
          <View className="mt-8 bg-indigo-600/10 border border-indigo-500/20 p-5 rounded-[30px] flex-row items-center">
            <Lock color="#6366f1" size={24} />
            <Text className="text-indigo-200/80 text-xs font-medium ml-4 flex-1">
              Keys are encrypted at rest using AES-256. Changes are applied
              instantly to your active nodes.
            </Text>
          </View>

          {/* --- CREDENTIAL INPUTS --- */}
          <View className="mt-10">
            {/* MongoDB Input Group */}
            <CredentialInput
              label="MongoDB Connection URI"
              value={mongoUri}
              onChange={setMongoUri}
              icon={<Database color="#10b981" size={18} />}
              onUpdate={() => handleUpdate("MongoDB URI", mongoUri)}
              isLoading={loadingField === "MongoDB URI"}
            />

            <View className="h-6" />

            {/* LLM API Key Input Group */}
            <CredentialInput
              label="LLM API Key (Anthropic/OpenAI)"
              value={llmKey}
              onChange={setLlmKey}
              icon={<Cpu color="#818cf8" size={18} />}
              onUpdate={() => handleUpdate("LLM API Key", llmKey)}
              isLoading={loadingField === "LLM API Key"}
              isPassword
            />
          </View>

          {/* --- FOOTER HINT --- */}
          <View className="mt-12 items-center">
            <View className="flex-row items-center bg-white/5 px-4 py-2 rounded-full border border-white/5">
              <CheckCircle2 color="#94a3b8" size={14} />
              <Text className="text-slate-500 text-[10px] font-bold uppercase ml-2 tracking-widest">
                Last synced: 2 mins ago
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

// --- PREMIUM INPUT COMPONENT ---

const CredentialInput = ({
  label,
  value,
  onChange,
  icon,
  onUpdate,
  isLoading,
  isPassword,
}: any) => (
  <View>
    <Text className="text-slate-500 text-[10px] font-black uppercase ml-4 mb-2 tracking-widest">
      {label}
    </Text>
    <View className="bg-white/5 border border-white/10 rounded-[30px] p-2 flex-row items-center">
      <View className="pl-4 pr-2">{icon}</View>
      <TextInput
        value={value}
        onChangeText={onChange}
        secureTextEntry={isPassword}
        placeholderTextColor="#334155"
        className="flex-1 text-white font-medium text-[15px] h-12"
        selectionColor="#6366f1"
      />
      <TouchableOpacity
        onPress={onUpdate}
        disabled={isLoading}
        className={`${isLoading ? "bg-slate-800" : "bg-indigo-600"} h-10 px-5 rounded-[22px] items-center justify-center flex-row shadow-lg shadow-indigo-500/20`}
      >
        {isLoading ? (
          <RefreshCw color="#fff" size={16} className="animate-spin" />
        ) : (
          <Text className="text-white text-xs font-black uppercase">
            Update
          </Text>
        )}
      </TouchableOpacity>
    </View>
  </View>
);

export default CredentialsScreen;

import { FlashList } from "@shopify/flash-list"; // npx expo install @shopify/flash-list
import { router } from "expo-router";
import { ChevronLeft, Heart, Plus, Search } from "lucide-react-native";
import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 48) / 2; // Accounting for screen padding and gap

// Dummy Data with varied heights for Masonry effect
const DUMMY_ASSETS = [
  {
    id: "1",
    height: 280,
    title: "Neural Core",
    uri: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832",
  },
  {
    id: "2",
    height: 180,
    title: "Deep Sea",
    uri: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564",
  },
  {
    id: "3",
    height: 240,
    title: "Data Flow",
    uri: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670",
  },
  {
    id: "4",
    height: 320,
    title: "Cyber Pulse",
    uri: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2574",
  },
  {
    id: "5",
    height: 200,
    title: "Ghost Lab",
    uri: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672",
  },
  {
    id: "6",
    height: 260,
    title: "Void Node",
    uri: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670",
  },
];

const MasonryScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-[#020617]">
      {/* BACKGROUND DECOR */}
      <View className="absolute top-0 left-0 w-full h-96 bg-indigo-600/5 rounded-full blur-[120px]" />

      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* --- HEADER --- */}
        <View className="px-6 py-4 flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-white/5 p-2.5 rounded-2xl border border-white/10"
          >
            <ChevronLeft color="#fff" size={22} />
          </TouchableOpacity>
          <Text className="text-white text-xl font-black tracking-tight">
            Visual Assets
          </Text>
          <TouchableOpacity className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-500/40">
            <Plus color="#fff" size={22} />
          </TouchableOpacity>
        </View>

        {/* --- SEARCH --- */}
        <View className="px-6 mt-4 mb-6">
          <View className="bg-white/5 border border-white/10 rounded-[28px] flex-row items-center px-5 py-4">
            <Search color="#64748b" size={18} />
            <Text className="text-slate-500 ml-3 font-medium">
              Filter inspiration...
            </Text>
          </View>
        </View>

        {/* --- MASONRY LIST --- */}
        <View className="flex-1 px-4">
          <FlashList
            data={DUMMY_ASSETS}
            masonry
            numColumns={2}
            keyExtractor={(item) => item.id}
            estimatedItemSize={250}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
            renderItem={({ item }) => (
              <View className="p-2">
                <TouchableOpacity
                  activeOpacity={0.9}
                  className="bg-white/5 rounded-[32px] overflow-hidden border border-white/10"
                >
                  <Image
                    source={{ uri: item.uri }}
                    style={{ width: "100%", height: item.height }}
                    className="bg-slate-800"
                  />

                  {/* Glass Overlay on Image Bottom */}
                  <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/20 backdrop-blur-md flex-row justify-between items-center">
                    <View>
                      <Text className="text-white text-[10px] font-black uppercase tracking-tighter">
                        {item.title}
                      </Text>
                    </View>
                    <View className="flex-row gap-x-2">
                      <Heart color="#fff" size={14} />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default MasonryScreen;

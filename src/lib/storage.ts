import * as SecureStore from "expo-secure-store";

export const tokenStorage = {
  // Save Token (Secure)
  setToken: async (token: string) => {
    try {
      await SecureStore.setItemAsync("auth_token", token);
    } catch (e) {
      console.error("SecureStore Save Error:", e);
    }
  },

  // Get Token (Secure)
  getToken: async () => {
    try {
      return await SecureStore.getItemAsync("auth_token");
    } catch (e) {
      return null;
    }
  },

  // Clear Token (Logout)
  clearToken: async () => {
    await SecureStore.deleteItemAsync("auth_token");
  },
};

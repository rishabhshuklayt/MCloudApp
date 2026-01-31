// import { BASE_URL } from "@/constants/API";
// import { tokenStorage } from "@/src/lib/storage";
// import React, { createContext, useContext, useEffect, useState } from "react";

// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// const AuthContext = createContext<{
//   isLoggedIn: boolean | null;
//   user: User | null;
//   login: (token: string,userData: User) => Promise<void>;
//   logout: () => Promise<void>;
// }>(null!);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const initAuth = async () => {
//       const token = await tokenStorage.getToken();
//       if (token) {
//         // INDUSTRY TIP:
//         // Usually, you'd call your API here: const data = await api.get('/me')
//         // to get the latest user details using the token.
//         const res = await fetch(`${BASE_URL}/auth/Userdata`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Industry standard: send the token!
//           },
//         });
//         if (!res.ok) {
//           console.log("respone faild");
//         }
//         const payload = await res.json();
//         console.log("payloaddata", payload);
//         setIsLoggedIn(true);
//       } else {
//         setIsLoggedIn(false);
//       }
//     };
//     initAuth();
//   }, []);

//   const login = async (token: string) => {
//     await tokenStorage.setToken(token);

//     setIsLoggedIn(true);
//   };

//   const logout = async () => {
//     await tokenStorage.clearToken();
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

import { BASE_URL } from "@/constants/API";
import { tokenStorage } from "@/src/lib/storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

const AuthContext = createContext<{
  isLoggedIn: boolean | null;
  user: User | null;
  login: (token: string, userData: User) => Promise<void>;
  updateUser: (data: Partial<User>) => void;
  logout: () => Promise<void>;
}>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = await tokenStorage.getToken();

      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        // We have a token, now fetch the "Fresh" user data from the API
        const res = await fetch(`${BASE_URL}/auth/Userdata`, {
          method: "GET", // Changed to GET as it's standard for fetching data
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const userData = await res.json();
          setUser(userData); // Keep user data in memory only
          setIsLoggedIn(true);
        } else {
          // Token might be expired or invalid
          await logout();
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        setIsLoggedIn(false);
      }
    };

    initAuth();
  }, []);

  const login = async (token: string, userData: User) => {
    // 1. Save token so user stays logged in after restart
    await tokenStorage.setToken(token);

    // 2. Keep user details in memory (state)
    setUser(userData);
    setIsLoggedIn(true);
  };

  const updateUser = (data: Partial<User>) => {
    // Merges new data with existing user data in memory
    setUser((prev) => (prev ? { ...prev, ...data } : prev));
  };

  const logout = async () => {
    // Clear the token from disk and user from memory
    await tokenStorage.clearToken();
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, updateUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

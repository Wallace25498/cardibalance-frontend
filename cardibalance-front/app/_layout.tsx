import { Stack } from "expo-router";
import { AuthProvider } from "./AuthContext";

export default function RootLayout() {
  return (<AuthProvider>
    <Stack />
  </AuthProvider>
  );
}

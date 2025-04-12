import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import "./globals.css";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}

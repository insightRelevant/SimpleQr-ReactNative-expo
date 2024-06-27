import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="generate-qr" />
      <Stack.Screen name="guest-list" />
      <Stack.Screen name="scan-qr" />
    </Stack>
  );
}

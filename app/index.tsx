import { View } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
  return (
    <View>
      <Link href="generate-qr">GENERAR QR</Link>
      <Link href="guest-list">LISTA</Link>
      <Link href="scan-qr">ESCANEAR QR</Link>
    </View>
  );
}
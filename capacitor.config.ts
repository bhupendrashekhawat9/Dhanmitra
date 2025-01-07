import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Dhanmitra',
  webDir: 'dist',
  plugins:{
    LocalNotifications:{
      iconColor: "#488AFF",
      sound: "beep.wav"
    }
  }
};

export default config;

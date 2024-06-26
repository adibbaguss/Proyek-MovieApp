import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";

import { NavigationContainer } from "@react-navigation/native";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import TabNav from "./navs/TabNav";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [fontLoaded, fontError] = useFonts({
    Inter: Inter_400Regular,
    InterSemi: Inter_600SemiBold,
    InterBlack: Inter_900Black,
    InterBold: Inter_700Bold,
  });
  useEffect(() => {
    if (fontLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, fontError]);
  if (!fontLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer independent={true}>
      <TabNav />
    </NavigationContainer>
  );
}

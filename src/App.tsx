import React from "react";
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from "styled-components";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./global/styles/theme";

import { Dashboard } from "./screens/Dashbord";

export default function App() {
  const [fontLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if(!fontLoaded) {
    return <AppLoading/>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

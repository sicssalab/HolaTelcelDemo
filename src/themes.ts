import { DefaultTheme as DefaultThemeProps } from "styled-components";

export enum Font {
  GilroyLight = "Gilroy-Light",
  GilroyMedium = "Gilroy-Medium",
  GilroyBold = "Gilroy-Bold",
  GilroySemiBold = "Gilroy-SemiBold",
  GilroyExtraBold = "Gilroy-ExtraBold",
  GilroyRegular = "Gilroy-Regular",
}

export const DefaultConfigs = {
  typography: {
    fontFamily: {
      light: Font.GilroyLight,
      medium: Font.GilroyMedium,
      regular: Font.GilroyRegular,
      semiBold: Font.GilroySemiBold,
      bold: Font.GilroyBold,
      extraBold: Font.GilroyExtraBold,
    },
    sizes: {
      h1: {
        size: 38,
        lineHeight: 44,
      },
      h2: {
        size: 32,
        lineHeight: 36,
      },
      h3: {
        size: 24,
        lineHeight: 30,
      },
      xxl: {
        size: 20,
        lineHeight: 26,
      },
      large: {
        size: 18,
        lineHeight: 26,
      },
      regular: {
        size: 16,
        lineHeight: 18,
      },
      small: {
        size: 14,
        lineHeight: 20,
      },
    },
  },
};

export const DarkTheme: DefaultThemeProps = {
  ...DefaultConfigs,
  dark: true,
  colors: {
    primary: "#f5df4d",
    text: "#f2f2f2",
    black: "#000",
    grey: "#bbb",
    background: "#111001",
    secondaryBackground: "#22252e",
    whiteBackground: "#f2f2f2",
    headerBackground: "#242526",
    topHeaderBackground: "#242526",
    inputBackground: "#2222222",
    border: "#3E4042",
  },
};

export const LightTheme: DefaultThemeProps = {
  ...DefaultConfigs,
  dark: false,
  colors: {
    primary: "#f5df4d",
    black: "#000",
    text: "#f2f2f2",
    grey: "#bbb",
    background: "#111001", // #18191A
    secondaryBackground: "#22252e",
    whiteBackground: "#f2f2f2",
    headerBackground: "#242526",
    topHeaderBackground: "#000",
    inputBackground: "#2222222",
    border: "#3E4042",
  },
};

export const DefaultTheme = LightTheme;

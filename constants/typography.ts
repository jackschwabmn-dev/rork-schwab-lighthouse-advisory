import { Platform } from "react-native";

export default {
  fontFamily: {
    regular: Platform.OS === "ios" ? "System" : "Roboto",
    medium: Platform.OS === "ios" ? "System" : "Roboto",
    bold: Platform.OS === "ios" ? "System" : "Roboto",
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 40,
    display: 48,
  },
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
};
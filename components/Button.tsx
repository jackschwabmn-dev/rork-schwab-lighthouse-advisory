import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import Spacing from "@/constants/spacing";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style,
  textStyle,
  testID,
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case "primary":
        return styles.primaryButton;
      case "secondary":
        return styles.secondaryButton;
      case "outline":
        return styles.outlineButton;
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "primary":
        return styles.primaryText;
      case "secondary":
        return styles.secondaryText;
      case "outline":
        return styles.outlineText;
      default:
        return styles.primaryText;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case "small":
        return styles.smallButton;
      case "medium":
        return styles.mediumButton;
      case "large":
        return styles.largeButton;
      default:
        return styles.mediumButton;
    }
  };

  const getTextSizeStyle = () => {
    switch (size) {
      case "small":
        return styles.smallText;
      case "medium":
        return styles.mediumText;
      case "large":
        return styles.largeText;
      default:
        return styles.mediumText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        getSizeStyle(),
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? Colors.primary.main : Colors.neutral.white}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.text,
            getTextStyle(),
            getTextSizeStyle(),
            disabled && styles.disabledText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: Colors.primary.main,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary.main,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.primary.main,
  },
  smallButton: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
  },
  mediumButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  largeButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },
  text: {
    fontFamily: Typography.fontFamily.medium,
    textAlign: "center",
  },
  primaryText: {
    color: Colors.neutral.white,
  },
  secondaryText: {
    color: Colors.neutral.black,
  },
  outlineText: {
    color: Colors.primary.main,
  },
  smallText: {
    fontSize: Typography.fontSize.sm,
  },
  mediumText: {
    fontSize: Typography.fontSize.md,
  },
  largeText: {
    fontSize: Typography.fontSize.lg,
  },
  disabledButton: {
    backgroundColor: Colors.neutral.mediumGray,
    borderColor: Colors.neutral.mediumGray,
  },
  disabledText: {
    color: Colors.neutral.darkGray,
  },
});

export default Button;
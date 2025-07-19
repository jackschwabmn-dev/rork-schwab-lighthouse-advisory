import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import Spacing from "@/constants/spacing";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  style?: ViewStyle;
  testID?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = "left",
  style,
  testID,
}) => {
  return (
    <View
      style={[
        styles.container,
        { alignItems: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start" },
        style,
      ]}
      testID={testID}
    >
      <Text
        style={[
          styles.title,
          { textAlign: align },
        ]}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          style={[
            styles.subtitle,
            { textAlign: align },
          ]}
        >
          {subtitle}
        </Text>
      )}
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    marginBottom: Spacing.md,
    lineHeight: Typography.lineHeight.md,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: Colors.secondary.main,
    marginTop: Spacing.xs,
  },
});

export default SectionTitle;
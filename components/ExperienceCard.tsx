import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import Spacing from "@/constants/spacing";
import Card from "./Card";
import { Experience } from "@/types";

interface ExperienceCardProps {
  experience: Experience;
  testID?: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, testID }) => {
  return (
    <Card style={styles.card} testID={testID}>
      <Text style={styles.company}>{experience.company}</Text>
      <View style={styles.roleContainer}>
        <Text style={styles.role}>{experience.role}</Text>
        <Text style={styles.period}>{experience.period}</Text>
      </View>
      <Text style={styles.description}>{experience.description}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
  },
  company: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary.main,
    marginBottom: Spacing.xs,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
    flexWrap: "wrap",
  },
  role: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
    flex: 1,
  },
  period: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
  },
  description: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.md,
  },
});

export default ExperienceCard;
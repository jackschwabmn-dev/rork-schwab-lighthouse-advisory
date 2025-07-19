import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CheckCircle, Eye, Lightbulb, Shield, TrendingDown, Zap } from "lucide-react-native";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import Spacing from "@/constants/spacing";
import Card from "./Card";
import { Benefit } from "@/types";

interface BenefitCardProps {
  benefit: Benefit;
  testID?: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ benefit, testID }) => {
  const renderIcon = () => {
    const iconProps = {
      color: Colors.secondary.main,
      size: 24,
      strokeWidth: 2,
    };

    switch (benefit.icon) {
      case "check-circle":
        return <CheckCircle {...iconProps} />;
      case "zap":
        return <Zap {...iconProps} />;
      case "shield":
        return <Shield {...iconProps} />;
      case "trending-down":
        return <TrendingDown {...iconProps} />;
      case "lightbulb":
        return <Lightbulb {...iconProps} />;
      case "eye":
        return <Eye {...iconProps} />;
      default:
        return <CheckCircle {...iconProps} />;
    }
  };

  return (
    <Card style={styles.card} testID={testID}>
      <View style={styles.iconContainer}>{renderIcon()}</View>
      <Text style={styles.title}>{benefit.title}</Text>
      <Text style={styles.description}>{benefit.description}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
    minHeight: 160,
  },
  iconContainer: {
    marginBottom: Spacing.sm,
  },
  title: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  description: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.md,
  },
});

export default BenefitCard;
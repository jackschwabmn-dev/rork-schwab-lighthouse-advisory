import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Brain, CheckSquare, Cpu, Database, RefreshCw, Shield } from "lucide-react-native";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import Spacing from "@/constants/spacing";
import Card from "./Card";
import { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  testID?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, testID }) => {
  const renderIcon = () => {
    const iconProps = {
      color: Colors.primary.main,
      size: 24,
      strokeWidth: 2,
    };

    switch (service.icon) {
      case "database":
        return <Database {...iconProps} />;
      case "cpu":
        return <Cpu {...iconProps} />;
      case "shield":
        return <Shield {...iconProps} />;
      case "refresh-cw":
        return <RefreshCw {...iconProps} />;
      case "brain":
        return <Brain {...iconProps} />;
      case "check-square":
        return <CheckSquare {...iconProps} />;
      default:
        return <Database {...iconProps} />;
    }
  };

  return (
    <Card style={styles.card} testID={testID}>
      <View style={styles.iconContainer}>{renderIcon()}</View>
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.description}>{service.description}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
    minHeight: 180,
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

export default ServiceCard;
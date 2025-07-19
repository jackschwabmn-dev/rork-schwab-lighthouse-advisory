import React, { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Colors from "@/constants/colors";
import Spacing from "@/constants/spacing";

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  elevation?: number;
  testID?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  elevation = 2,
  testID,
}) => {
  return (
    <View
      style={[
        styles.card,
        { elevation },
        style,
      ]}
      testID={testID}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    padding: Spacing.md,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default Card;
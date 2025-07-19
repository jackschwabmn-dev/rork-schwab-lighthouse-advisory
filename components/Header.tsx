import React from "react";
import { StyleSheet, View, Image } from "react-native";
import Colors from "@/constants/colors";
import Spacing from "@/constants/spacing";

interface HeaderProps {
  testID?: string;
}

const Header: React.FC<HeaderProps> = ({ testID }) => {
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: "https://r2-pub.rork.com/attachments/5tjeuyqb8pbedi51jsryi" }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.primary.main,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 200,
    height: 120,
  },
});

export default Header;
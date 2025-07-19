import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from "react-native";
import { Mail, MapPin, Phone, Linkedin } from "lucide-react-native";
import * as WebBrowser from "expo-web-browser";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import Spacing from "@/constants/spacing";
import Header from "@/components/Header";
import SectionTitle from "@/components/SectionTitle";
import ContactForm from "@/components/ContactForm";

export default function ContactScreen() {
  const handleLinkedInPress = async () => {
    const linkedInUrl = "https://www.linkedin.com/in/gregoryschwab/";
    
    try {
      await WebBrowser.openBrowserAsync(linkedInUrl);
    } catch (error) {
      // Fallback to Linking if WebBrowser fails
      await Linking.openURL(linkedInUrl);
    }
  };

  return (
    <View style={styles.container}>
      <Header testID="contact-header" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        testID="contact-scroll-view"
      >
        {/* Contact Introduction */}
        <View style={styles.introSection}>
          <SectionTitle
            title="Contact Us"
            subtitle="Reach out to discuss how we can help your organization"
            testID="contact-intro-title"
          />
          <Text style={styles.introText}>
            We're here to answer your questions and discuss how Schwab Lighthouse Advisory can help your organization improve data management, automation, governance, and resilience.
          </Text>
        </View>

        {/* Contact Information */}
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Mail color={Colors.primary.main} size={24} style={styles.infoIcon} />
            <View>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>info@schwablighthouse.com</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Phone color={Colors.primary.main} size={24} style={styles.infoIcon} />
            <View>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>(612) 817-3969</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <MapPin color={Colors.primary.main} size={24} style={styles.infoIcon} />
            <View>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>Minneapolis, MN</Text>
              <Text style={styles.infoSubvalue}>Serving clients globally</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.linkedInItem}
            onPress={handleLinkedInPress}
            testID="contact-linkedin-button"
          >
            <Linkedin color="#0077B5" size={24} style={styles.infoIcon} />
            <View>
              <Text style={styles.infoLabel}>LinkedIn</Text>
              <Text style={styles.linkedInValue}>Connect with Gregory Schwab</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Contact Form */}
        <View style={styles.formSection}>
          <ContactForm testID="contact-form" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  introSection: {
    padding: Spacing.lg,
  },
  introText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.md,
  },
  infoSection: {
    padding: Spacing.lg,
    backgroundColor: Colors.background.secondary,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: Spacing.lg,
  },
  linkedInItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: Spacing.lg,
    backgroundColor: Colors.neutral.white,
    padding: Spacing.md,
    borderRadius: 8,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  infoIcon: {
    marginRight: Spacing.md,
  },
  infoLabel: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  infoValue: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
  },
  linkedInValue: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: "#0077B5",
    textDecorationLine: "underline",
  },
  infoSubvalue: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    marginTop: Spacing.xs,
  },
  formSection: {
    flex: 1,
  },
});
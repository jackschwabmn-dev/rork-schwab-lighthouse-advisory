import React from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Linking } from "react-native";
import { Linkedin } from "lucide-react-native";
import * as WebBrowser from "expo-web-browser";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import Spacing from "@/constants/spacing";
import Header from "@/components/Header";
import SectionTitle from "@/components/SectionTitle";
import ExperienceCard from "@/components/ExperienceCard";
import experience from "@/data/experience";

export default function AboutScreen() {
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
      <Header testID="about-header" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        testID="about-scroll-view"
      >
        {/* Founder Section - Option 1: Balanced and Professional */}
        <View style={styles.section}>
          <SectionTitle
            title="About the Founder"
            subtitle="Trusted guidance at the intersection of data strategy, governance, and operational excellence"
            testID="about-founder-title"
          />
          
          <View style={styles.founderSection}>
            <Image
              source={{ uri: "https://r2-pub.rork.com/attachments/cr8n2t81y314qsjd53657" }}
              style={styles.founderImage}
              testID="about-founder-image"
            />
            <View style={styles.founderContent}>
              <Text style={styles.founderName}>Gregory Schwab</Text>
              <Text style={styles.founderTitle}>Founder & Principal Consultant</Text>
              
              {/* LinkedIn Link */}
              <TouchableOpacity 
                style={styles.linkedInButton}
                onPress={handleLinkedInPress}
                testID="about-linkedin-button"
              >
                <Linkedin color={Colors.neutral.white} size={20} />
                <Text style={styles.linkedInText}>Connect on LinkedIn</Text>
              </TouchableOpacity>
              
              <Text style={styles.founderDescription}>
                Schwab Lighthouse Advisory delivers trusted guidance at the intersection of data strategy, governance, and operational excellence.
              </Text>
              <Text style={styles.founderDescription}>
                Rooted in real-world executive experience, we help organizations design resilient, scalable frameworks for data governance, quality, lineage, and risk. Our leadership-level advisory is built on decades of hands-on accountability—managing operations, budgets, and cross-functional teams across complex, regulated environments.
              </Text>
              <Text style={styles.founderDescription}>
                We specialize in building the foundational elements that enable responsible AI adoption—not model development, but the governance, quality, and integration required to make AI successful.
              </Text>
              <Text style={styles.founderDescription}>
                Grounded in values of integrity, transparency, and resilience, Schwab Lighthouse Advisory equips organizations to move forward with clarity, confidence, and purpose.
              </Text>
            </View>
          </View>
        </View>

        {/* Experience Section */}
        <View style={[styles.section, styles.experienceSection]}>
          <SectionTitle
            title="Professional Experience"
            subtitle="A track record of success in senior leadership roles"
            testID="about-experience-title"
          />
          
          <View style={styles.experienceList}>
            {experience.map((exp) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                testID={`about-experience-card-${exp.id}`}
              />
            ))}
          </View>
        </View>

        {/* Approach Section */}
        <View style={styles.section}>
          <SectionTitle
            title="Our Approach"
            subtitle="From financial services to infrastructure modernization, we deliver actionable solutions"
            testID="about-approach-title"
          />
          
          <View style={styles.approachContent}>
            <Text style={styles.approachText}>
              Our methodology aligns vision with execution—and strategy with stewardship. We believe that successful data and technology transformations require a holistic approach built on these key principles:
            </Text>
            
            <View style={styles.principleContainer}>
              <Text style={styles.principleName}>Strategic Alignment</Text>
              <Text style={styles.principleDescription}>
                We ensure that all data and technology initiatives are directly aligned with your organization's strategic objectives and deliver measurable business value.
              </Text>
            </View>
            
            <View style={styles.principleContainer}>
              <Text style={styles.principleName}>Practical Implementation</Text>
              <Text style={styles.principleDescription}>
                Our recommendations are pragmatic and actionable, designed to be implemented efficiently within your organization's constraints and capabilities.
              </Text>
            </View>
            
            <View style={styles.principleContainer}>
              <Text style={styles.principleName}>Knowledge Transfer</Text>
              <Text style={styles.principleDescription}>
                We work closely with your team to transfer knowledge and build internal capabilities, ensuring sustainable success beyond our engagement.
              </Text>
            </View>
            
            <View style={styles.principleContainer}>
              <Text style={styles.principleName}>Continuous Improvement</Text>
              <Text style={styles.principleDescription}>
                We establish metrics and feedback mechanisms to measure progress and drive ongoing optimization of your data and technology capabilities.
              </Text>
            </View>
          </View>
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
  section: {
    padding: Spacing.lg,
  },
  founderSection: {
    alignItems: "center",
  },
  founderImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: Spacing.lg,
  },
  founderContent: {
    alignItems: "center",
  },
  founderName: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  founderTitle: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.primary.main,
    marginBottom: Spacing.md,
  },
  linkedInButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0077B5",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    marginBottom: Spacing.lg,
  },
  linkedInText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.neutral.white,
    marginLeft: Spacing.xs,
  },
  founderDescription: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    textAlign: "center",
    marginBottom: Spacing.md,
    lineHeight: Typography.lineHeight.md,
  },
  experienceSection: {
    backgroundColor: Colors.background.secondary,
  },
  experienceList: {
    marginTop: Spacing.md,
  },
  approachContent: {
    marginTop: Spacing.md,
  },
  approachText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    marginBottom: Spacing.lg,
    lineHeight: Typography.lineHeight.md,
  },
  principleContainer: {
    marginBottom: Spacing.lg,
  },
  principleName: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  principleDescription: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.md,
  },
});
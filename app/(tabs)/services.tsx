import React from "react";
import { StyleSheet, Text, View, ScrollView, useWindowDimensions } from "react-native";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import Spacing from "@/constants/spacing";
import Header from "@/components/Header";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import BenefitCard from "@/components/BenefitCard";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import services from "@/data/services";
import benefits from "@/data/benefits";

export default function ServicesScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 400;

  const navigateToContact = () => {
    router.push("/contact");
  };

  return (
    <View style={styles.container}>
      <Header testID="services-header" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        testID="services-scroll-view"
      >
        {/* Executive Summary Section */}
        <View style={styles.executiveSummarySection}>
          <SectionTitle
            title="Executive Summary"
            testID="services-executive-summary-title"
          />
          <Text style={styles.executiveSummaryText}>
            Schwab Lighthouse Advisory provides trusted, executive-level guidance at the intersection of data strategy, governance, and operational excellence.
          </Text>
          <Text style={styles.executiveSummaryText}>
            Built on decades of real-world experience, the firm delivers resilient, scalable frameworks for data governance, quality, lineage, and risk management. Advisory services are informed by hands-on operational leadership—spanning enterprise programs, regulatory alignment, and global team oversight across complex, regulated environments.
          </Text>
          <Text style={styles.executiveSummaryText}>
            Specialization lies in the foundational elements that enable responsible AI adoption—not model development, but the governance, quality, and integration capabilities required to support ethical, scalable innovation.
          </Text>
          <Text style={styles.executiveSummaryHighlight}>
            What sets Schwab Lighthouse Advisory apart? Leadership that's been in the seat. Strategy grounded in reality. And an unwavering commitment to operational excellence and character-driven leadership.
          </Text>
        </View>

        {/* Services Introduction */}
        <View style={styles.introSection}>
          <SectionTitle
            title="Our Services"
            subtitle="Executive-level guidance to help organizations build trusted, scalable, and AI-ready data ecosystems"
            testID="services-intro-title"
          />
          <Text style={styles.introText}>
            We bring proven leadership in governance, quality, lineage, and risk controls with hands-on operational experience managing budgets, teams, and transformation programs across complex, regulated environments.
          </Text>
          <Text style={styles.introHighlight}>
            We don't build AI models. We build the foundation that makes responsible AI possible—data quality, lineage, integration, and oversight.
          </Text>
        </View>

        {/* Services List */}
        <View style={styles.section}>
          <View style={styles.servicesGrid}>
            {services.map((service) => (
              <View
                key={service.id}
                style={[
                  styles.serviceCardContainer,
                  { width: isSmallScreen ? "100%" : "48%" },
                ]}
              >
                <ServiceCard service={service} testID={`services-card-${service.id}`} />
              </View>
            ))}
          </View>
        </View>

        {/* Client Benefits */}
        <View style={[styles.section, styles.benefitsSection]}>
          <SectionTitle
            title="Client Benefits"
            subtitle="Actionable solutions that align vision with execution—and strategy with stewardship"
            testID="services-benefits-title"
          />
          <View style={styles.benefitsGrid}>
            {benefits.map((benefit) => (
              <View
                key={benefit.id}
                style={[
                  styles.benefitCardContainer,
                  { width: isSmallScreen ? "100%" : "48%" },
                ]}
              >
                <BenefitCard benefit={benefit} testID={`services-benefit-card-${benefit.id}`} />
              </View>
            ))}
          </View>
        </View>

        {/* Engagement Models */}
        <View style={styles.section}>
          <SectionTitle
            title="Engagement Models"
            subtitle="Flexible options to meet your specific needs"
            testID="services-engagement-title"
          />
          
          <View style={styles.engagementContainer}>
            <Text style={styles.engagementTitle}>Strategic Advisory</Text>
            <Text style={styles.engagementDescription}>
              Executive-level guidance on data strategy, governance frameworks, and technology roadmaps. Ideal for organizations looking to establish a vision and strategic direction.
            </Text>
          </View>
          
          <View style={styles.engagementContainer}>
            <Text style={styles.engagementTitle}>Implementation Support</Text>
            <Text style={styles.engagementDescription}>
              Hands-on assistance with implementing data governance programs, automation initiatives, and resilience frameworks. Includes process design, tool selection, and change management.
            </Text>
          </View>
          
          <View style={styles.engagementContainer}>
            <Text style={styles.engagementTitle}>Assessment & Roadmap</Text>
            <Text style={styles.engagementDescription}>
              Comprehensive evaluation of your current data and technology capabilities with a detailed roadmap for improvement. Includes gap analysis, prioritization, and implementation planning.
            </Text>
          </View>
          
          <View style={styles.engagementContainer}>
            <Text style={styles.engagementTitle}>Interim Leadership</Text>
            <Text style={styles.engagementDescription}>
              Experienced executive support for organizations in transition or undertaking major transformation initiatives. Provides leadership continuity and specialized expertise.
            </Text>
          </View>
        </View>

        {/* Call to Action */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Build Your Foundation?</Text>
          <Text style={styles.ctaSubtitle}>
            Contact us to discuss how we can help you create the foundational conditions for responsible AI adoption and sustainable data success.
          </Text>
          <Button
            title="Contact Us"
            onPress={navigateToContact}
            size="large"
            style={styles.ctaButton}
            testID="services-cta-button"
          />
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
  executiveSummarySection: {
    padding: Spacing.lg,
    backgroundColor: Colors.background.secondary,
  },
  executiveSummaryText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.md,
    marginBottom: Spacing.md,
  },
  executiveSummaryHighlight: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.primary.main,
    lineHeight: Typography.lineHeight.md,
    fontStyle: "italic",
  },
  introSection: {
    padding: Spacing.lg,
  },
  introText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.md,
    marginBottom: Spacing.md,
  },
  introHighlight: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.primary.main,
    lineHeight: Typography.lineHeight.md,
    fontStyle: "italic",
  },
  section: {
    padding: Spacing.lg,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceCardContainer: {
    marginBottom: Spacing.md,
  },
  benefitsSection: {
    backgroundColor: Colors.background.secondary,
  },
  benefitsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  benefitCardContainer: {
    marginBottom: Spacing.md,
  },
  engagementContainer: {
    marginBottom: Spacing.lg,
  },
  engagementTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  engagementDescription: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.md,
  },
  ctaSection: {
    backgroundColor: Colors.primary.main,
    padding: Spacing.xl,
    alignItems: "center",
  },
  ctaTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.neutral.white,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  ctaSubtitle: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.neutral.lightGray,
    textAlign: "center",
    marginBottom: Spacing.xl,
    lineHeight: Typography.lineHeight.md,
  },
  ctaButton: {
    minWidth: 200,
  },
});
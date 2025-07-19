import React from "react";
import { StyleSheet, Text, View, ScrollView, Image, useWindowDimensions } from "react-native";
import { Ligature } from "lucide-react-native";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import Spacing from "@/constants/spacing";
import Button from "@/components/Button";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import BenefitCard from "@/components/BenefitCard";
import Header from "@/components/Header";
import { useRouter } from "expo-router";
import services from "@/data/services";
import benefits from "@/data/benefits";

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 400;

  const navigateToServices = () => {
    router.push("/services");
  };

  const navigateToContact = () => {
    router.push("/contact");
  };

  return (
    <View style={styles.container}>
      <Header testID="home-header" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        testID="home-scroll-view"
      >
        {/* Hero Section - Option 3: Mission-Driven */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Ligature color={Colors.secondary.main} size={48} style={styles.heroIcon} />
            <Text style={styles.heroTitle}>
              Building Trust in Your Data, Confidence in Your Direction
            </Text>
            <Text style={styles.heroSubtitle}>
              At Schwab Lighthouse Advisory, we help organizations build what matters most: trust in their data, confidence in their direction, and alignment between their values and their technology.
            </Text>
            <Text style={styles.heroDescription}>
              Led by a seasoned executive with real operational experience—not just theory—we specialize in resilient data governance, practical transformation strategy, and AI-ready enablement frameworks.
            </Text>
            <View style={styles.heroButtons}>
              <Button
                title="Our Services"
                onPress={navigateToServices}
                style={styles.heroButton}
                testID="home-services-button"
              />
              <Button
                title="Contact Us"
                onPress={navigateToContact}
                variant="outline"
                style={styles.heroButton}
                testID="home-contact-button"
              />
            </View>
          </View>
        </View>

        {/* Services Preview Section */}
        <View style={styles.section}>
          <SectionTitle
            title="Our Services"
            subtitle="Executive-level guidance to build trusted, scalable, and AI-ready data ecosystems"
            testID="home-services-title"
          />
          <View style={styles.servicesGrid}>
            {services.slice(0, 3).map((service) => (
              <View
                key={service.id}
                style={[
                  styles.serviceCardContainer,
                  { width: isSmallScreen ? "100%" : "48%" },
                ]}
              >
                <ServiceCard service={service} testID={`home-service-card-${service.id}`} />
              </View>
            ))}
          </View>
          <Button
            title="View All Services"
            onPress={navigateToServices}
            variant="secondary"
            style={styles.viewAllButton}
            testID="home-view-all-services-button"
          />
        </View>

        {/* What Sets Us Apart Section */}
        <View style={[styles.section, styles.distinctionSection]}>
          <SectionTitle
            title="What Sets Us Apart"
            subtitle="Leadership that's been in the seat. Strategy grounded in reality."
            align="center"
            testID="home-distinction-title"
          />
          <View style={styles.distinctionGrid}>
            <View style={styles.distinctionItem}>
              <Text style={styles.distinctionTitle}>Rooted Real Experience</Text>
              <Text style={styles.distinctionDescription}>
                Proven leadership in governance, quality, lineage, and risk controls with hands-on accountability
              </Text>
            </View>
            <View style={styles.distinctionItem}>
              <Text style={styles.distinctionTitle}>Practical Execution</Text>
              <Text style={styles.distinctionDescription}>
                Hands-on operational leadership with budgets, teams, and transformation programs
              </Text>
            </View>
            <View style={styles.distinctionItem}>
              <Text style={styles.distinctionTitle}>AI Enablement</Text>
              <Text style={styles.distinctionDescription}>
                Deep experience creating the foundational conditions for responsible AI adoption
              </Text>
            </View>
            <View style={styles.distinctionItem}>
              <Text style={styles.distinctionTitle}>Values-Led Strategy</Text>
              <Text style={styles.distinctionDescription}>
                Ethical, transparent, and resilient frameworks aligned with long-term business integrity
              </Text>
            </View>
          </View>
        </View>

        {/* Benefits Section */}
        <View style={[styles.section, styles.benefitsSection]}>
          <SectionTitle
            title="Client Benefits"
            subtitle="How our clients benefit from our expertise"
            align="center"
            testID="home-benefits-title"
          />
          <View style={styles.benefitsGrid}>
            {benefits.slice(0, 4).map((benefit) => (
              <View
                key={benefit.id}
                style={[
                  styles.benefitCardContainer,
                  { width: isSmallScreen ? "100%" : "48%" },
                ]}
              >
                <BenefitCard benefit={benefit} testID={`home-benefit-card-${benefit.id}`} />
              </View>
            ))}
          </View>
        </View>

        {/* Call to Action Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Build What Matters Most?</Text>
          <Text style={styles.ctaSubtitle}>
            Let's discuss how we can help you build trust in your data, confidence in your direction, and alignment between your values and technology.
          </Text>
          <Button
            title="Get in Touch"
            onPress={navigateToContact}
            size="large"
            style={styles.ctaButton}
            testID="home-cta-button"
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
  heroSection: {
    backgroundColor: Colors.primary.main,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  heroContent: {
    alignItems: "center",
    paddingTop: Spacing.lg,
  },
  heroIcon: {
    marginBottom: Spacing.md,
  },
  heroTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xxxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.neutral.white,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  heroSubtitle: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.lg,
    color: Colors.neutral.lightGray,
    textAlign: "center",
    marginBottom: Spacing.md,
    lineHeight: Typography.lineHeight.lg,
  },
  heroDescription: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.neutral.lightGray,
    textAlign: "center",
    marginBottom: Spacing.xl,
    lineHeight: Typography.lineHeight.md,
  },
  heroButtons: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  heroButton: {
    margin: Spacing.xs,
    minWidth: 140,
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
  viewAllButton: {
    alignSelf: "center",
    marginTop: Spacing.md,
  },
  distinctionSection: {
    backgroundColor: Colors.background.secondary,
  },
  distinctionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  distinctionItem: {
    width: "48%",
    marginBottom: Spacing.lg,
    backgroundColor: Colors.neutral.white,
    padding: Spacing.md,
    borderRadius: 12,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  distinctionTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary.main,
    marginBottom: Spacing.xs,
  },
  distinctionDescription: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.md,
  },
  benefitsSection: {
    backgroundColor: Colors.background.primary,
  },
  benefitsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  benefitCardContainer: {
    marginBottom: Spacing.md,
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
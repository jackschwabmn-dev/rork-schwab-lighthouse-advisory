import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import { Send, Mail, Phone } from "lucide-react-native";
import emailjs from "@emailjs/browser";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import Spacing from "@/constants/spacing";
import Button from "./Button";
import { ContactFormData } from "@/types";

interface ContactFormProps {
  testID?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ testID }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitAttempts, setSubmitAttempts] = useState<number>(0);

  // Initialize EmailJS with public key
  React.useEffect(() => {
    try {
      emailjs.init({
        publicKey: "e1ElFhFD-JBL0yPMY",
      });
    } catch (error) {
      console.log("EmailJS initialization failed:", error);
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDirectContact = () => {
    Alert.alert(
      "Contact Options",
      "Choose how you'd like to reach us:",
      [
        {
          text: "Email",
          onPress: () => Linking.openURL("mailto:info@schwablighthouse.com?subject=Inquiry&body=" + encodeURIComponent(`Name: ${formData.name}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`))
        },
        {
          text: "Phone",
          onPress: () => Linking.openURL("tel:+16128173969")
        },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setSubmitAttempts(prev => prev + 1);

    try {
      // Prepare template parameters matching your EmailJS template
      const templateParams = {
        name: formData.name,
        time: new Date().toLocaleString(),
        message: `From: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || 'Not provided'}

Message:
${formData.message}`,
      };

      console.log("Sending email with params:", templateParams);

      const result = await emailjs.send(
        "service_htqvgwc",
        "template_mj8skw6",
        templateParams,
        {
          publicKey: "e1ElFhFD-JBL0yPMY",
        }
      );

      console.log("EmailJS result:", result);

      if (result.status === 200) {
        Alert.alert(
          "Message Sent",
          "Thank you for your message. We'll get back to you shortly!",
          [{ text: "OK", onPress: () => resetForm() }]
        );
      } else {
        throw new Error(`EmailJS returned status: ${result.status}`);
      }
    } catch (error: any) {
      console.error("EmailJS error:", error);
      
      // Handle specific EmailJS errors
      let errorMessage = "There was an issue sending your message.";
      
      if (error?.text?.includes("usage") || error?.text?.includes("charged")) {
        errorMessage = "Our contact form is temporarily unavailable due to service limits.";
      } else if (error?.text?.includes("API calls are disabled")) {
        errorMessage = "Email service is currently unavailable.";
      } else if (error?.status === 403) {
        errorMessage = "Email service access is restricted.";
      }

      Alert.alert(
        "Unable to Send Message",
        `${errorMessage}\n\nWould you like to contact us directly instead?`,
        [
          { text: "Contact Directly", onPress: handleDirectContact },
          { text: "Try Again Later", style: "cancel" }
        ]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      message: "",
    });
    setErrors({});
    setSubmitAttempts(0);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      testID={testID}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.subtitle}>
          Reach out to discuss how we can help your organization unlock the full value of your data.
        </Text>

        {/* Direct Contact Options */}
        <View style={styles.directContactSection}>
          <Text style={styles.directContactTitle}>Or contact us directly:</Text>
          <View style={styles.directContactButtons}>
            <TouchableOpacity
              style={styles.directContactButton}
              onPress={() => Linking.openURL("mailto:info@schwablighthouse.com")}
            >
              <Mail color={Colors.primary.main} size={20} />
              <Text style={styles.directContactText}>Email Us</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.directContactButton}
              onPress={() => Linking.openURL("tel:+16128173969")}
            >
              <Phone color={Colors.primary.main} size={20} />
              <Text style={styles.directContactText}>Call Us</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={[styles.input, errors.name ? styles.inputError : null]}
            placeholder="Your name"
            value={formData.name}
            onChangeText={(text) => {
              setFormData({ ...formData, name: text });
              if (errors.name) {
                setErrors({ ...errors, name: undefined });
              }
            }}
            testID="contact-name-input"
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={[styles.input, errors.email ? styles.inputError : null]}
            placeholder="Your email address"
            value={formData.email}
            onChangeText={(text) => {
              setFormData({ ...formData, email: text });
              if (errors.email) {
                setErrors({ ...errors, email: undefined });
              }
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            testID="contact-email-input"
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Company</Text>
          <TextInput
            style={styles.input}
            placeholder="Your company name"
            value={formData.company}
            onChangeText={(text) => setFormData({ ...formData, company: text })}
            testID="contact-company-input"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Message *</Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              errors.message ? styles.inputError : null,
            ]}
            placeholder="How can we help you?"
            value={formData.message}
            onChangeText={(text) => {
              setFormData({ ...formData, message: text });
              if (errors.message) {
                setErrors({ ...errors, message: undefined });
              }
            }}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            testID="contact-message-input"
          />
          {errors.message ? <Text style={styles.errorText}>{errors.message}</Text> : null}
        </View>

        <Button
          title="Send Message"
          onPress={handleSubmit}
          loading={isLoading}
          style={styles.submitButton}
          testID="contact-submit-button"
        />

        {submitAttempts > 0 && (
          <Text style={styles.helpText}>
            Having trouble? You can also email us directly at info@schwablighthouse.com or call (612) 817-3969
          </Text>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
  },
  title: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    marginBottom: Spacing.lg,
    lineHeight: Typography.lineHeight.md,
  },
  directContactSection: {
    backgroundColor: Colors.background.secondary,
    padding: Spacing.md,
    borderRadius: 8,
    marginBottom: Spacing.xl,
  },
  directContactTitle: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  directContactButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  directContactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.neutral.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary.main,
  },
  directContactText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.primary.main,
    marginLeft: Spacing.xs,
  },
  formGroup: {
    marginBottom: Spacing.md,
  },
  label: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: Colors.neutral.lightGray,
    borderRadius: 8,
    padding: Spacing.md,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.neutral.mediumGray,
  },
  inputError: {
    borderColor: Colors.error,
  },
  textArea: {
    minHeight: 120,
  },
  errorText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
  submitButton: {
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  helpText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default ContactForm;
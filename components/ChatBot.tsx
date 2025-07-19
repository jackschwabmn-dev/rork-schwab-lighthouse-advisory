import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Animated,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { MessageCircle, X, Send, Bot, User } from "lucide-react-native";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import Spacing from "@/constants/spacing";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  testID?: string;
}

const SYSTEM_PROMPT = `You are an AI assistant for Schwab Lighthouse Advisory, a data and technology consulting firm. You help potential clients understand our services and how we can solve their business challenges.

Key information about our company:
- Founded by Gregory Schwab, a seasoned data and technology executive with 30+ years of experience
- Former Global Senior Director of Data Management at RBC Wealth Management
- Services: Enterprise Data Management, Intelligent Automation, Risk Governance, Operational Resilience, AI/ML Enablement, Regulatory Compliance
- We serve financial services and tech-forward organizations
- Located in Minneapolis, MN but serve clients globally
- Contact: info@schwablighthouse.com, (612) 817-3969

Our approach focuses on:
- Strategic alignment with business objectives
- Practical, actionable recommendations
- Knowledge transfer and capability building
- Continuous improvement and optimization

Engagement models:
- Strategic Advisory
- Implementation Support
- Assessment & Roadmap
- Interim Leadership

Be helpful, professional, and focus on understanding the user's specific challenges to recommend appropriate solutions. If asked about pricing or detailed proposals, direct them to contact us directly.`;

const ChatBot: React.FC<ChatBotProps> = ({ testID }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm here to help you understand how Schwab Lighthouse Advisory can solve your data management, automation, and governance challenges. What specific issues are you facing?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (isOpen) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen, fadeAnim]);

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const conversationHistory = [...messages, userMessage]
        .slice(-10) // Keep last 10 messages for context
        .map((msg) => ({
          role: msg.isUser ? "user" : "assistant" as const,
          content: msg.text,
        }));

      const response = await fetch("https://toolkit.rork.com/text/llm/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...conversationHistory,
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.completion || "I apologize, but I'm having trouble responding right now. Please contact us directly at info@schwablighthouse.com or (612) 817-3969.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble responding right now. Please contact us directly at info@schwablighthouse.com or (612) 817-3969 for immediate assistance.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View style={styles.container} testID={testID}>
      {/* Chat Interface */}
      {isOpen && (
        <Animated.View style={[styles.chatContainer, { opacity: fadeAnim }]}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.chatContent}
          >
            {/* Header */}
            <View style={styles.chatHeader}>
              <View style={styles.headerContent}>
                <Bot color={Colors.neutral.white} size={20} />
                <Text style={styles.headerTitle}>Schwab Lighthouse Assistant</Text>
              </View>
              <TouchableOpacity onPress={toggleChat} style={styles.closeButton}>
                <X color={Colors.neutral.white} size={20} />
              </TouchableOpacity>
            </View>

            {/* Messages */}
            <ScrollView
              ref={scrollViewRef}
              style={styles.messagesContainer}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.messagesContent}
            >
              {messages.map((message) => (
                <View
                  key={message.id}
                  style={[
                    styles.messageContainer,
                    message.isUser ? styles.userMessageContainer : styles.botMessageContainer,
                  ]}
                >
                  <View style={styles.messageHeader}>
                    {message.isUser ? (
                      <User color={Colors.neutral.darkGray} size={16} />
                    ) : (
                      <Bot color={Colors.primary.main} size={16} />
                    )}
                    <Text style={styles.messageTime}>{formatTime(message.timestamp)}</Text>
                  </View>
                  <View
                    style={[
                      styles.messageBubble,
                      message.isUser ? styles.userMessage : styles.botMessage,
                    ]}
                  >
                    <Text
                      style={[
                        styles.messageText,
                        message.isUser ? styles.userMessageText : styles.botMessageText,
                      ]}
                    >
                      {message.text}
                    </Text>
                  </View>
                </View>
              ))}
              {isLoading && (
                <View style={[styles.messageContainer, styles.botMessageContainer]}>
                  <View style={styles.messageHeader}>
                    <Bot color={Colors.primary.main} size={16} />
                    <Text style={styles.messageTime}>Now</Text>
                  </View>
                  <View style={[styles.messageBubble, styles.botMessage]}>
                    <ActivityIndicator color={Colors.primary.main} size="small" />
                    <Text style={[styles.messageText, styles.botMessageText, styles.typingText]}>
                      Thinking...
                    </Text>
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Ask about our services..."
                placeholderTextColor={Colors.neutral.darkGray}
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
                editable={!isLoading}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  (!inputText.trim() || isLoading) && styles.sendButtonDisabled,
                ]}
                onPress={sendMessage}
                disabled={!inputText.trim() || isLoading}
              >
                <Send
                  color={(!inputText.trim() || isLoading) ? Colors.neutral.darkGray : Colors.neutral.white}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Animated.View>
      )}

      {/* Floating Button */}
      <TouchableOpacity
        style={[styles.floatingButton, isOpen && styles.floatingButtonOpen]}
        onPress={toggleChat}
        testID="chatbot-toggle-button"
      >
        {isOpen ? (
          <X color={Colors.neutral.white} size={24} />
        ) : (
          <MessageCircle color={Colors.neutral.white} size={24} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: Platform.OS === "web" ? 20 : 100,
    right: 20,
    zIndex: 1000,
  },
  chatContainer: {
    position: "absolute",
    bottom: 70,
    right: 0,
    width: Platform.OS === "web" ? 400 : 320,
    height: Platform.OS === "web" ? 500 : 400,
    backgroundColor: Colors.neutral.white,
    borderRadius: 16,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    backgroundColor: Colors.primary.main,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.neutral.white,
    marginLeft: Spacing.xs,
  },
  closeButton: {
    padding: Spacing.xs,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  messagesContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  messageContainer: {
    marginBottom: Spacing.md,
  },
  userMessageContainer: {
    alignItems: "flex-end",
  },
  botMessageContainer: {
    alignItems: "flex-start",
  },
  messageHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  messageTime: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.darkGray,
    marginLeft: Spacing.xs,
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 16,
  },
  userMessage: {
    backgroundColor: Colors.primary.main,
    borderBottomRightRadius: 4,
  },
  botMessage: {
    backgroundColor: Colors.neutral.white,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.neutral.mediumGray,
  },
  messageText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    lineHeight: Typography.lineHeight.md,
  },
  userMessageText: {
    color: Colors.neutral.white,
  },
  botMessageText: {
    color: Colors.text.primary,
  },
  typingText: {
    marginLeft: Spacing.xs,
  },
  inputContainer: {
    flexDirection: "row",
    padding: Spacing.md,
    backgroundColor: Colors.neutral.white,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: "flex-end",
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    borderRadius: 20,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    maxHeight: 80,
    marginRight: Spacing.sm,
  },
  sendButton: {
    backgroundColor: Colors.primary.main,
    borderRadius: 20,
    padding: Spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    backgroundColor: Colors.neutral.mediumGray,
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary.main,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  floatingButtonOpen: {
    backgroundColor: Colors.secondary.main,
  },
});

export default ChatBot;
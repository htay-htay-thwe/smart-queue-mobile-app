import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Text, IconButton, TextInput, Button } from 'react-native-paper';

type Props = {
  navigation: any;
};

const ContactUsScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    console.log('Message sent:', { name, email, message });
    // Show success message or handle submission
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@smartqueue.com');
  };

  const handlePhone = () => {
    Linking.openURL('tel:+66123456789');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          iconColor="#000"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Text style={styles.headerTitle}>Contact Us</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Contact Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get in Touch</Text>
          <Text style={styles.sectionSubtitle}>
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Text>
        </View>

        {/* Quick Contact Options */}
        <View style={styles.contactOptions}>
          <TouchableOpacity style={styles.contactCard} onPress={handleEmail}>
            <View style={styles.iconContainer}>
              <IconButton
                icon="email-outline"
                size={30}
                iconColor="#1A80A4"
                style={styles.contactIcon}
              />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>support@smartqueue.com</Text>
            </View>
            <IconButton
              icon="chevron-right"
              size={24}
              iconColor="#999"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={handlePhone}>
            <View style={styles.iconContainer}>
              <IconButton
                icon="phone-outline"
                size={30}
                iconColor="#1A80A4"
                style={styles.contactIcon}
              />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>+66 123 456 789</Text>
            </View>
            <IconButton
              icon="chevron-right"
              size={24}
              iconColor="#999"
            />
          </TouchableOpacity>

          <View style={styles.contactCard}>
            <View style={styles.iconContainer}>
              <IconButton
                icon="map-marker-outline"
                size={30}
                iconColor="#1A80A4"
                style={styles.contactIcon}
              />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Address</Text>
              <Text style={styles.contactValue}>123 Smart Queue St, Bangkok, Thailand</Text>
            </View>
          </View>
        </View>

        {/* Contact Form */}
        <View style={styles.formSection}>
          <Text style={styles.formTitle}>Send us a Message</Text>

          <TextInput
            mode="outlined"
            label="Your Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            outlineColor="#E0E0E0"
            activeOutlineColor="#1A80A4"
          />

          <TextInput
            mode="outlined"
            label="Your Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
            outlineColor="#E0E0E0"
            activeOutlineColor="#1A80A4"
          />

          <TextInput
            mode="outlined"
            label="Message"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={5}
            style={[styles.input, styles.messageInput]}
            outlineColor="#E0E0E0"
            activeOutlineColor="#1A80A4"
          />

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.submitButton}
            labelStyle={styles.submitButtonLabel}
          >
            Send Message
          </Button>
        </View>

        {/* Business Hours */}
        <View style={styles.hoursSection}>
          <Text style={styles.hoursTitle}>Business Hours</Text>
          <View style={styles.hoursRow}>
            <Text style={styles.hoursDay}>Monday - Friday</Text>
            <Text style={styles.hoursTime}>9:00 AM - 6:00 PM</Text>
          </View>
          <View style={styles.hoursRow}>
            <Text style={styles.hoursDay}>Saturday</Text>
            <Text style={styles.hoursTime}>10:00 AM - 4:00 PM</Text>
          </View>
          <View style={styles.hoursRow}>
            <Text style={styles.hoursDay}>Sunday</Text>
            <Text style={styles.hoursTime}>Closed</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    margin: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 48,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  contactOptions: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    marginRight: 5,
  },
  contactIcon: {
    margin: 0,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  formSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  messageInput: {
    height: 120,
  },
  submitButton: {
    backgroundColor: '#1A80A4',
    borderRadius: 30,
    paddingVertical: 8,
    marginTop: 10,
  },
  submitButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  hoursSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 30,
  },
  hoursTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  hoursDay: {
    fontSize: 15,
    color: '#333',
  },
  hoursTime: {
    fontSize: 15,
    color: '#666',
  },
});

export default ContactUsScreen;

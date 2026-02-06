import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, IconButton } from 'react-native-paper';

type Props = {
  navigation: any;
  route: any;
};

const EditSuccessScreen = ({ navigation, route }: Props) => {
  const { username: initialUsername, email: initialEmail, phoneNumber: initialPhoneNumber, password: initialPassword } = route.params || {};
  
  const [username, setUsername] = useState(initialUsername || '');
  const [email, setEmail] = useState(initialEmail || '');
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber || '09876543');
  const [password, setPassword] = useState(initialPassword || 'password123');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          iconColor="#fff"
          size={24}
          onPress={() => navigation.navigate('EditProfile')}
          style={styles.backButton}
        />
        <View style={styles.headerTitleContainer}>
          <Text variant="titleLarge" style={styles.headerTitle}>
            Edit Profile
          </Text>
          <Text style={styles.successMessage}>
            Your profile is updated successfully!
          </Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Image Section */}
        <View style={styles.profileImageContainer}>
          <TouchableOpacity style={styles.avatarPlaceholder}>
            <IconButton icon="camera" size={40} iconColor="#999" />
          </TouchableOpacity>
          <Text style={styles.uploadText}>Upload Profile Picture</Text>
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            mode="outlined"
            placeholder="Harry"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            outlineColor="#E0E0E0"
            activeOutlineColor="#1A80A4"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            mode="outlined"
            placeholder="hmin44851@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
            outlineColor="#E0E0E0"
            activeOutlineColor="#1A80A4"
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            mode="outlined"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            style={styles.input}
            outlineColor="#E0E0E0"
            activeOutlineColor="#1A80A4"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            mode="outlined"
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            right={<TextInput.Icon icon={showPassword ? "eye-off-outline" : "eye-outline"} onPress={() => setShowPassword(!showPassword)} />}
            style={styles.input}
            outlineColor="#E0E0E0"
            activeOutlineColor="#1A80A4"
          />
        </View>

        {/* Update Button */}
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Login')}
          style={styles.updateButton}
          labelStyle={styles.updateButtonLabel}
        >
          Login
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#1A80A4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 75,
    paddingHorizontal: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    margin: 0,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  successMessage: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 5,
  },
  headerSpacer: {
    width: 48,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: -60,
    marginBottom: 40,
    zIndex: 10,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 8,
    zIndex: 10,
  },
  uploadText: {
    color: '#666',
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#fff',
  },
  updateButton: {
    backgroundColor: '#1A80A4',
    borderRadius: 30,
    paddingVertical: 12,
    marginTop: 20,
  },
  updateButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default EditSuccessScreen;

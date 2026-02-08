import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, IconButton } from 'react-native-paper';
import { useUser } from '../../context/UserContext';

type Props = {
  navigation: any;
  route: any;
};

const EditProfileScreen = ({ navigation, route }: Props) => {
  const { email: userEmail, username: userName, password: userPassword } = useUser();
  const [username, setUsername] = useState(userName || '');
  const [email, setEmail] = useState(userEmail || '');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState(userPassword || '');
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (userEmail) {
      setEmail(userEmail);
    }
    if (userName) {
      setUsername(userName);
    }
    if (userPassword) {
      setPassword(userPassword);
    }
  }, [userEmail, userName, userPassword]);

  const handleUpdate = () => {
    // Handle update logic here
    Alert.alert(
      'Success',
      'Profile updated successfully!',
      [{ 
        text: 'OK', 
        onPress: () => {
          setIsUpdated(true);
          // Navigate back to Account with updated data
          navigation.navigate('Account', { username, email });
        }
      }]
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          iconColor="#fff"
          size={24}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <View style={styles.headerTitleContainer}>
          <Text variant="titleLarge" style={styles.headerTitle}>
            Edit Profile
          </Text>
          {isUpdated && (
            <Text style={styles.successMessage}>
              Profile Updated Successfully!
            </Text>
          )}
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
            textColor="#000"
            outlineColor="#E0E0E0"
            activeOutlineColor="#1A80A4"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            mode="outlined"
            placeholder="Enter email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
            textColor="#000"
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
            textColor="#000"
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
            textColor="#000"
            outlineColor="#E0E0E0"
            activeOutlineColor="#1A80A4"
          />
        </View>

        {/* Update Button */}
        <Button
          mode="contained"
          onPress={isUpdated ? () => navigation.navigate('Login') : handleUpdate}
          style={styles.updateButton}
          labelStyle={styles.updateButtonLabel}
        >
          {isUpdated ? 'Login' : 'Update'}
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 25,
    paddingHorizontal: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    margin: 0,
    marginTop: 5,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
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
    marginTop: 30,
    marginBottom: 40,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
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
    fontSize: 16,
    color: '#000',
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

export default EditProfileScreen;

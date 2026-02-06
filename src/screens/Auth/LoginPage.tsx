import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { TextInput, Button, Text, IconButton } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={Keyboard.dismiss}
      >
        {/* Back Button */}
        <IconButton icon="chevron-left" size={30} onPress={() => {}} style={styles.backBtn} />

      <View style={styles.inner}>
        <Text variant="headlineMedium" style={styles.welcomeText}>Welcome!</Text>

        {/* Social Buttons */}
        <Button 
          mode="contained" 
          icon={() => <Image source={require('../../../assets/facebook_smart_queue-removebg-preview.png')} style={{width: 20, height: 20, resizeMode: 'contain'}} />}
          style={styles.fbBtn} 
          textColor="#F6F1FB" 
          onPress={() => {}}>
          CONTINUE WITH FACEBOOK
        </Button>
        <Button 
          mode="outlined" 
          icon={() => <Image source={require('../../../assets/google smart queue.png')} style={{width: 20, height: 20, resizeMode: 'contain'}} />}
          style={styles.googleBtn} 
          textColor="#3F414E" 
          onPress={() => {}}>
          CONTINUE WITH GOOGLE
        </Button>

        <Text style={styles.orText}>OR LOG IN WITH EMAIL</Text>
        
        <View style={styles.signUpTextContainer}>
          <Text style={styles.signUpText}>Doesn't have an account </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpLink}>Sign in</Text>
          </TouchableOpacity>
        </View>

        {/* Inputs */}
        <TextInput
          placeholder="Email address"
          placeholderTextColor="#A1A4B2"
          textColor="#000"
          value={email}
          onChangeText={setEmail}
          mode="flat"
          style={styles.input}
          underlineColor="transparent"
          returnKeyType="next"
          blurOnSubmit={false}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#A1A4B2"
          textColor="#000"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="flat"
          style={styles.input}
          underlineColor="transparent"
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />

        <Button mode="contained" style={styles.loginBtn} onPress={() => {}}>
          LOG IN
        </Button>

        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1, padding: 20, paddingBottom: 40 },
  inner: { flex: 1, justifyContent: 'center', marginBottom: 80 },
  backBtn: { marginTop: 40, borderWidth: 1, borderColor: '#eee', borderRadius: 50 },
  welcomeText: { textAlign: 'center', marginBottom: 40, color: '#3F414E' },
  fbBtn: { marginBottom: 10, borderRadius: 25, backgroundColor: '#7b8bd3', paddingVertical: 5 },
  googleBtn: { marginBottom: 10, borderRadius: 25, paddingVertical: 5 },
  orText: { textAlign: 'center', marginVertical: 15, color: '#aaa', fontSize: 11 },
  signUpTextContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 15 },
  signUpText: { color: '#000', fontSize: 13 },
  signUpLink: { color: '#157AA2', fontSize: 13, textDecorationLine: 'underline' },
  input: { marginBottom: 15, backgroundColor: '#f2f2f7', borderRadius: 10 },
  loginBtn: { marginTop: 10, borderRadius: 25, backgroundColor: '#46bdec', paddingVertical: 6 },
  forgot: { textAlign: 'center', marginTop: 20, color: '#888' }
});

export default LoginScreen;
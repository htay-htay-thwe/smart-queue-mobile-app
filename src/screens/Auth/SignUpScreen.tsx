import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { TextInput, Button, Text, IconButton } from 'react-native-paper';

const SignUpPage = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
        bounces={false}
        onScrollBeginDrag={Keyboard.dismiss}
      >
      <IconButton icon="chevron-left" mode="outlined" size={24} style={styles.backBtn} onPress={() => navigation.goBack()} />

      <View style={styles.inner}>
        <Text variant="headlineMedium" style={styles.title}>Create your account</Text>

        {/* Social Buttons */}
        <Button 
          mode="contained" 
          icon={() => <Image source={require('../../../assets/facebook_smart_queue-removebg-preview.png')} style={styles.icon} />}
          style={[styles.btn, { backgroundColor: '#7b8bd3' }]}
          onPress={() => {}}>
          CONTINUE WITH FACEBOOK
        </Button>
        <Button 
          mode="outlined" 
          icon={() => <Image source={require('../../../assets/google smart queue.png')} style={styles.icon} />}
          style={styles.btn}
          textColor="#3F414E"
          onPress={() => {}}>
          CONTINUE WITH GOOGLE
        </Button>

        <Text style={styles.orText}>OR LOG IN WITH EMAIL</Text>

        {/* Inputs */}
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          right={<TextInput.Icon icon="check" color="#46bdec" />}
          style={styles.input}
          mode="flat"
          underlineColor="transparent"
          returnKeyType="next"
          blurOnSubmit={false}
        />
        <TextInput
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          right={<TextInput.Icon icon="check" color="#46bdec" />}
          style={styles.input}
          mode="flat"
          underlineColor="transparent"
          returnKeyType="next"
          blurOnSubmit={false}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          right={<TextInput.Icon icon={showPassword ? "eye-off-outline" : "eye-outline"} color="#46bdec" onPress={() => setShowPassword(!showPassword)} />}
          style={styles.input}
          mode="flat"
          underlineColor="transparent"
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />

        <Button mode="contained" style={styles.startBtn} onPress={() => {}}>
          GET STARTED
        </Button>
      </View>
      </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1, padding: 20, paddingBottom: 40 },
  backBtn: { marginTop: 40, marginLeft: 0 },
  inner: { flex: 1, justifyContent: 'center', marginBottom: 80 },
  title: { textAlign: 'center', marginBottom: 30, color: '#3F414E' },
  btn: { marginVertical: 8, borderRadius: 25 },
  icon: { width: 20, height: 20, resizeMode: 'contain' },
  orText: { textAlign: 'center', marginVertical: 20, color: '#aaa', fontSize: 11 },
  input: { marginBottom: 15, backgroundColor: '#f2f2f7', borderRadius: 12 },
  startBtn: { marginTop: 20, borderRadius: 25, backgroundColor: '#46bdec', paddingVertical: 8 }
});

export default SignUpPage;
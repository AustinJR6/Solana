import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { db } from '../../firebase';

export default function CustomerForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async () => {
    if (!fullName || !email || !phone || !address) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'customers'), {
        fullName,
        email,
        phone,
        address,
        createdAt: Timestamp.now(),
      });

      Alert.alert('Success', 'Customer added!');
      setFullName('');
      setEmail('');
      setPhone('');
      setAddress('');
    } catch (error) {
      console.error('Error saving customer:', error);
      Alert.alert('Error', 'Something went wrong while saving the customer.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Customer</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />

      <Button title="Save Customer" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
  },
});

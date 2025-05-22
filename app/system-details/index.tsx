import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { db } from '../../firebase';

export default function SystemDetailsScreen() {
  const [customerId, setCustomerId] = useState('');
  const [panelModel, setPanelModel] = useState('');
  const [inverter, setInverter] = useState('');
  const [battery, setBattery] = useState('');
  const [systemSize, setSystemSize] = useState('');
  const [roofType, setRoofType] = useState('');

  const handleSubmit = async () => {
    if (!customerId || !panelModel || !inverter || !systemSize) {
      Alert.alert('Missing Info', 'Please fill in all required fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'systems'), {
        customerId,
        panelModel,
        inverter,
        battery,
        systemSize,
        roofType,
        createdAt: Timestamp.now(),
      });

      Alert.alert('Success', 'System details saved!');
      setCustomerId('');
      setPanelModel('');
      setInverter('');
      setBattery('');
      setSystemSize('');
      setRoofType('');
    } catch (error) {
      console.error('Error saving system info:', error);
      Alert.alert('Error', 'Could not save system details.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>System Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Customer ID"
        value={customerId}
        onChangeText={setCustomerId}
      />
      <TextInput
        style={styles.input}
        placeholder="Panel Model"
        value={panelModel}
        onChangeText={setPanelModel}
      />
      <TextInput
        style={styles.input}
        placeholder="Inverter"
        value={inverter}
        onChangeText={setInverter}
      />
      <TextInput
        style={styles.input}
        placeholder="Battery (optional)"
        value={battery}
        onChangeText={setBattery}
      />
      <TextInput
        style={styles.input}
        placeholder="System Size (kW)"
        value={systemSize}
        onChangeText={setSystemSize}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Roof Type"
        value={roofType}
        onChangeText={setRoofType}
      />

      <Button title="Save System Info" onPress={handleSubmit} />
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

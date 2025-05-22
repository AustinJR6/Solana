import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, TextInput, View } from 'react-native';
import { db, storage } from '../../firebase';

export default function FileUpload() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri || !customerId.trim()) {
      Alert.alert('Missing Info', 'Please select an image and enter a valid customer ID');
      return;
    }

    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const fileName = `${customerId}_${Date.now()}.jpg`;
      const fileRef = ref(storage, `uploads/${fileName}`);

      await uploadBytes(fileRef, blob);
      const url = await getDownloadURL(fileRef);

      await addDoc(collection(db, 'files'), {
        customerId,
        fileName,
        url,
        type: 'photo',
        uploadedAt: Timestamp.now(),
      });

      Alert.alert('Success', 'Photo uploaded successfully!');
      setImageUri(null);
      setCustomerId('');
    } catch (error) {
      console.error('Upload failed:', error);
      Alert.alert('Upload Error', 'Something went wrong. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Customer ID"
        value={customerId}
        onChangeText={setCustomerId}
      />
      <Button title="Pick Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
  },
  preview: {
    width: '100%',
    height: 250,
    marginVertical: 15,
    borderRadius: 10,
  },
});


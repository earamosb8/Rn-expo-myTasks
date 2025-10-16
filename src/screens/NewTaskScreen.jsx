import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet
} from "react-native";
import { colors } from "../themes/colors";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { insertTask } from "../services/database"; // 👈 importa tu función centralizada
export default function NewTaskScreen() {
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const navigation = useNavigation();

 
  
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const saveTask = async () => {
    if (!title.trim() || !photo) {
      Alert.alert("Required fields", "You must enter a title and a photo.");
      return;
    }

    try {
      await insertTask(title, description, photo); // 👈 saves using your module
      Alert.alert("Success", "Task saved successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Error saving the task:", error);
      Alert.alert("Error", "There was a problem saving the task.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Write the title"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 8,
          marginVertical: 8,
        }}
      />

      <Text style={{ fontSize: 18, fontWeight: "bold" ,marginTop:5 }}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Write a Description"
        multiline
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 8,
          marginVertical: 8,
          height: 100,
        }}
      />

      <TouchableOpacity
        onPress={pickImage}
        style={{
          backgroundColor: "#007AFF",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Select Photo
        </Text>
      </TouchableOpacity>

      {photo && (
        <Image
          source={{ uri: photo }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 10,
            marginTop: 10,
          }}
        />
      )}

      <TouchableOpacity
        onPress={saveTask}
        style={styles.btn}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold",textAlign:'center' }}>
          Save Task
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:40,
    backgroundColor: colors.ligthyellow,
    padding: 16,
  },
  title: {
    color: colors.darkBlue,
    fontSize: 40,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  btn: {
    padding: 16,
    paddingHorizontal: 32,
    backgroundColor: colors.redCarmesi,
    borderRadius: 16,
    marginTop: 32,
    marginBottom: 32,
  },
});


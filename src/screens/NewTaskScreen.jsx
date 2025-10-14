import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
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

  // 💾 guardar tarea
  const saveTask = async () => {
    if (!title.trim() || !photo) {
      Alert.alert("Campos requeridos", "Debes ingresar un título y una foto.");
      return;
    }

    try {
      await insertTask(title, description, photo); // 👈 guarda usando tu módulo
      Alert.alert("Éxito", "Tarea guardada correctamente");
      navigation.goBack();
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
      Alert.alert("Error", "Hubo un problema al guardar la tarea.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Título</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Escribe el título"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 8,
          marginVertical: 8,
        }}
      />

      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Descripción</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Escribe una descripción"
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
          Seleccionar foto
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
        style={{
          backgroundColor: "#34C759",
          padding: 14,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Guardar tarea
        </Text>
      </TouchableOpacity>
    </View>
  );
}

import React, { useEffect, useState } from "react";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getTasks } from "../services/database"; 
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // detecta cuando la pantalla está activa
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const result = await getTasks();
        setTasks(result || []);
      } catch (error) {
        console.error("Error al cargar las tareas:", error);
      }
    };

    if (isFocused) loadTasks(); 
  }, [isFocused]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Lista de tareas */}
      {tasks.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No hay tareas guardadas aún.
        </Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                padding: 12,
                marginBottom: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                flexDirection: "row",
              }}
            >
              {/* Imagen */}
              {item.image ? (
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 10,
                    marginRight: 12,
                  }}
                  resizeMode="cover"
                />
              ) : null}

              {/* Contenido textual */}
              <View style={{ flex: 1, justifyContent: "center" }}>
                {/* Título */}
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: 6,
                  }}
                >
                  {item.title}
                </Text>

                {/* Fila: descripción + iconos */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#666",
                      fontSize: 14,
                      flex: 1,
                      marginRight: 8,
                    }}
                  >
                    {item.description || "Sin descripción"}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <TouchableOpacity onPress={() => handleComplete(item.id)}>
                      <Ionicons
                        name="checkmark-circle"
                        size={26}
                        color="#34C759"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                      <Ionicons name="trash" size={26} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}

      {/* Botón Nueva Tarea */}
      <TouchableOpacity
        style={{
          backgroundColor: "#007AFF",
          padding: 14,
          borderRadius: 10,
          alignItems: "center",
          position: "absolute",
          bottom: 30,
          right: 20,
        }}
        onPress={() => navigation.navigate("NewTaskScreen")}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Nueva tarea
        </Text>
      </TouchableOpacity>
    </View>
  );
}

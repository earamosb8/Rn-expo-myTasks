import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getTasks, deleteTask } from "../services/database"; 
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../themes/colors";

export default function HomeScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
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


  const handleDelete = async (id) => {
    try {
      await deleteTask(id); 
      setTasks(tasks.filter((task) => task.id !== id));
      console.log("Tarea eliminada correctamente:", id);
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

   const handleCompleted = (id) => {
    if(id){
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        )
      );

    }
     
   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks List</Text>
      {tasks.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          There are no saved tasks.
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

              <View style={{ flex: 1, justifyContent: "center" }}>
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
                    <TouchableOpacity onPress={() => handleCompleted(item.id)}>
                      <Ionicons
                        name={item.isCompleted ? "star" : "star-outline"}
                        size={26}
                        color={item.isCompleted ? "#FFD700" : "#CCCCCC"}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                      <Ionicons
                        name="trash"
                        size={26}
                        color={colors.redCarmesi}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("NewTaskScreen")}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          New Task
        </Text>
      </TouchableOpacity>
    </View>
  );
}

 const styles = StyleSheet.create({
   container: {
     flex: 1,
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
     marginBottom:32
   },
 });





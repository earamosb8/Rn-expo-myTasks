import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import NewTaskScreen from "./src/screens/NewTaskScreen";
import { initSessionsTable } from "./src/services/database";
import { useState, useEffect } from "react";
const Stack = createNativeStackNavigator();

export default function App() {

   const [ready, setReady] = useState(false);

   useEffect(() => {
     const prepareDB = async () => {
       await initSessionsTable();
       setReady(true);
     };
     prepareDB();
   }, []);

if (ready) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewTaskScreen"
          component={NewTaskScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
}

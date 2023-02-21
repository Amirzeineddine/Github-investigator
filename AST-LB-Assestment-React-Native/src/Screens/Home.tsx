import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../components/Header";
import Container from "../components/Container";
import { StatusBar } from "expo-status-bar";
import { Button } from "react-native";
import { useAppSelector } from "../App/hooks";
export default function HomeScreen({ navigation }: any) {
  const { user, isLoading, isError, isSuccess } = useAppSelector(
    (state: any) => state.auth
  );
  return (
    <View style={styles.container}>
      <Header navigation={navigation} user={user} />
      <Container navigation={navigation} />
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#20232A",
    height: "100%",
  },
  text: {
    color: "#fff",
  },
});

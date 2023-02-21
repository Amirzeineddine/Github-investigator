import { View, StyleSheet, Text } from "react-native";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { Button, TextInput, ActivityIndicator } from "react-native";
import { useAppDispatch, useAppSelector } from "./../App/hooks";
import { login, reset } from "../features/Auth/AuthSlice";
import { Pressable } from "react-native";
interface UserLog {
  email: string;
  password: string;
}
export default function LoginScreen({ navigation }: any) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { user, isLoading, isError, isSuccess } = useAppSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      setFormData({ email: "", password: "" });
      navigation.navigate("HomeScreen");
    }

    dispatch(reset());
  }, [isSuccess]);

  const onSubmit = () => {
    const user: UserLog = {
      email: formData.email,
      password: formData.password,
    };

    dispatch(login(user));
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.HedaerLogin}>Welcom Programers</Text>
      <Text style={styles.LoginnNav}> Sign in and start contributing !</Text>
      <Text style={styles.LoginnTitle}> Login</Text>

      {isError ? (
        <Text style={styles.error}>There was an error logging in</Text>
      ) : (
        ""
      )}

      <TextInput
        style={styles.LoginInput}
        placeholderTextColor="#999A9D"
        placeholder="Insert your email!"
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        value={formData.email}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.LoginInput}
        placeholderTextColor="#999A9D"
        placeholder="Insert your password!"
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        value={formData.password}
        secureTextEntry
      />

      <View style={styles.LoginBtn}>
        {isLoading ? (
          <ActivityIndicator size={40} color="#61DAFB" />
        ) : (
          <Pressable style={{ backgroundColor: "#61DAFB" }} onPress={onSubmit}>
            <Text style={styles.button}>Sign In</Text>
          </Pressable>
        )}
      </View>
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
  button: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#20232A",
    marginVertical: 5,

    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  LoginInput: {
    width: "80%",
    height: 40,
    borderRadius: 5,
    fontSize: 20,
    borderColor: "#61DAFB",
    color: "#fff",
    borderWidth: 1,
    padding: 7,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 25,
  },
  LoginBtn: {
    borderColor: "#61DAFB",
    width: "80%",
    borderWidth: 0.5,
    borderRadius: 5,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },

  HedaerLogin: {
    marginTop: 30,
    marginBottom: 5,
    fontSize: 46,
    color: "#ffff",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  LoginnNav: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#999A9D",
    marginBottom: 60,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  LoginnTitle: {
    fontWeight: "bold",
    fontSize: 45,
    color: "#61DAFB",
    marginBottom: 30,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  error: {
    fontSize: 20,
    color: "#ff3333",
    marginBottom: 10,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  HedaerContainer: {
    backgroundColor: "#282C34",
  },
});

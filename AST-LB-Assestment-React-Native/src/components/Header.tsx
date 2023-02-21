import { Text, View, StyleSheet, Pressable } from "react-native";

import { SimpleLineIcons } from "@expo/vector-icons";
import { Button } from "@material-ui/core";
import { useAppDispatch } from "../App/hooks";
import { reset, logout } from "../features/Auth/AuthSlice";
export default function Header({ navigation, user }: any) {
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.HedaerContainer}>
      <SimpleLineIcons name="social-github" size={48} color="#61DAFB" />
      <Text style={styles.HedaerNav}>GitHub Investigator</Text>

      {user ? (
        <Pressable onPress={onLogout}>
          <SimpleLineIcons
            name="logout"
            marginRight={0}
            size={40}
            color="#61DAFB"
          />
        </Pressable>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  HedaerNav: {
    fontSize: 35,
    color: "#ffff",
  },

  HedaerContainer: {
    backgroundColor: "#282C34",
    width: "100%",
    display: "flex",
    paddingBottom: 20,
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

import { TextInput, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../App/hooks";
import { useState } from "react";
import { Getusers, SearchUsers } from "../features/users/userSlice";

export default function Search({ navigation }: any) {
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const { users, isLoading, isError, message } = useAppSelector(
    (state) => state.users
  );

  const onSearch = () => {
    dispatch(SearchUsers(searchInput));
  };

  const onReset = () => {
    setSearchInput("");
    dispatch(Getusers(1));
  };

  return (
    <View style={styles.SearchContainer}>
      <View style={styles.SearchTextContainer}>
        <TextInput
          style={styles.SearchTextInput}
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
          placeholder="Search ..."
        />
      </View>
      <View style={styles.iconSearch}>
        <MaterialCommunityIcons
          onPress={onSearch}
          name="card-search"
          size={52}
          color="#61DAFB"
        />
      </View>
      <View style={styles.iconSearch}>
        <Entypo onPress={onReset} name="retweet" size={52} color="#61DAFB" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  SearchContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    marginTop: 20,

    justifyContent: "center",
  },
  SearchTextContainer: {
    width: "60%",
  },

  SearchTextInput: {
    height: 36,
    fontSize: 20,
    backgroundColor: "white",
    borderRadius: 4,
    marginBottom: 8,
    paddingLeft: 10,
    marginTop: 8,
  },
  iconSearch: {
    alignItems: "center",
    marginLeft: 10,
    width: "12%",
    justifyContent: "center",
  },
});

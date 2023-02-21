import { View, StyleSheet, Text, FlatList, RefreshControl } from "react-native";

import Search from "./Search";
import { useAppDispatch, useAppSelector } from "../App/hooks";
import { useEffect, useState, useCallback } from "react";
import { Getusers, reset } from "../features/users/userSlice";
import UsersCard from "./UsersCard";
interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  email: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
}

export default function Container({ navigation }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useAppDispatch();

  // get user auth
  const { user } = useAppSelector((state) => state.auth);

  //get users
  const { users, isLoading, isError, message } = useAppSelector(
    (state) => state.users
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // handle page number
  const [page, setPage] = useState(1);
  const handleChange = (event: any, value: number) => {
    setPage(value);
    console.log(value);
  };

  // check the users type array or object

  if (Array.isArray(users)) {
    useEffect(() => {
      if (isError) {
        console.log("Error", message);
      }

      if (!user) {
        navigation.navigate("LoginScreen");
      }

      dispatch(Getusers(page));

      return () => {
        dispatch(reset());
      };
    }, [page, refreshing]);
  } else {
    useEffect(() => {
      if (isError) {
        console.log("Error", message);
      }

      if (!user) {
        navigation.navigate("LoginScreen");
      }
    }, []);
  }

  return (
    <View>
      <Text style={styles.SlogonNav}>
        Discover the best developers and collaborators for your project, faster
        with GitHub user search.
      </Text>
      <Search />
      <FlatList
        contentContainerStyle={{ alignSelf: "stretch" }}
        refreshControl={
          <RefreshControl
            colors={["#61DAFB"]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        data={Array.isArray(users) ? users : users && users.items}
        renderItem={({ item }) => <UsersCard user={item} />}
        keyExtractor={(item) => item.id}
      />
      {/* {users.map((user: GitHubUser) => (
          <UsersCard user={user} />
        ))} */}
    </View>
  );
}

const styles = StyleSheet.create({
  SlogonNav: {
    marginHorizontal: 15,
    marginTop: 15,
    fontWeight: "bold",
    fontSize: 20,
    color: "#999A9D",
    marginBottom: 10,
  },
});

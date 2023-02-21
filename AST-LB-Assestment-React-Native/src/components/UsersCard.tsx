import { Image, View, Text, StyleSheet } from "react-native";
interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
}
export default function UsersCard({ user }: { user: GitHubUser }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: user.avatar_url }} />
      <View style={styles.infoContainer}>
        <Text style={styles.header}>{user.login}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    height: 100,
    borderRadius: 20,
    shadowOffset: { width: 1, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.1,
    elevation: 3,
    backgroundColor: "#282C34",
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#61DAFB",
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 400,
    marginLeft: 10,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 4,
    marginBottom: 4,
  },
});

import {
  Box,
  Paper,
  Grid,
  Typography,
  ButtonBase,
  styled,
} from "@mui/material";

interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
}

const Img = styled("img")({
  margin: "0",
  display: "block",
  maxWidth: "50%",
  maxHeight: "50%",
  borderRadius: "50%",
});

function UserCard({ user }: { user: GitHubUser }) {
  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        minWidth: 250,
        margin: "auto",
        maxWidth: 250,

        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <ButtonBase sx={{ width: 150, height: 150 }}>
        <Img alt="complex" src={user.avatar_url} />
      </ButtonBase>
      <Typography gutterBottom variant="subtitle1" component="div">
        {user.login}
      </Typography>
    </Paper>
  );
}

export default UserCard;

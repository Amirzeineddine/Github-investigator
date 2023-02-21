import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../App/hooks";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import UserCard from "./UserCard";
import { Getusers, reset } from "../features/users/userSlice";
import Skeleton from "@mui/material/Skeleton";
import { Box, Paper, Stack, Pagination, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

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

// type Users = {
//   items: GitHubUser[];
// };

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // get user auth
  const { user } = useAppSelector((state) => state.auth);

  //get users
  const { users, isLoading, isError, message } = useAppSelector(
    (state) => state.users
  );

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
        navigate("/");
      }

      dispatch(Getusers(page));
      window.scrollTo(0, 0);
      return () => {
        dispatch(reset());
      };
    }, [page]);
  } else {
    useEffect(() => {
      if (isError) {
        console.log("Error", message);
      }

      if (!user) {
        navigate("/");
      }
    }, []);
  }

  return (
    <Container sx={{ margin: "40px 0 50px 0" }}>
      {!isLoading && Array.isArray(users) ? (
        <Typography
          color="white"
          sx={{
            backgroundColor: grey[900],
            padding: 1,
            margin: "0 0 20px 0",
            borderRadius: "2px",
            width: "100px",
          }}
          align="left"
        >
          Page: {page}
        </Typography>
      ) : (
        ""
      )}
      <Grid spacing={8} container item xs={12}>
        {isLoading ? (
          <Grid container sx={{ margin: "50px 0 0 0" }} spacing={5}>
            {Array.from(new Array(30)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
                <Paper
                  elevation={5}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    minWidth: 250,
                    margin: "10px 50px",
                    maxWidth: 250,
                    height: 100,
                    padding: 2,
                  }}
                >
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={50}
                    height={50}
                  />
                  <Box sx={{ width: 200 }}>
                    <Skeleton
                      animation="wave"
                      height={20}
                      width="90%"
                      style={{ margin: 2 }}
                    />
                    <Skeleton
                      animation="wave"
                      height={20}
                      width="60%"
                      style={{ margin: 1 }}
                    />
                    <Skeleton
                      animation="wave"
                      height={20}
                      width="30%"
                      style={{ margin: 1 }}
                    />
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          (Array.isArray(users) ? users : users && users.items)?.map(
            (user: GitHubUser) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={user.id}>
                <UserCard user={user} />
              </Grid>
            )
          )
        )}
      </Grid>
      {Array.isArray(users) ? (
        <Stack spacing={3}>
          <Pagination
            count={10}
            sx={{ margin: "80px auto" }}
            variant="outlined"
            shape="rounded"
            page={page}
            onChange={handleChange}
          />
        </Stack>
      ) : (
        ""
      )}
    </Container>
  );
}

export default HomePage;

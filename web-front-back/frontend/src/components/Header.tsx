import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  styled,
  InputBase,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../App/hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout, reset } from "../features/Auth/AuthSlice";
import { GitHub } from "@mui/icons-material";
import { Getusers, SearchUsers } from "../features/users/userSlice";

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  width: "40%",

  padding: "3px 8px",
  alignItems: "center",
  margin: "auto 10px auto 0",
  borderRadius: theme.shape.borderRadius,
}));

function Header() {
  const [searchInput, setSearchInput] = useState("");

  function handleSearchInput(event: any) {
    setSearchInput(event.target.value);
  }
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const { users, isLoading, isError, message } = useAppSelector(
    (state) => state.users
  );

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <GitHub />
          <Typography variant="h6">Github Investigator</Typography>
        </Box>
        {user ? (
          <>
            <Box sx={{ display: "flex", width: "60%" }}>
              <Search>
                <InputBase
                  sx={{ color: "primary" }}
                  onChange={handleSearchInput}
                  value={searchInput}
                  placeholder="search..."
                />
              </Search>
              <Button
                onClick={() => {
                  dispatch(SearchUsers(searchInput));
                }}
                variant="contained"
                color="secondary"
                sx={{ width: 50 }}
                fullWidth
                style={{ width: "30" }}
              >
                Search
              </Button>
              <Button
                onClick={() => {
                  setPage(1);
                  setSearchInput("");
                  dispatch(Getusers(1));
                  window.scroll(0, 0);
                }}
                variant="contained"
                color="secondary"
                sx={{ width: 50 }}
                fullWidth
                style={{ width: "30", margin: "0 0 0 5px" }}
              >
                Reset
              </Button>
            </Box>
            <Button
              onClick={onLogout}
              variant="contained"
              color="secondary"
              sx={{ width: 50 }}
              fullWidth
              style={{ width: "30" }}
            >
              LogOut
            </Button>
          </>
        ) : (
          ""
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;

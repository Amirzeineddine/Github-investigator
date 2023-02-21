import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../App/hooks";
import {
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { login, reset } from "../features/Auth/AuthSlice";
interface UserLog {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;
  const { user, isLoading, isError, isSuccess } = useAppSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      navigate(`/landing`);
    }

    dispatch(reset());
  }, [isSuccess]);

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const user: UserLog = {
      email,
      password,
    };
    dispatch(login(user));
  };

  return (
    <Container maxWidth="xs">
      <Typography
        variant="h3"
        sx={{ margin: "50px 0 0 0" }}
        align="center"
        fontWeight={"bold"}
        gutterBottom
      >
        Welcome PROGRAMERS
      </Typography>
      <Typography
        variant="h4"
        sx={{ margin: "10px 0 0 0" }}
        align="center"
        gutterBottom
      >
        Sign in and start contributing!
      </Typography>
      {isError ? (
        <Typography color="error" align="center">
          There was an error logging in
        </Typography>
      ) : (
        ""
      )}

      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={onChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          fullWidth
          style={{ marginTop: "16px" }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Log in"
          )}
        </Button>
      </form>
    </Container>
  );
};
export default Login;

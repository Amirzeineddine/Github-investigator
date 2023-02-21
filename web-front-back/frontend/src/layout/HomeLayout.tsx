import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Container } from "@mui/material";

function LandingLayout() {
  //   const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default LandingLayout;

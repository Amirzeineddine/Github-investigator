import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Container } from "@mui/material";

function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <Container>
      <h1>404 Page Not Found</h1>
      <p>You will be redirected to the landing page in 3 seconds...</p>
    </Container>
  );
}

export default NotFoundPage;

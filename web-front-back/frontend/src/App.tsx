import LandingPage from "./pages/landing";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingLayout from "./layout/LandingLayout";
import HomeLayout from "./layout/HomeLayout";
import HomePage from "./components/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<LandingPage />}></Route>
        </Route>
        <Route path="/landing" element={<HomeLayout />}>
          <Route index element={<HomePage />}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />

        <Route />
      </Routes>
    </Router>
  );
}

export default App;

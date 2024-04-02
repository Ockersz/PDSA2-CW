import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./scenes/Home/Home.jsx";
import Login from "./scenes/Login/Login.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9abb9a",
    },
    secondary: {
      main: "#bb9a9a",
    },
    background: {
      paper: "#bbbbd9",
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            localStorage.getItem("username") ? (
              <Home />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

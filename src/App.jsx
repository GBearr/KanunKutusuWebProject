import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";
import { MainPage } from "./Components/MainPage";
import { AppBar, Toolbar } from "@mui/material";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          {/* Buraya AppBar içeriği ekleyebilirsiniz, örneğin butonlar veya başlık */}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

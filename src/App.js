import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Notfound from "./Components/Notfound";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtecteRoute from "./Components/ProtecteRoute";
function App() {
  const [user, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserData(localStorage.getItem("token"));
    }
  }, [user]);

  function logout() {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/login");
  }
  return (
    <>
      <Navbar user={user} logout={logout} />

      <Routes>
        <Route
          path="/"
          element={
            <ProtecteRoute>
              <Home setUserData={setUserData} logout={logout} />
            </ProtecteRoute>
          }
        />
        <Route path="/login" element={<Login setUserData={setUserData} />} />

        <Route path="/register" element={<Register />} />
        <Route
          path="/notes"
          element={
            <ProtecteRoute>
              <Home setUserData={setUserData} logout={logout} />
            </ProtecteRoute>
          }
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;

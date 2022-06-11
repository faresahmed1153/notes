import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Notfound from "./Components/Notfound";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const [logedIn, setLogedIn] = useState(false);

  return (
    <>
      <Navbar status={logedIn} setSatus={setLogedIn} />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home status={logedIn} setSatus={setLogedIn} />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login status={logedIn} setSatus={setLogedIn} />} />

        <Route path="/register" element={<Register />} />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;

import { useState } from "react";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {/* <ToastContainer autoClose={2000} /> */}
    </>
  );
}

export default App;

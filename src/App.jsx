import React, { useState } from "react";
import "./App.css";

import { Router, Routes, Route, Link } from "react-router-dom";
import LoginForm from "./components/login/login";
import Register from "./components/Register/Register";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="/sign-up" element={<Register />} />
        
      </Routes>
     
    </div>
  );
}

export default App;

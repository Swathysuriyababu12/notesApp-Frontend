import React, { useState } from "react";
//import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Router, Routes, Route, Link } from "react-router-dom";
import LoginForm from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotesPage from "./components/Note";
import AddNotePage from "./components/Addnote";
import DisplayNotesPage from "./components/DisplayNote";
import EditNotePage from "./components/Edit";

function App() {
  return (
    <div className="App">
      <div>
        <ToastContainer
          limit={3}
          position="bottom-left"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </div>
      <Routes>
        <Route exact path="/login" element={<LoginForm />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/" element={<DisplayNotesPage />} />
        <Route path="/add-note" element={<AddNotePage />} />
        <Route path="/edit-data/:id" element={<EditNotePage/>}/>
      </Routes>
    </div>
  );
}

export default App;

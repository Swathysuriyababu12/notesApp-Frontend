import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getAllNotes,
  addNote,
  clearSomeState,
} from "../redux/features/noteSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AddNotePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, notes, error, success } = useSelector(
    (state) => state.notes
  );
  const [newNote, setNewNote] = useState({
    title: "",
    desc: "",
    text: "",
  });

  //   useEffect(() => {
  //     if (loading) {
  //       toast.info("Loading...");
  //       dispatch(clearSomeState());
  //     } else if (error) {
  //       toast.error(`Error: ${error}`);
  //       dispatch(clearSomeState());
  //     } else if (success) {
  //       toast.success("New note added");
  //       dispatch(clearSomeState());
  //       navigate("/");
  //     }
  //   }, [loading, error, success]);
  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
      dispatch(clearSomeState());
    } else if (success) {
      toast.success("Note added successfully");
      dispatch(clearSomeState());
      navigate("/");
    }
  }, [loading, error, success]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNote((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddNote = () => {
    dispatch(addNote(newNote));
    // dispatch(clearSomeState());
    setNewNote({
      title: "",
      desc: "",
      text: "",
    });
  };

  return (
    <div className="container mt-5">
      <h2>Add Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={newNote.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Description:
          </label>
          <input
            type="text"
            className="form-control"
            id="desc"
            name="desc"
            value={newNote.desc}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Text:
          </label>
          <textarea
            className="form-control"
            id="text"
            name="text"
            value={newNote.text}
            onChange={handleChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddNote}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNotePage;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotes,
  addNote,
  clearSomeState,
} from "../redux/features/noteSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const NotesPage = () => {
  const dispatch = useDispatch();
  const { loading, notes, error, success } = useSelector(
    (state) => state.notes
  );
  const [newNote, setNewNote] = useState({
    title: "",
    desc: "",
    text: "",
  });

  useEffect(() => {
    dispatch(getAllNotes());
    return () => {
      dispatch(clearSomeState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      toast.info("Loading...");
    } else if (error) {
      toast.error(`Error: ${error}`);
    } else if (success) {
      toast.success("Operation successful!");
    }
  }, [loading, error, success]);

  const handleAddNote = () => {
    dispatch(addNote(newNote));
    setNewNote({
      title: "",
      description: "",
      text: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNote((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-5">
      <ToastContainer />

      {/* Add Note Form */}
      <div className="row">
        <div className="col-md-6 offset-md-3">
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
      </div>

      {/* List of Notes */}
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <h2>Notes</h2>
          {notes &&
            notes.map((note) => (
              <div key={note._id} className="mb-3 p-3 border">
                <h3>{note.title}</h3>
                <p>{note.desc}</p>
                <div>{note.text}</div>
                <button className="btn btn-secondary me-2">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NotesPage;

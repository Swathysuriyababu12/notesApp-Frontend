import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editNote, clearSomeState } from "../redux/features/noteSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const EditNotePage = () => {
  const { id } = useParams(); // Retrieve note ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [noteData, setNoteData] = useState({ title: "", desc: "", text: "" });
  const { notes, error, success } = useSelector((state) => state.notes);

  useEffect(() => {
    // Fetch note data using the ID
    console.log(notes);
    const note = notes.find((note) => note._id === id);
    console.log(note);
    if (note) {
      setNoteData(note);
    }
  }, [id, notes]);
  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
      dispatch(clearSomeState());
    } else if (success) {
      toast.success("Note edited successfully");
      dispatch(clearSomeState());
      navigate("/");
    }
  }, [error, success]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNoteData((prevNoteData) => ({
      ...prevNoteData,
      [name]: value,
    }));
  };

  const handleEditNote = () => {
    // Dispatch editNote action with updated note data
      dispatch(editNote({ id, noteData }));
    // Redirect to the notes list page after editing
    // You can use useHistory hook here to navigate back
    // Example: history.push("/notes");
  };

  return (
    <div className="container mt-5">
      <h2>Edit Note</h2>
      <div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={noteData.title}
            onChange={handleInputChange}
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
            value={noteData.desc}
            onChange={handleInputChange}
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
            value={noteData.text}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleEditNote}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditNotePage;

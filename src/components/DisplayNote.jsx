import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotes,
  addNote,
  deleteNote,
  clearSomeState,
} from "../redux/features/noteSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const DisplayNotesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, notes, error, success } = useSelector(
    (state) => state.notes
  );
  useEffect(() => {
    dispatch(getAllNotes());
    return () => {
      dispatch(clearSomeState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      toast.info("Loading...");
      dispatch(clearSomeState());
    } else if (error) {
      toast.error(`Error: ${error}`);
      dispatch(clearSomeState());
    } else if (success) {
      toast.success("Operation successful!");
      dispatch(clearSomeState());
    }
  }, [loading, error, success]);

  return (
    <div className="container-fluid mb-5">
      <Navbar />

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {notes &&
          notes.map((note) => (
            <div key={note._id} className="col">
              <div className="card h-100 bg-light">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title text-center mb-3">
                      {note.title}
                    </h5>
                    <p className="card-text">{note.desc}</p>
                    <p className="card-text">{note.text}</p>
                  </div>
                  <div className="text-end">
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => navigate(`/edit-data/${note._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => dispatch(deleteNote(note._id))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DisplayNotesPage;

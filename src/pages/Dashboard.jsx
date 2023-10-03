import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const token = localStorage.getItem("userInfo"); // Assuming you store your token in local storage
    console.log(token);
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.get("http://localhost:5000/api/notes", {
          headers,
        });
        // Handle the response here
        console.log(response.data);
        setNotes([...notes, ...response.data]);
        console.log(notes);
      } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
      }
    } else {
      // Handle the case where the token is not available in local storage
      console.error("Token not found in local storage");
    }
  };

  const addNote = async () => {
    const token = localStorage.getItem("userInfo");
    console.log(token);
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/api/notes",
          { title, desc, text: newNote },
          {
            headers,
          }
        );
        setNotes([...notes, response.data]);
        setNewNote("");
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  const deleteNote = async (id) => {
    const token = localStorage.getItem("userInfo");
    console.log(token);
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        await axios.delete(`http://localhost:5000/api/notes/${id}`, {
          headers,
        });
        setNotes(notes.filter((note) => note._id !== id));
        console.log(notes)
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Notes App</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div>
          <textarea
            placeholder="Write your note here"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
        </div>
        <button onClick={addNote}>Add</button>
      </div>

      <ul className="notes-list">
        {console.log(notes)}
        {notes &&
          notes.map((note) => (
            <li key={note._id} className="note-item">
              <div className="note-content">
                <h2>{note.title}</h2>
                <p>{note.desc}</p>
                <p>{note.text}</p>
              </div>
              <button
                className="delete-button"
                onClick={() => deleteNote(note._id)}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Dashboard;

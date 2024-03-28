import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../globals";
import axios from "axios";

export const getAllNotes = createAsyncThunk(
  "notes/getAllNotes",
  async (values, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axios.get(`${API}/api/notes`, config);
      return data;
    } catch (err) {
      console.log(err.response.data.message);
      if (
        (err.response && err.response.data.message) ||
        err.response.status === 401
      ) {
        console.log(err);
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const addNote = createAsyncThunk(
  "notes/addNote",
  async (values, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      console.log(`Bearer ${localStorage.getItem("token")}`);
      const { data } = await axios.post(`${API}/api/notes`, values, config);
      return data;
    } catch (err) {
      if (
        err.response &&
        err.response.data.message ||
        err.response.status === 401
      ) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const editNote = createAsyncThunk(
  "notes/editNote",
  async ({ id, noteData }, { rejectWithValue }) => {
    try {
      console.log(id, noteData);
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${API}/api/notes/${id}`,
        noteData,
        config
      );
      return data;
    } catch (err) {
      if (
        err.response &&
        err.response.data.message ||
        err.response.status === 401
      ) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

// Action to delete a note
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`${API}/api/notes/${id}`, config);
      return id;
    } catch (err) {
      if (
        err.response && 
        err.response.data.message ||
        err.response.status === 401
      ) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

const NoteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    loading: false,
    notesInfo: null,
    error: null,
    success: false,
  },
  reducers: {
    clearSomeState: (state) => {
      state.error = false;
      state.success = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
        .addCase(getAllNotes.fulfilled, (state, { payload }) => {
        
        state.loading = false;
        state.success = true;
        state.notes = payload;
      })
      .addCase(getAllNotes.rejected, (state, { payload }) => {
        console.log(payload);
        state.loading = false;
        state.error = payload;
      })
      .addCase(addNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNote.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.notes = payload.data;
      })
      .addCase(addNote.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(editNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editNote.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        // Update the note in the state
        state.notes = state.notes.map((note) =>
          note._id === payload._id ? payload : note
        );
      })
      .addCase(editNote.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // Case for deleteNote
      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        // Remove the deleted note from the state
        state.notes = state.notes.filter((note) => note._id !== payload);
      })
      .addCase(deleteNote.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { clearSomeState } = NoteSlice.actions;
export default NoteSlice.reducer;

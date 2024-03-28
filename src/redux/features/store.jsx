import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";
import NoteSlice from "./noteSlice";

export default configureStore({
  reducer: {
    user: UserSlice,
    notes: NoteSlice,
  },
});

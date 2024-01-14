import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";

export default configureStore({
  reducer: {
    user: UserSlice,
    // notes: NoteSlice,
  },
});

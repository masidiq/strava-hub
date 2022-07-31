import { configureStore } from "@reduxjs/toolkit";

import athleteStore from "./athleteStore";
export default configureStore({
  reducer: {
    athlete: athleteStore,
  },
});

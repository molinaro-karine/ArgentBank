import { configureStore } from "@reduxjs/toolkit";
import sliceUser from "../features/User/sliceUser";

export const store = configureStore({
  reducer: {
    user: sliceUser,
  },
});

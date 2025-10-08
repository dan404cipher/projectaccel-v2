import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import projectReducer from "./project/projectSlice";
import issueReducer from "./issue/issueSlice";
import teamReducer from "./team/teamSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    issue: issueReducer,
    team: teamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resumeFile: null, // Store file here
  jobDescription: ""
};

const userInputSlice = createSlice({
  name: "userInput",
  initialState,
  reducers: {
    setResumeFile: (state, action) => {
      state.resumeFile = action.payload;
    },
    setJobDescription: (state, action) => {
      state.jobDescription = action.payload;
    },
    resetInputs: (state) => {
      state.resumeFile = null;
      state.jobDescription = "";
    },
  },
});

export const { setResumeFile, setJobDescription, resetInputs } = userInputSlice.actions;
export default userInputSlice.reducer;

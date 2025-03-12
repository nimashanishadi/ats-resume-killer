// userInputSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resumeFileName: "",
  jobDescription: "",
  extractedResumeText: "", // Store the extracted resume text
  scannedJobDescription: "", // Store the job description sent back from the backend
};

const userInputSlice = createSlice({
  name: "userInput",
  initialState,
  reducers: {
    setResumeFile: (state, action) => {
      state.resumeFileName = action.payload;
    },
    setJobDescription: (state, action) => {
      state.jobDescription = action.payload;
    },
    setScanResult: (state, action) => {
      state.extractedResumeText = action.payload.resumeText;  // Store extracted text
      state.scannedJobDescription = action.payload.jobDescription;  // Store scanned job description
    },
    resetInputs: (state) => {
      state.resumeFileName = "";
      state.jobDescription = "";
      state.extractedResumeText = "";
      state.scannedJobDescription = "";
    },
  },
});

export const { setResumeFile, setJobDescription, setScanResult, resetInputs } = userInputSlice.actions;
export default userInputSlice.reducer;

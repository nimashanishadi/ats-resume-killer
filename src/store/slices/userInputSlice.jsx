// userInputSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resumeFileName: "",
  jobDescription: "",
  extractedResumeText: "", // Store the extracted resume text
  scannedJobDescription: "", // Store the job description sent back from the backend
  keywordsjd: [],
  wordcount: 0,
  address: "",
  noofHardskillsre: 0,
  softskillsjd: [],
  linkedin: "",
  name: "",
  overallScore: "",
  structure: "",
  matchingjdre: [],
  noofHardskillsjd: 0,
  softskillsre: [],
  hardskillsjd: [],
  noofSoftskillsjd: 0,
  phone: "",
  hardskillsre: [],
  missingKeywords: [],
  keywordsre: [],
  noofSoftskillsre: 0,
  email: ""
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
      Object.assign(state, action.payload); // Merge all fields into state
    },
    resetInputs: (state) => {
      Object.assign(state, initialState); // Reset to initial state
    },
  },
});

export const { setResumeFile, setJobDescription, setScanResult, resetInputs } = userInputSlice.actions;
export default userInputSlice.reducer;

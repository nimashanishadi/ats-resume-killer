import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resume: "",
  jobDescription: "",
};

const userInputSlice = createSlice({
  name: "userInput",
  initialState,
  reducers: {
    setResume: (state, action) => {
      state.resume = action.payload;
    },
    setJobDescription: (state, action) => {
      state.jobDescription = action.payload;
    },
    resetInputs: (state) => {
      state.resume = "";
      state.jobDescription = "";
    },
  },
});

export const { setResume, setJobDescription, resetInputs } = userInputSlice.actions;
export default userInputSlice.reducer;

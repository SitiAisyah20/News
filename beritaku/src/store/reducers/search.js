import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  searchResults: [],
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSearchResults, setError } = searchSlice.actions;

export default searchSlice.reducer;

const apiKey = "5d36da2933504ce6b6b2d37afa6fdfd7";

export const searchNews = (query) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
    );
    dispatch(setSearchResults(response.data.articles));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      error(error.response.data.message);
      return;
    }
    error(error.message);
  }
};

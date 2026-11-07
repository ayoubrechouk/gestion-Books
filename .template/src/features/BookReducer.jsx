import { createSlice } from "@reduxjs/toolkit";
import { initialBooks } from "../data/books";

const booksSlice = createSlice({
  name: "books",
  initialState: initialBooks.map((book) => ({
    ...book,
    liked: false,
    inReadingList: false,
  })),
  reducers: {
    toggleLike(state, action) {
      const book = state.find((item) => item.id === action.payload);
      if (book) book.liked = !book.liked;
    },
    toggleReadingList(state, action) {
      const book = state.find((item) => item.id === action.payload);
      if (book) book.inReadingList = !book.inReadingList;
    },
    removeBook(state, action) {
      return state.filter((book) => book.id !== action.payload);
    },
  },
});

export const { toggleLike, toggleReadingList, removeBook } = booksSlice.actions;
export default booksSlice.reducer;

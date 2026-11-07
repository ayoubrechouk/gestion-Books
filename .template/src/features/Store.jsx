import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./BookReducer";

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export default store;

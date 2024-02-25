import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import authorsReducer from "../features/authors/authorsSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        authors: authorsReducer
    }
})
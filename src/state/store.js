import { configureStore  } from "@reduxjs/toolkit"
import { moviesSlice } from "./actions/movies"

export const store = configureStore({
    reducer: {
        movies: moviesSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
    }),
})
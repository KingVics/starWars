import { createSlice } from "@reduxjs/toolkit";
import {GetMovies, GetCraws, GetCharacters} from "../actionsCreator/actionCreator";

export const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        movies: [],
        sortTitle: 'earliest to newest',
        dropdownValue: "Select a movie",
        defaultCharactersSort: 'Ascending',
        craw: null,
        Characters: [],
        checkboxValue: '',
        calcHeight: []
    },
    reducers: {
        sortMovies (state, action) {
            const sorted = state.movies.sort((a, b) => {
                return  new Date(b.release_date) - new Date(a.release_date) 
            })
            state.movies = sorted
            state.sortTitle = 'newest to earliest'
        },
        sortMoviesNewest (state, action) {
            const sorted = state.movies.sort((a, b) => {
                return new Date(a.release_date) - new Date(b.release_date) 
            })
            state.movies = sorted
            state.sortTitle = 'earliest to newest'
        },
        sortCharactersDescend (state, action) {
            console.log('desc')
            const sortedCharacter = state.Characters.sort(function (a, b) {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            });

            state.Characters = sortedCharacter
            // state.defaultCharactersSort = "Ascending"
        },
        sortCharactersAscend (state, action) {
            console.log('ascending')
            const sortedCharacter = state.Characters.sort(function (a, b) {
                if (b.name > a.name ) {
                    return -1;
                }
                if (a.name >b.name) {
                    return 1;
                }
                return 0;
            });

            state.Characters = sortedCharacter
            // state.defaultCharactersSort = "Descending"
        },
        ToggleSortCha (state, action) {
            if(state.defaultCharactersSort === 'Ascending') {
                state.defaultCharactersSort = 'Descending'
            } else {
                state.defaultCharactersSort = 'Ascending'
            }
        },
        setCheckboxValue (state, action) {
            state.checkboxValue = action.payload
            const filtered = state.Characters.filter((x) => x.gender === state.checkboxValue)
            state.Characters = filtered
        },
        filterbyGender (state, action) {
            const filtered = state.Characters.filter((x) => x.gender === state.checkboxValue)
            state.Characters = filtered
        },
        setCalcHeight (state, action) {
            state.calcHeight = [...state.calcHeight, action.payload]
            console.log(action.payload)
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(GetMovies.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(GetMovies.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.movies = action.payload
        })
        .addCase(GetMovies.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(GetCraws.pending, (state, action) => {
            state.gettingcraw = 'loading'
        })
        .addCase(GetCraws.fulfilled, (state, action) => {
            state.gettingcraw = 'succeeded'
            state.craw = action.payload
        })
        .addCase(GetCraws.rejected, (state, action) => {
            state.gettingcraw = 'failed'
            state.error = action.error.message
        })
        .addCase(GetCharacters.pending, (state, action) => {
            state.gettingcharacters = 'loading'
            state.Characters = []
        })
        .addCase(GetCharacters.fulfilled, (state, action) => {
            state.gettingcharacters = 'succeeded'
            state.Characters = [...state.Characters, action.payload]
        })
        .addCase(GetCharacters.rejected, (state, action) => {
            state.gettingcharacters = 'failed'
            state.error = action.error.message
        })

    }
});

export const { setCalcHeight,sortMovies, sortMoviesNewest, sortCharactersDescend, sortCharactersAscend, ToggleSortCha, setCheckboxValue, filterbyGender} = moviesSlice.actions

export default moviesSlice.reducer;

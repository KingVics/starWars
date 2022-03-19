import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BaseURL = 'https://swapi.dev/api'
const url = 'films/'

export const GetMovies = createAsyncThunk("movies/getMovies", async () => {
    const response = await axios.get(`${BaseURL}/${url}`)
    return response.data.results;
});

export const GetCraws = createAsyncThunk("movies/getCraws", async (id) => {
    const response = await axios.get(`${BaseURL}/${url}/${id}`)
    return response.data;
})

export const GetCharacters = createAsyncThunk("movies/getCharacters", async (id) => {
    const response = await axios.get(`https://swapi.dev/api/people/${id}`)
    return response.data;
})

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchComicsList = createAsyncThunk('charComicsDb/fetchComicsList', async (params) => {
  const { offset } = params;
  const res = await axios.get(
    `https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=${offset}&apikey=537ee451b8fd1f8d64eeb59fd0a2eb43`,
  );
  return res.data.data.results;
});

const initialState = {
  comicsList: [],
  status: 'loading',
  comicId: 0,
  offset: 0,
};

export const comicsListSlice = createSlice({
  name: 'charComicsDb',
  initialState,
  reducers: {
    // clearCharList: (state, action) => {
    //   state.charList = [];
    // },
    addOffsetComics: (state, action) => {
      state.offset += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComicsList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComicsList.fulfilled, (state, action) => {
        // state.charList = [...state.charList, ...action.payload]; //не используем мутацию
        state.comicsList.push(...action.payload);
        state.status = 'success';
      })
      .addCase(fetchComicsList.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { clearCharList, addOffsetComics } = comicsListSlice.actions;

export default comicsListSlice.reducer;

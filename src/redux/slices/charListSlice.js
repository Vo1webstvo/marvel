import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCharList = createAsyncThunk('charListDb/fetchCharList', async (params) => {
  const { offset } = params;
  const res = await axios.get(
    `https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&apikey=c5d6fc8b83116d92ed468ce36bac6c62`,
  );
  return res.data.data.results;
});

const initialState = {
  charList: [],
  status: 'loading',
  charId: 0,
  offset: 210,
};

export const charListSlice = createSlice({
  name: 'charListDb',
  initialState,
  reducers: {
    clearCharList: (state, action) => {
      state.charList = [];
    },
    addOffset: (state, action) => {
      state.offset += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharList.fulfilled, (state, action) => {
        // state.charList = [...state.charList, ...action.payload]; //не используем мутацию
        state.charList.push(...action.payload);
        state.status = 'success';
      })
      .addCase(fetchCharList.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { clearCharList, addOffset } = charListSlice.actions;

export default charListSlice.reducer;

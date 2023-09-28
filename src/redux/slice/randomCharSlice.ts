import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { transformCharacter } from './../../utils/transformResponse';
import { IResult } from '../../type/iOneChar';

export const fetcRandomhUserById = createAsyncThunk(
  'randomChar/fetcRandomhUserById',
  async (id: number) => {
    const res = await axios.get(
      `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=537ee451b8fd1f8d64eeb59fd0a2eb43`,
    );
    return transformCharacter(res.data.data.results[0]) as IResult; //createAsyncThunk добавляет доп поле data. пока не буду убирать, так как основные запросы через RTK Query и все интерфейсы для Rtk Query
  },
);

interface ICharRandom {
  charRandom: null | IResult;
  status: 'loading' | 'succes' | 'error';
  idChar: null | number;
}

const initialState: ICharRandom = {
  charRandom: null,
  status: 'loading',
  idChar: 0,
};

export const randomCharSlice = createSlice({
  name: 'randomChar',
  initialState,
  reducers: {
    getIdComics: (state, action) => {
      state.idChar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetcRandomhUserById.pending, (state) => {
      state.status = 'loading';
    }),
      builder.addCase(fetcRandomhUserById.fulfilled, (state, action) => {
        state.status = 'succes';
        if (typeof action.payload === 'object') {
          state.charRandom = action.payload;
        }
      }),
      builder.addCase(fetcRandomhUserById.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { getIdComics } = randomCharSlice.actions;

export default randomCharSlice.reducer;

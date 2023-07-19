import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCharId = createAsyncThunk('charDb/fetchCharId', async (params) => {
  const { id } = params;
  const res = await axios.get(
    `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=c5d6fc8b83116d92ed468ce36bac6c62`,
  );
  return res.data.data.results[0];
});

const initialState = {
  oneChar: {},
  status: 'loading',
};

export const charSlices = createSlice({
  name: 'charDb',
  initialState,
  reducers: {
    // getCharId:(state, action) => {
    //     state.oneChar = action.payload;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharId.fulfilled, (state, action) => {
        state.status = 'success';
        state.oneChar = action.payload;
      })
      .addCase(fetchCharId.rejected, (state) => {
        state.status = 'error';
      });
  },
});

// export const {getCharId} = charSlices.actions;

export default charSlices.reducer;

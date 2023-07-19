import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCharForClick = createAsyncThunk(
  'charForClick/fetchCharForClick',
  async (params) => {
    const { id } = params;
    const res = await axios.get(
      `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=c5d6fc8b83116d92ed468ce36bac6c62`,
    );
    return res.data.data.results[0];
  },
);

const initialState = {
  char: {},
  status: 'loading',
};

export const charForClickSlice = createSlice({
  name: 'charForClick',
  initialState,
  reducers: {
    // getCharId:(state, action) => {
    //     state.oneChar = action.payload;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharForClick.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharForClick.fulfilled, (state, action) => {
        state.status = 'success';
        state.char = action.payload;
      })
      .addCase(fetchCharForClick.rejected, (state) => {
        state.status = 'error';
      });
  },
});

// export const {getCharId} = charSlices.actions;

export default charForClickSlice.reducer;

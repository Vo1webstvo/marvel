import { configureStore } from '@reduxjs/toolkit';
import charSlices from './slices/charSlices';
import charListSlice from './slices/charListSlice';
import ClickCharSlice from './slices/clickCharSlice';
import comicsListSlice from './slices/comicsListSlice';

export const store = configureStore({
  reducer: {
    charDb: charSlices,
    charListDb: charListSlice,
    charClick: ClickCharSlice,
    comics: comicsListSlice,
  },
});

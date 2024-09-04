import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  isCharacterListQuery: boolean;
};

const initialState: InitialState = {
  isCharacterListQuery: true,
};

const characterListSlice = createSlice({
  name: 'characterList',
  initialState,
  reducers: {
    setCharacterListQuery: (state, action: PayloadAction<boolean>) => {
      state.isCharacterListQuery = action.payload;
    },
  },
});

export const { setCharacterListQuery } = characterListSlice.actions;
export const characterListReducer = characterListSlice.reducer;
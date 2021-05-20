import { createSlice } from '@reduxjs/toolkit';

export interface ClientState {
  // TODO: write interface
}

const initialState: ClientState = {
  // TODO: write initial state
};

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    // TODO: write reducers
  },
  // TODO: write extraReducers for asyncs
});

// ACTIONS
// TODO: assign actions

// THUNKS
// TODO: write async functions

// SELECTORS
// TODO: write selectors

export default clientSlice.reducer;

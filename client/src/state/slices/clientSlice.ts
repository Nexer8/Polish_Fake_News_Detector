import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'state/store';
import axios from 'axios';

// export enum Status {
//   IDLE = 'idle',
//   LOADING = 'loading',
//   SUCCEEDED = 'succeeded',
//   FAILED = 'succeeded',
// }

interface Respone {
  statement: string;
  verdict: boolean;
  probability: number;
}

export interface ClientState {
  status: 'idle' | 'loading' | 'failed';
  statement: string;
  verdict: boolean;
  probability: number;
  id: string;
}

const initialState: ClientState = {
  status: 'idle',
  statement: '',
  verdict: false,
  probability: 0,
  id: '',
};

// THUNKS
export const verifyStatement = createAsyncThunk(
  'client/verifyStatement',
  async (statement: string) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:3001/api/client/verify',
        {
          statement,
        },
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  },
);

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    statementVerified(state, action: PayloadAction<string>) {
      state.statement = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyStatement.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyStatement.fulfilled, (state, action) => {
        state.status = 'idle';
        state.statement = action.payload.statement;
        state.verdict = action.payload.verdict;
        state.probability = action.payload.probability;
        state.id = action.payload.id;
      });
  },
});

// SELECTORS
// TODO: write selectors

export default clientSlice.reducer;

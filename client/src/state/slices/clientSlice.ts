import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from 'state/store';
import { VerdictType } from 'components/StatementEvaluation';

export interface ClientState {
  status: 'idle' | 'loading' | 'failed' | 'success';
  statement: string;
  verdict: VerdictType;
  probability: number;
  id: string;
}

const initialState: ClientState = {
  status: 'idle',
  statement: '',
  verdict: VerdictType.FAKE,
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

export const getResult = createAsyncThunk(
  'client/getResult',
  async (id: string) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3001/api/client/result/${id}`,
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
    statementRedirected(state, action: PayloadAction<string>) {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyStatement.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyStatement.fulfilled, (state, action) => {
        state.status = 'success';
        state.statement = action.payload.statement;
        state.verdict =
          action.payload.verdict === 'true'
            ? VerdictType.TRUTH
            : VerdictType.FAKE;
        state.probability = action.payload.probability;
        state.id = action.payload._id;
      })
      .addCase(getResult.fulfilled, (state, action) => {
        state.statement = action.payload.statement;
        state.verdict =
          action.payload.verdict === 'true'
            ? VerdictType.TRUTH
            : VerdictType.FAKE;
        state.probability = action.payload.probability;
      });
  },
});

// SELECTORS
export const selectStatus = (state: RootState) => state.client.status;
export const selectId = (state: RootState) => state.client.id;
export const selectClient = (state: RootState) => state.client;

export const { statementRedirected } = clientSlice.actions;
export default clientSlice.reducer;

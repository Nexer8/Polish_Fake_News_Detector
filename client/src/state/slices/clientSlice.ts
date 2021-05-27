import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';

import { RootState } from 'state/store';
import { AlertType, IAlert } from 'components/Alerts/Alert';
import { IResult } from 'models/Result';
import Routes from 'routes';

export interface ClientState {
  status: 'idle' | 'loading' | 'failed' | 'success';
  result: IResult | null;
}

const initialState: ClientState = {
  status: 'idle',
  result: null,
};

// THUNKS
export const verifyStatement = createAsyncThunk(
  'client/verifyStatement',
  async (statement: string) => {
    try {
      const response = await axios.post('/api/client/verify', {
        statement,
      });
      const { _id } = response.data;
      window.location.href = Routes.result.replace(':id', _id);
      return {
        result: {
          id: _id,
          ...response.data,
        },
      };
    } catch (err) {
      return {
        result: null,
        alert: {
          id: _.uniqueId(),
          message: 'Nie udało się zweryfikować wypowiedzi',
          type: AlertType.ERROR,
        } as IAlert,
      };
    }
  },
);

export const getResult = createAsyncThunk(
  'client/getResult',
  async (id: string) => {
    try {
      const response = await axios.get(`/api/client/result/${id}`);
      const { _id } = response.data;

      return {
        result: {
          id: _id,
          ...response.data,
        },
      };
    } catch (err) {
      return {
        result: null,
        alert: {
          id: _.uniqueId(),
          message: 'Nie znaleziono wypowiedzi',
          type: AlertType.ERROR,
        } as IAlert,
      };
    }
  },
);

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyStatement.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyStatement.fulfilled, (state, action) => {
        state.status = 'success';
        state.result = action.payload.result;
      });

    builder.addCase(getResult.fulfilled, (state, action) => {
      state.result = action.payload.result;
    });
  },
});

// SELECTORS
export const selectClientStatus = (state: RootState) => state.client.status;
export const selectId = (state: RootState) => state.client.result?.id;
export const selectResult = (state: RootState) => state.client.result;

export default clientSlice.reducer;

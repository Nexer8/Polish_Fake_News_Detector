import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';

import { RootState } from 'state/store';
import { AlertType, IAlert } from 'components/Alerts/Alert';
import { IResult } from 'models/Result';
import { IReport } from 'models/Report';
import Routes from 'routes';

export interface ClientState {
  status: 'idle' | 'loading' | 'failed';
  result: IResult | null;
}

const initialState: ClientState = {
  status: 'idle',
  result: null,
};

// THUNKS
export const verifyStatement = createAsyncThunk(
  'client/verifyStatement',
  async (data: { statement: string; history: any }) => {
    try {
      const { history, statement } = data;
      const response = await axios.post('/api/client/verify', {
        statement,
      });
      const { _id } = response.data;

      history.push(Routes.result.replace(':id', _id));

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

export const sendReport = createAsyncThunk(
  'client/sendReport',
  async (data: { report: IReport; history: any }) => {
    const { id, reporter, comment, politician, date, category } = data.report;
    try {
      await axios.post(`/api/client/report/${id}`, {
        reporter,
        comment,
        politician,
        date,
        category,
      });

      data.history.push(Routes.result.replace(':id', id));

      return {
        success: true,
        alert: {
          id: _.uniqueId(),
          message: 'Wysłano zgłoszenie!',
        } as IAlert,
      };
    } catch (err) {
      return {
        success: false,
        alert: {
          id: _.uniqueId(),
          message: 'Wystąpił błąd przy wysyłaniu zgłoszenia!',
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
        state.status = 'idle';
        state.result = action.payload.result;
      });

    builder
      .addCase(getResult.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getResult.fulfilled, (state, action) => {
        state.status = 'idle';
        state.result = action.payload.result;
      });

    builder
      .addCase(sendReport.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendReport.fulfilled, (state) => {
        state.status = 'idle';
      });
  },
});

// SELECTORS
export const selectClientStatus = (state: RootState) => state.client.status;
export const selectId = (state: RootState) => state.client.result?.id;
export const selectResult = (state: RootState) => state.client.result;

export default clientSlice.reducer;

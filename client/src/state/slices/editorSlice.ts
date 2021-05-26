import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

import Routes from 'routes';
import { RootState } from 'state/store';
import { IReport } from 'models/Report';
import {
  fetchReportAPI,
  fetchReportsAPI,
  loginAPI,
  reviewAPI,
} from 'state/api/editorAPI';
import { VerdictType } from 'components/StatementEvaluation';
import { AlertType, IAlert } from 'components/Alerts/Alert';

export interface EditorState {
  reports: IReport[];
  currentReport: IReport | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: EditorState = {
  reports: [],
  currentReport: null,
  status: 'idle',
};

export const loginAsync = createAsyncThunk(
  'editor/login',
  async (data: { email: string; password: string }) => {
    try {
      await loginAPI(data.email, data.password);

      window.location.href = Routes.editorReports;

      return {
        alert: {
          id: _.uniqueId(),
          message: 'Logged in!',
        } as IAlert,
      };
    } catch (e) {
      return {
        alert: {
          id: _.uniqueId(),
          message: 'Wrong credentials!',
          type: AlertType.ERROR,
        } as IAlert,
      };
    }
  },
);

export const reviewAsync = createAsyncThunk(
  'editor/review',
  async (data: { reportId: string; comment: string; verdict: VerdictType }) => {
    try {
      await reviewAPI(data.reportId, data.comment, data.verdict);

      return {
        alert: {
          id: _.uniqueId(),
          message: 'Review sent!',
        } as IAlert,
      };
    } catch (e) {
      return {
        alert: {
          id: _.uniqueId(),
          message: 'Error while sending the review!',
          type: AlertType.ERROR,
        } as IAlert,
      };
    }
  },
);

export const fetchReportAsync = createAsyncThunk(
  'editor/fetchReport',
  async (reportId: string) => {
    try {
      const response = await fetchReportAPI(reportId);

      const { _id } = response.data;

      return {
        report: {
          id: _id,
          ...response.data,
        },
      };
    } catch (e) {
      return {
        report: null,
        alert: {
          id: _.uniqueId(),
          message: 'Error while fetching the report!',
          type: AlertType.ERROR,
        } as IAlert,
      };
    }
  },
);

export const fetchReportsAsync = createAsyncThunk(
  'editor/fetchReports',
  async (data: {
    category: string;
    politician: string;
    dateFrom: string;
    dateTo: string;
  }) => {
    try {
      const response = await fetchReportsAPI(
        data.category,
        data.politician,
        data.dateFrom,
        data.dateTo,
      );

      const reports = response.data;

      return {
        alert: {
          id: _.uniqueId(),
          message: 'Reports list updated.',
        } as IAlert,
        reports: reports.map((report: { _id: string }) => ({
          id: report._id,
          ...report,
        })),
      };
    } catch (e) {
      return {
        reports: [],
        alert: {
          id: _.uniqueId(),
          message: 'Error while fetching the reports!',
          type: AlertType.ERROR,
        } as IAlert,
      };
    }
  },
);

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    chooseReport: (state, action: PayloadAction<IReport>) => {
      state.currentReport = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state) => {
        state.status = 'idle';
      });

    builder
      .addCase(reviewAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(reviewAsync.fulfilled, (state) => {
        state.status = 'idle';
        console.log('reviewed');
      });

    builder
      .addCase(fetchReportsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReportsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.reports = action.payload.reports;
      });

    builder
      .addCase(fetchReportAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReportAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.currentReport = action.payload.report;
      });
  },
});

// ACTIONS
export const { chooseReport } = editorSlice.actions;

// SELECTORS
export const selectReports = (state: RootState) => state.editor.reports;
export const selectCurrentReport = (state: RootState) =>
  state.editor.currentReport;
export const selectEditorStatus = (state: RootState) => state.editor.status;

export default editorSlice.reducer;

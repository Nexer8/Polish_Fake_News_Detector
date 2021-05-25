import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'state/store';
import { IReport } from 'models/Report';
import {
  fetchReportAPI,
  fetchReportsAPI,
  loginAPI,
  reviewAPI,
} from 'state/api/editorAPI';
import { VerdictType } from 'components/StatementEvaluation';

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
    const response = await loginAPI(data.email, data.password);

    return response.data;
  },
);

export const reviewAsync = createAsyncThunk(
  'editor/review',
  async (data: { reportId: string; comment: string; verdict: VerdictType }) => {
    const response = await reviewAPI(data.reportId, data.comment, data.verdict);

    return response.data;
  },
);

export const fetchReportAsync = createAsyncThunk(
  'editor/fetchReport',
  async (reportId: string) => {
    const response = await fetchReportAPI(reportId);

    const { _id } = response.data;

    return {
      id: _id,
      ...response.data,
    };
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
    const response = await fetchReportsAPI(
      data.category,
      data.politician,
      data.dateFrom,
      data.dateTo,
    );

    const reports = response.data;

    return reports.map((report: { _id: string }) => ({
      id: report._id,
      ...report,
    }));
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
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // state.reports = action.payload;
        console.log('logged in');
      });

    builder
      .addCase(reviewAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(reviewAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // state.reports = action.payload;
        console.log('reviewed');
      });

    builder
      .addCase(fetchReportsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReportsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.reports = action.payload;
      });

    builder
      .addCase(fetchReportAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReportAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.currentReport = action.payload;
      });
  },
});

// ACTIONS
export const { chooseReport } = editorSlice.actions;

// SELECTORS
export const selectReports = (state: RootState) => state.editor.reports;
export const selectCurrentReport = (state: RootState) =>
  state.editor.currentReport;

export default editorSlice.reducer;

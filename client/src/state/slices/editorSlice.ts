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
  checkSessionAPI,
  logoutAPI,
} from 'state/api/editorAPI';
import { VerdictType } from 'components/StatementEvaluation';
import { AlertType, IAlert } from 'components/Alerts/Alert';

export interface EditorState {
  isLoggedIn: boolean;
  reports: IReport[];
  currentReport: IReport | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: EditorState = {
  isLoggedIn: false,
  reports: [],
  currentReport: null,
  status: 'idle',
};

export const checkSessionAsync = createAsyncThunk(
  'editor/session',
  async () => {
    try {
      await checkSessionAPI();

      return {
        success: true,
      };
    } catch (e) {
      return {
        success: false,
      };
    }
  },
);

export const logoutAsync = createAsyncThunk('editor/logout', async () => {
  try {
    await logoutAPI();

    return {
      success: true,
      alert: {
        id: _.uniqueId(),
        message: 'Wylowany!',
      } as IAlert,
    };
  } catch (e) {
    return {
      success: false,
      alert: {
        id: _.uniqueId(),
        message: 'Błąd przy wylogowaniu!',
      } as IAlert,
    };
  }
});

export const loginAsync = createAsyncThunk(
  'editor/login',
  async (data: { email: string; password: string; history: any }) => {
    try {
      await loginAPI(data.email, data.password);

      data.history.push(Routes.editorReports);

      return {
        success: true,
        alert: {
          id: _.uniqueId(),
          message: 'Zalogowano!',
        } as IAlert,
      };
    } catch (e) {
      return {
        success: false,
        alert: {
          id: _.uniqueId(),
          message: 'Zły login lub hasło',
          type: AlertType.ERROR,
        } as IAlert,
      };
    }
  },
);

export const reviewAsync = createAsyncThunk(
  'editor/review',
  async (data: {
    reportId: string;
    comment: string;
    verdict: VerdictType;
    history: any;
  }) => {
    try {
      await reviewAPI(data.reportId, data.comment, data.verdict);

      data.history.push(Routes.editorReports);

      return {
        alert: {
          id: _.uniqueId(),
          message: 'Recenzja wysłana!',
        } as IAlert,
      };
    } catch (e) {
      return {
        alert: {
          id: _.uniqueId(),
          message: 'Błąd przy wysyłaniu recenzji!',
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
          message: 'Błąd przy pobieraniu zgłoszenia!',
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
          message: 'Lista zgłoszeń uaktualniona.',
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
          message: 'Błąd przy pobieraniu zgłoszeń!',
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
    builder.addCase(checkSessionAsync.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.isLoggedIn = true;
      }
    });

    builder
      .addCase(logoutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        if (action.payload.success) {
          state.isLoggedIn = false;
        }
      });

    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        if (action.payload.success) {
          state.isLoggedIn = true;
        }
      });

    builder
      .addCase(reviewAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(reviewAsync.fulfilled, (state) => {
        state.status = 'idle';
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
export const selectEditorLoggedIn = (state: RootState) =>
  state.editor.isLoggedIn;

export default editorSlice.reducer;

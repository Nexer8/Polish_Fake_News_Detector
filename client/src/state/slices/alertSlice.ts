import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAlert } from 'components/Alerts/Alert';
import { RootState } from 'state/store';

export interface AlertState {
  alerts: IAlert[];
}

const initialState: AlertState = {
  alerts: [],
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<IAlert>) => {
      state.alerts.push(action.payload);
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(
        (alert) => alert.id !== action.payload,
      );
    },
    clearAlerts: (state) => {
      state.alerts = [];
    },
  },
});

// ACTIONS
export const { addAlert, removeAlert, clearAlerts } = alertSlice.actions;

// SELECTORS
export const selectAlerts = (state: RootState) => state.alert.alerts;

export default alertSlice.reducer;

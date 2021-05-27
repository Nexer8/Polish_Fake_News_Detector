import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import clientReducer from 'state/slices/clientSlice';
import editorReducer from 'state/slices/editorSlice';
import alertReducer from 'state/slices/alertSlice';
import alertMiddleware from './middlewares/alertMiddleware';

export const store = configureStore({
  reducer: {
    client: clientReducer,
    editor: editorReducer,
    alert: alertReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(alertMiddleware),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

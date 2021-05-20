import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import clientReducer from 'state/slices/clientSlice';
import editorReducer from 'state/slices/editorSlice';

export const store = configureStore({
  reducer: {
    client: clientReducer,
    editor: editorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

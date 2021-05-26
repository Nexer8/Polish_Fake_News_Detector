import { IAlert } from 'components/Alerts/Alert';
import { addAlert } from 'state/slices/alertSlice';

const alertMiddleware = (storeAPI: {
  dispatch: (arg0: { payload: IAlert; type: string }) => void;
}) => (next: any) => (action: any) => {
  if (action.payload?.alert) {
    storeAPI.dispatch(addAlert(action.payload.alert));
  }

  return next(action);
};

export default alertMiddleware;

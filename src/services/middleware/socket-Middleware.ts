import { saveAllOrdersActionCreater } from '../actions/orders';
import { closeWsConnectionActionCreator, 
         openWsConnectionActionCreator,
         errorWsConnectionActionCreator } from '../actions/socket-Middleware';
import { TAllActions } from '../actions/unionIfActions';
import { Middleware } from 'redux';
import { TRootState } from '../reducers/index';

type TWsActions = {
  start: "WS_CONNECTION_START";
  success: "WS_CONNECTION_SUCCESS";
  closed: "WS_CONNECTION_CLOSED";
  break: "WS_CONNECTION_BREAK";
  error: "WS_CONNECTION_ERROR";
  onMessage: "SAVE_ALL_ORDERS";
};
export const socketMiddleware = (wsActions: TWsActions): Middleware<{}, TRootState> => 
  store => next => (action: TAllActions) => {
  const actionType = action.type;
  const wsUrl = actionType === "WS_CONNECTION_START" && action.payload && action.payload.wsUrl;
  const fieldName = actionType === "WS_CONNECTION_START" && action.payload && 
    action.payload.fieldName;
  const { dispatch } = store;
  let socket: WebSocket | undefined;
  if ( actionType === wsActions.start && wsUrl) {
    socket = new WebSocket(wsUrl);
    dispatch({type: wsActions.start});
  }
  if ( actionType === wsActions.break) {
    const socket = store.getState().wsConnect.socket;
    socket && socket.close(1000, 'The page is closed');
  }
  if (socket) {
    socket.onopen = (e) => {
      dispatch(openWsConnectionActionCreator (e.currentTarget as WebSocket | null));
    };
    socket.onclose = (e) => {
      dispatch(closeWsConnectionActionCreator());
    };
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      fieldName && dispatch(saveAllOrdersActionCreater(wsActions.onMessage, fieldName, data));
    };
    socket.onerror = (e) => {
      dispatch(errorWsConnectionActionCreator(e));
    }
  }
  return next(action);
}
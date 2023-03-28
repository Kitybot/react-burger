import { wsBaseUrl, getCookie } from '../../utils/utils';
import { wsActions } from '../../index';

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_BREAK: 'WS_CONNECTION_BREAK' = 'WS_CONNECTION_BREAK';

export interface ISocketStartFeedAndHistoryActions {
  readonly type: 'WS_CONNECTION_START';
  readonly payload: {[name: string]: string}
}
export function socketStartFeedActionCreator (): ISocketStartFeedAndHistoryActions {
  return {
    type: WS_CONNECTION_START,
    payload: {wsUrl: `${wsBaseUrl}/all`, fieldName: 'allOrders'}
  }
}

export interface IBreakWsConnectionAction {
  readonly type: 'WS_CONNECTION_BREAK';
}
export function breakWsConnectionActionCreator (): IBreakWsConnectionAction {
  return {
    type: WS_CONNECTION_BREAK
  }
}

export function socketStartHistoryActionCreator (): ISocketStartFeedAndHistoryActions {
  const accessToken = getCookie('accessToken');
  return {
    type: WS_CONNECTION_START,
    payload: {wsUrl: `${wsBaseUrl}?token=${accessToken}`, fieldName: 'userOrders'}
  }
}

export interface ICloseWsConnectionAction {
  type: 'WS_CONNECTION_CLOSED';
}
export function closeWsConnectionActionCreator (): ICloseWsConnectionAction {
  return { type: wsActions.closed }
}

export interface IOpenWsConnectionAction {
  type: 'WS_CONNECTION_SUCCESS';
  socket: WebSocket | null;
}
export function openWsConnectionActionCreator (WsSocket: WebSocket | null)
  : IOpenWsConnectionAction {
  return { type: wsActions.success, socket: WsSocket}
}

export interface IErrorWsConnectionAction {
  type: 'WS_CONNECTION_ERROR';
  payload: Event;
}
export function errorWsConnectionActionCreator (e: Event): IErrorWsConnectionAction {
  return {type: wsActions.error, payload: e}
}
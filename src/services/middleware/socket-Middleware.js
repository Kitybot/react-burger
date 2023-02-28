export const socketMiddleware = wsActions => store => next => action => {
    const actionType = action.type;
    const wsUrl = action.payload && action.payload.wsUrl;
    const fieldName = action.payload && action.payload.fieldName;
    const { dispatch } = store;
    let socket;
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
        dispatch({ type: wsActions.success, socket: e.currentTarget});
      };
      socket.onclose = (e) => {
        dispatch({ type: wsActions.closed });
      };
      socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        dispatch({ type: wsActions.onMessage, fieldName, data});
      };
      socket.onerror = (e) => {
        console.log(e);
        dispatch({type: wsActions.error, payload: e})
      }
    }
    return next(action);
  }
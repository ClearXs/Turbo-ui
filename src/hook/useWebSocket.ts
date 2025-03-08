const useWebSocket = (url: string) => {
  const websocket = new WebSocket(url);

  return websocket;
};

export default useWebSocket;

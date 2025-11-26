const useWalletConnector = (connectorHook: any, config: any) => {
  const {
    address,
    connect,
    disconnect,
    isConnected,
    signMessage,
    signTransaction,
    signAllTransactions,
    signAndSendTransaction,
  } = connectorHook(config);

  return {
    address,
    connect,
    disconnect,
    isConnected,
    signMessage,
    signTransaction,
    signAllTransactions,
    signAndSendTransaction,
  };
};

export default useWalletConnector;

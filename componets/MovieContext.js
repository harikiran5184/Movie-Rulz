// componets/MovieContext.js
import React, { createContext, useContext, useState } from 'react';

const RefreshContext = createContext();

export function useRefresh() {
  return useContext(RefreshContext);
}

export function RefreshProvider({ children }) {
  const [forRefresh, setRefresh] = useState(0);

  return (
    <RefreshContext.Provider value={{ forRefresh, setRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
}

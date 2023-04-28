import React, { createContext } from 'react';

import { authReducer } from './reducers';

const store = createContext(authReducer);
export const useContext = () => {
  return React.useContext<any>(store);
};


export default store;
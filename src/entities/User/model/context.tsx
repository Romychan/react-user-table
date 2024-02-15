import { PropsWithChildren, createContext, useReducer } from 'react';

import { userReducer } from './reducer';
import { UserActionTypes, UserState, UserStoreState } from './types';

const initialState = {
  currentUserId: null,
};

export const UserContext = createContext<UserStoreState | null>(null);

interface IUserContextProviderProps {
  /** Initial value for the context */
  preloadState?: UserState;
}

export const UserContextProvider = ({
  preloadState = initialState,
  children,
}: PropsWithChildren<IUserContextProviderProps>) => {
  const [state, dispatch] = useReducer(userReducer, preloadState);

  const setCurrentUserId = (payload: { id: string | null }) => {
    dispatch({ type: UserActionTypes.SetCurrentUserId, payload });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        setCurrentUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

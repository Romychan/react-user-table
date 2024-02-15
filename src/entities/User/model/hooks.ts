import { useContext } from 'react';

import { UserContext } from './context';

/**
 * A hook to get the user's context
 *
 * @returns Properties and methods of working with user context
 */
export const useUserStore = () => {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error('useUserStore must be used within a UserContextProvider');
  }

  return {
    ...context,
  };
};

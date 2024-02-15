import { UserActionTypes, UserActions, UserState } from './types';

/**
 * A function for controlling the state of the user context
 *
 * @param state State for the context
 * @param action Type of action
 *
 * @returns Updated state
 */
export const userReducer = (
  state: UserState,
  action: UserActions,
): UserState => {
  switch (action.type) {
    case UserActionTypes.SetCurrentUserId:
      return {
        ...state,
        currentUserId: action.payload.id,
      };

    default:
      return state;
  }
};

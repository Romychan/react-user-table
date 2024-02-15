import { v4 as uuidv4 } from 'uuid';

import { ToastActionTypes, ToastActions, ToastState } from '../types';

/**
 * A function for controlling the state of the toast context
 *
 * @param state State for the context
 * @param action Type of action
 *
 * @returns Updated state
 */
export const toastReducer = (
  state: ToastState,
  action: ToastActions,
): ToastState => {
  switch (action.type) {
    case ToastActionTypes.AddToast:
      return {
        ...state,
        toasts: [...state.toasts, { ...action.payload, id: uuidv4() }],
      };

    case ToastActionTypes.DeleteToast:
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload.id),
      };

    default:
      return state;
  }
};

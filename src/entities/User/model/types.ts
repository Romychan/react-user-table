import { z } from 'zod';

import { UserFormSchema, UserSchema } from './schemas';

/** Base type for user */
export type User = z.infer<typeof UserSchema>;

/** Type for validation user form */
export type UserForm = z.infer<typeof UserFormSchema>;

/** Interface with query parameters for the user */
export interface UserQueryParams {
  /** Search for a user by name */
  query: string;
  /** The number of users to skip before returning the results */
  skip: string;
  /** Limit the number of users returned by the query */
  limit: string;
  /** Type of sorting */
  order: 'asc' | 'desc';
  /** The value to be sorted for */
  sort: keyof User;
}

/** The base state interface for the context */
export interface UserState {
  /** ID of the selected current user */
  currentUserId: string | null;
}

/** Interface with properties and methods of working with context */
export interface UserStoreState extends UserState {
  /**
   * Sets the selected ID as the current user ID
   *
   * @param payload ID user. If `null', the current user ID will be reset
   */
  setCurrentUserId: (payload: { id: string | null }) => void;
}

/** An enum containing the different action types */
export enum UserActionTypes {
  SetCurrentUserId = 'SET_CURRENT_USER_ID',
}

/** Type of action to set the selected user */
export interface SetCurrentUserIdAction {
  type: UserActionTypes.SetCurrentUserId;
  payload: {
    id: string | null;
  };
}

/** List of all user type actions */
export type UserActions = SetCurrentUserIdAction;

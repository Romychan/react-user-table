import { $api } from '~/shared/api/axios';

import { getUsersAPIEndpoint } from '../lib/utils';
import { OriginalUsersResponse, UserDTO } from '../api/types';
import { OriginalUsersResponseSchema, UserDTOSchema } from '../model/schemas';
import { User, UserQueryParams } from '../model/types';

/**
 * The function for fetching a list of users from the server
 *
 * @param queryParams Query parameters for the server
 *
 * @returns List of users and additional information
 */
export const fetchUsers = async (queryParams: UserQueryParams) => {
  const response = await $api.get<OriginalUsersResponse>(
    getUsersAPIEndpoint(queryParams),
  );

  return OriginalUsersResponseSchema.parse(response.data);
};

/**
 * The function for fetching the user from the server
 *
 * @param id ID to get the user
 *
 * @returns An object with a user
 */
export const fetchUser = async (id: string) => {
  const response = await $api.get<UserDTO>(`/users/${id}`);

  return UserDTOSchema.parse(response.data);
};

/**
 * The function for creating a user on the server
 *
 * @param newUser New user's data
 *
 * @returns An object with a new user
 */
export const createUser = async (newUser: Omit<User, 'id' | 'image'>) => {
  const response = await $api.post<UserDTO>(`/users`, newUser);

  return UserDTOSchema.parse(response.data);
};

/**
 * The function for deleting a user on the server
 *
 * @param id ID to delete the user
 *
 * @returns An object with a deleted user
 */
export const deleteUser = async (id: string | null) => {
  const response = await $api.delete<UserDTO>(`/users/${id}`);

  return UserDTOSchema.parse(response.data);
};

/**
 * The function for updating a user on the server
 *
 * @param user Updated user data
 *
 * @returns An object with an updated user
 */
export const updateUser = async (user: User) => {
  const response = await $api.put<UserDTO>(`/users/${user.id}`, user);

  return UserDTOSchema.parse(response.data);
};

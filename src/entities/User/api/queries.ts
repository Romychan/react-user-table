import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { useToast } from '~/shared/ui/Toast';

import { mapUser } from '../lib/utils';
import { UserQueryParams } from '../model/types';

import {
  createUser,
  deleteUser,
  fetchUser,
  fetchUsers,
  updateUser,
} from './api';

/**
 * A query hook to get data with a list of users from the server
 *
 * @param queryParams Query parameters for the server
 *
 * @returns The `useQuery` hook to get a list of users from the server
 */
export const useFetchUsers = (queryParams: UserQueryParams) => {
  return useQuery({
    queryKey: ['users-list', queryParams],
    queryFn: () => fetchUsers(queryParams),
    placeholderData: keepPreviousData,
    select: (data) => ({
      ...data,
      users: data.users.map(mapUser),
    }),
  });
};

/**
 * A query hook to get data about a specific user from the server
 *
 * @param id ID to get the user
 *
 * @returns The `useQuery` hook to get a user from the server
 */
export const useFetchUser = (id: string | null) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id as string),
    enabled: !!id,
    select: (data) => mapUser(data),
  });
};

/**
 * A mutation hook to create user on the server
 *
 * @returns The `useMutation` hook for adding a new user to the server
 */
export const useCreateUser = () => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users-list'] });
      addToast({ title: 'The user has been added', type: 'success' });
    },
    onError: () =>
      addToast({
        title: 'An error occurred while adding',
        type: 'error',
      }),
  });
};

/**
 * A mutation hook to delete user on the server
 *
 * @returns The `useMutation` hook for delete a user from the server
 */
export const useDeleteUser = () => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users-list'] });
      addToast({ title: 'The user has been deleted', type: 'success' });
    },
    onError: () => {
      addToast({
        title: 'An error occurred while deleting',
        type: 'error',
      });
    },
  });
};

/**
 * A mutation hook to update user on the server
 *
 * @returns The `useMutation` hook for updating the user on the server
 */
export const useUpdateUser = () => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users-list'] });
      addToast({ title: 'The user has been updated', type: 'success' });
    },
    onError: () =>
      addToast({
        title: 'An error occurred while updating',
        type: 'error',
      }),
  });
};

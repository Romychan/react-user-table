import { IColumnTable } from '~/shared/ui/Table';

import { UserAvatar } from '../ui/UserAvatar/UserAvatar';

import { User, UserForm, UserQueryParams } from './types';

export const TABLE_USERS_COLUMNS: IColumnTable<User, keyof User>[] = [
  {
    label: 'Name',
    accessor: 'name',
    width: 320,
    isSortable: true,
    isResizable: true,
    renderCell: ({ currentData: { name, username, image } }) => (
      <UserAvatar name={name} username={username} image={image} />
    ),
  },
  {
    label: 'Email',
    accessor: 'email',
    isSortable: true,
    width: 320,
    isResizable: true,
  },
  {
    label: 'Phone',
    accessor: 'phone',
    isSortable: true,
    width: 240,
    isResizable: true,
  },
  {
    label: 'City',
    accessor: 'city',
    width: 190,
    isSortable: true,
    isResizable: true,
  },
  {
    label: 'Address',
    accessor: 'address',
    width: 210,
    isSortable: true,
    isResizable: true,
  },
];

export const DEFAULT_USERS_PARAMS: UserQueryParams = {
  query: '',
  skip: '0',
  limit: '10',
  order: 'asc',
  sort: 'id',
};

export const FORM_USERS_FIELDS: Record<keyof UserForm, string> = {
  name: 'Name',
  username: 'Username',
  email: 'Email',
  phone: 'Phone',
  city: 'City',
  address: 'Address',
};

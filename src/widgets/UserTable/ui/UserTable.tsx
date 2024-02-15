import { useState } from 'react';

import { SearchUser } from '~/features/SearchUser';

import {
  useUserStore,
  TABLE_USERS_COLUMNS,
  useFetchUsers,
  DEFAULT_USERS_PARAMS,
} from '~/entities/User';

import { Table, TableBody, TableHeader } from '~/shared/ui/Table';
import { Pagination } from '~/shared/ui/Pagination';

import styles from './UserTable.module.scss';

/** This component is used to display a list of users in a table format. It provides the ability to display, search, and paginate users */
export const UserTable = () => {
  const [queryParams, setQueryParams] = useState(DEFAULT_USERS_PARAMS);
  const { setCurrentUserId } = useUserStore();

  const { data, isLoading } = useFetchUsers(queryParams);

  return (
    <div className={styles.container}>
      <SearchUser
        onValueSearch={(query) =>
          setQueryParams((prev) => ({
            ...prev,
            skip: '0',
            query,
          }))
        }
      />

      <div className={styles.wrapper} data-testid="user-table">
        <Table className={styles.table}>
          <TableHeader
            columns={TABLE_USERS_COLUMNS}
            sorting={{
              column: queryParams.sort,
              order: queryParams.order === 'asc' ? 'ascending' : 'descending',
            }}
            onSort={(column, order) =>
              setQueryParams((prev) => ({
                ...prev,
                sort: column,
                order: order === 'ascending' ? 'asc' : 'desc',
              }))
            }
          />
          <TableBody
            columns={TABLE_USERS_COLUMNS}
            data={data?.users || []}
            isLoading={isLoading}
            onRowClick={({ id }) => setCurrentUserId({ id })}
          />
        </Table>
      </div>

      {data && data.total > parseInt(queryParams.limit) ? (
        <Pagination
          className={styles.pagination}
          totalCount={data.total}
          pageSize={parseInt(queryParams.limit)}
          currentPage={
            parseInt(queryParams.skip) / parseInt(queryParams.limit) + 1 || 1
          }
          onPageChange={(page) =>
            setQueryParams((prev) => ({
              ...prev,
              skip: ((page - 1) * parseInt(queryParams.limit)).toString(),
            }))
          }
        />
      ) : null}
    </div>
  );
};

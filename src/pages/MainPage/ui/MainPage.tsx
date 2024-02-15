import { UserTable } from '~/widgets/UserTable';
import { UserOverview } from '~/widgets/UserOverview';

import { AddUser } from '~/features/AddUser';

import styles from './MainPage.module.scss';

/** This component is used to display the main page */
export const MainPage = () => {
  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.header}>
            <h1 className={styles.title}>User Management</h1>
            <AddUser />
          </div>

          <UserOverview />
          <UserTable />
        </div>
      </div>
    </div>
  );
};

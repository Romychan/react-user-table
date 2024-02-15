import { UpdateUser } from '~/features/UpdateUser';
import { DeleteUser } from '~/features/DeleteUser';

import { useUserStore, useFetchUser } from '~/entities/User';

import { Drawer } from '~/shared/ui/Drawer';
import { Loader } from '~/shared/ui/Loader';

import styles from './UserOverview.module.scss';

/** This component is used to view and edit the user information */
export const UserOverview = () => {
  const { currentUserId, setCurrentUserId } = useUserStore();

  const { data, isLoading } = useFetchUser(currentUserId);

  return (
    <Drawer
      isVisible={!!currentUserId}
      className={styles.container}
      position="right"
      title="Overview"
      onClose={() => setCurrentUserId({ id: null })}
    >
      {(onClose) =>
        data && !isLoading ? (
          <UpdateUser
            user={data}
            actionSlot={<DeleteUser id={currentUserId} onComplete={onClose} />}
          />
        ) : (
          <Loader className={styles.loader} />
        )
      }
    </Drawer>
  );
};

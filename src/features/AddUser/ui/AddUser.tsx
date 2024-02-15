import { Drawer } from '~/shared/ui/Drawer';
import { useToggle } from '~/shared/lib/hooks';
import { Button } from '~/shared/ui/Button';
import { Icon } from '~/shared/ui/Icon';

import { AddForm } from './AddForm/AddForm';
import styles from './AddUser.module.scss';

/** This component is used to display the form for adding a new user */
export const AddUser = () => {
  const { isToggled: isVisible, onToggle: toggleVisible } = useToggle();

  return (
    <div className={styles.container}>
      <Button
        size="sm"
        onClick={toggleVisible}
        className={styles.button}
        data-testid="drawer-add-user"
      >
        <Icon name="plus" size={10} />
        Add user
      </Button>

      <Drawer title="New user" isVisible={isVisible} onClose={toggleVisible}>
        {(onClose) => <AddForm onComplete={onClose} />}
      </Drawer>
    </div>
  );
};

import { Avatar } from '~/shared/ui/Avatar';

import styles from './UserAvatar.module.scss';

interface IUserAvatarProps {
  /** The user's first and last name */
  name: string;
  /** The user's username */
  username: string;
  /** The user's avatar */
  image: string;
}

/** This component is used to display the user's avatar, name and username */
export const UserAvatar = ({ name, username, image }: IUserAvatarProps) => {
  return (
    <div className={styles.profile}>
      <Avatar src={image} name={username} alt={username} size="xs" isBordered />

      <div className={styles.information}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.username}>{username}</p>
      </div>
    </div>
  );
};

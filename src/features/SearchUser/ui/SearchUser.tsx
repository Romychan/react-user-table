import { Icon } from '~/shared/ui/Icon';
import { InputGroup } from '~/shared/ui/InputGroup';
import { useDebounceCallback } from '~/shared/lib/hooks';

import styles from './SearchUser.module.scss';

interface ISearchUserProps {
  /**
   * A callback that will be called when the user enters a value to search for
   *
   * @param newValue New search value for filtering
   */
  onValueSearch: (newValue: string) => void;
}

/** This component is used to search for the user */
export const SearchUser = ({ onValueSearch }: ISearchUserProps) => {
  const handleSearchDebounce = useDebounceCallback<string>((newValue) =>
    onValueSearch(newValue),
  );

  return (
    <InputGroup
      id="search-user"
      name="search-user"
      onChange={(event) => handleSearchDebounce(event.target.value)}
      variant="filled"
      startContent={<Icon name="search" />}
      placeholder="Search by name..."
      className={styles.container}
      data-testid="search-user"
    />
  );
};

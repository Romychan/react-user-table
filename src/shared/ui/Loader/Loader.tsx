import { cl } from '../../lib/utils';

import styles from './Loader.module.scss';

interface ILoaderProps {
  /** Additional class for the component */
  className?: string;
}

/** This component shows that the content is being loaded or processed. */
export const Loader = ({ className }: ILoaderProps) => {
  return (
    <div className={cl(styles.loader, className)} data-testid="loader"></div>
  );
};

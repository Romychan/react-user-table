import { useMemo } from 'react';

import { cl } from '../../lib/utils';
import { Button } from '../Button';
import { Icon } from '../Icon';

import { getPagesRange } from './utils';
import styles from './Pagination.module.scss';

interface IPaginationProps {
  /** Controlled current page */
  currentPage: number;
  /** Additional class for the component */
  className?: string;
  /** Total number of items
   *
   * @default 1
   */
  totalCount?: number;
  /**
   * Number of items per page
   *
   * @default 10
   */
  pageSize?: number;
  /**
   * The number of pages displayed before and after the current page
   *
   * @default 2
   */
  siblingPage?: number;
  /**
   * The callback that will be called when the page changes
   *
   * @param page The selected page
   */
  onPageChange: (page: number) => void;
}

/** This component is used to display page numbering and navigation between pages */
export const Pagination = ({
  currentPage,
  onPageChange,
  totalCount = 1,
  pageSize = 10,
  siblingPage = 2,
  className = '',
}: IPaginationProps) => {
  const totalCountPage = Math.ceil(totalCount / pageSize);
  const pagesRange = useMemo(
    () => getPagesRange(currentPage, totalCountPage, siblingPage),
    [currentPage, totalCountPage, siblingPage],
  );

  return (
    <div className={cl(styles.container, className)} data-testid="pagination">
      <Button
        variant="secondary"
        size="sm"
        data-testid="pagination-prev"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={cl(styles.page, styles.prev)}
        isIconOnly
      >
        <Icon name="chevron" />
      </Button>

      {pagesRange[0] > 1 ? (
        <Button
          variant="secondary"
          size="sm"
          data-testid="pagination-prev-dot"
          onClick={() => onPageChange(currentPage - 1)}
          className={styles.page}
          isIconOnly
        >
          ...
        </Button>
      ) : null}

      {pagesRange.map((number) => (
        <Button
          key={number}
          variant={currentPage == number ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onPageChange(number)}
          className={styles.page}
          isIconOnly
        >
          {number}
        </Button>
      ))}

      {totalCountPage !== pagesRange[pagesRange.length - 1] ? (
        <Button
          variant="secondary"
          size="sm"
          data-testid="pagination-next-dot"
          onClick={() => onPageChange(currentPage + 1)}
          className={styles.page}
          isIconOnly
        >
          ...
        </Button>
      ) : null}

      <Button
        variant="secondary"
        size="sm"
        data-testid="pagination-next"
        disabled={currentPage >= totalCountPage}
        onClick={() => onPageChange(currentPage + 1)}
        className={cl(styles.page, styles.next)}
        isIconOnly
      >
        <Icon name="chevron" />
      </Button>
    </div>
  );
};

import { ButtonHTMLAttributes, ReactNode } from 'react';

import { SizeTypes } from '../../lib/types/ui';
import { cl } from '../../lib/utils';

import styles from './Button.module.scss';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The content of the component */
  children: ReactNode;
  /** If `true`, the button with icon will have the same width and height */
  isIconOnly?: boolean;
  /**
   * The variant of the component
   *
   * @default 'primary'
   */
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'link-primary'
    | 'link-secondary';
  /**
   * The size of the component
   *
   * @default 'md'
   */
  size?: SizeTypes;
}

/** This component is used to trigger an action or event when click on it */
export const Button = ({
  variant = 'primary',
  size = 'md',
  isIconOnly,
  className = '',
  children,
  ...rest
}: IButtonProps) => {
  return (
    <button
      className={cl(styles.button, className, styles[variant], styles[size], {
        [styles.icon]: isIconOnly,
      })}
      {...rest}
    >
      {children}
    </button>
  );
};

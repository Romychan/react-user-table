import { InputHTMLAttributes } from 'react';

import { cl } from '../../lib/utils';
import { VariantTypes } from '../../lib/types/ui';

import styles from './Input.module.scss';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** If `true`, the input will indicate an error */
  error?: boolean | string;
  /**
   * The variant of the component
   *
   * @default 'bordered'
   */
  variant?: VariantTypes;
}

/** This component is used to enter short texts in a text field. */
export const Input = ({
  value,
  variant = 'bordered',
  autoComplete = 'off',
  error,
  className = '',
  ...rest
}: IInputProps) => (
  <input
    value={value}
    className={cl(styles.input, styles[variant], className, {
      [styles.error]: error,
    })}
    autoComplete={autoComplete}
    data-testid="input-field"
    {...rest}
  />
);

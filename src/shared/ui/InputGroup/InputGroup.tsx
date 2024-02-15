import { ReactNode, useLayoutEffect, useRef, useState } from 'react';

import { cl } from '../../lib/utils';
import { IInputProps, Input } from '../Input';

import styles from './InputGroup.module.scss';

interface InputPadding {
  /** Left padding for input */
  left: number | string;
  /** Right padding for input */
  right: number | string;
}

interface IInputGroupProps extends IInputProps {
  /** The element will be displayed in the left side of the input */
  startContent?: ReactNode;
  /** The element will be displayed in the right side of the input */
  endContent?: ReactNode;
  /**
   * Padding for the input
   *
   * @default 12
   */
  defaultPadding?: number;
  /**
   * Gap for the startContent and endContent
   *
   * @default 8
   */
  defaultGap?: number;
}

/** This component can be used to add additional elements to the `<Input />`.*/
export const InputGroup = ({
  startContent,
  endContent,
  defaultPadding = 12,
  defaultGap = 8,
  className,
  error,
  ...rest
}: IInputGroupProps) => {
  const startContentRef = useRef<HTMLDivElement>(null);
  const endContentRef = useRef<HTMLDivElement>(null);

  const [inputPadding, setInputPadding] = useState<InputPadding>({
    left: '',
    right: '',
  });

  useLayoutEffect(() => {
    const startContentWidth = startContentRef.current?.offsetWidth;
    const endContentWidth = endContentRef.current?.offsetWidth;
    const elementsPadding = defaultGap + defaultPadding;

    setInputPadding({
      left:
        startContent && startContentWidth
          ? startContentWidth + elementsPadding
          : '',
      right:
        endContent && endContentWidth ? endContentWidth + elementsPadding : '',
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cl(styles.container, className, { [styles.error]: error })}>
      {startContent ? (
        <div
          ref={startContentRef}
          className={cl(styles.element, styles.startContent)}
        >
          {startContent}
        </div>
      ) : null}

      <Input
        {...rest}
        error={error}
        style={{
          paddingRight: inputPadding.right,
          paddingLeft: inputPadding.left,
        }}
      />

      {endContent ? (
        <div
          ref={endContentRef}
          className={cl(styles.element, styles.endContent)}
        >
          {endContent}
        </div>
      ) : null}
    </div>
  );
};

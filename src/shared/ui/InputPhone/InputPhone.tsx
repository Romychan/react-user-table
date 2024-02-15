import { formatPhone } from '../../lib/utils';
import { IInputProps, Input } from '../Input';

interface IInputPhoneProps extends IInputProps {
  /** A regular expression for checking a phone number */
  phoneRegexp?: RegExp;
  /**
   * Country phone code
   *
   * @default '7'
   */
  phoneCode?: string;
}

/** This component is used to enter a phone number with a mask and formatting */
export const InputPhone = ({
  phoneCode = '7',
  phoneRegexp,
  value,
  ...rest
}: IInputPhoneProps) => {
  return (
    <Input
      type="tel"
      value={formatPhone(value as string, phoneCode, phoneRegexp)}
      onFocus={(event) => {
        if (!event.target.value) {
          event.target.value = `+${phoneCode} `;
        }
      }}
      onBlur={(event) => {
        if (event.target.value === `+${phoneCode} `) {
          event.target.value = '';
        }
      }}
      {...rest}
    />
  );
};

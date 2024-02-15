const DEFAULT_PHONE_REGEXP = /(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})?/g;

/**
 * The function for formatting a phone number
 *
 * @param value The value of the phone number
 * @param code Country phone code
 * @param regexp A regular expression for formatting a phone number
 *
 * @returns Formatted phone number
 */
export const formatPhone = (
  value: string,
  code = '7',
  regexp = DEFAULT_PHONE_REGEXP,
) => {
  if (!value) return '';

  const newPhoneNumber = value
    .replace(/\D/g, '')
    .replace(regexp, (...phoneNumber) =>
      !phoneNumber[3]
        ? `${phoneNumber[2]}`
        : `(${phoneNumber[2]}) ${phoneNumber[3]}${
            phoneNumber[4] ? `-${phoneNumber[4]}` : ''
          }${phoneNumber[5] ? `-${phoneNumber[5]}` : ''}`,
    );

  return `+${code} ${newPhoneNumber}`;
};

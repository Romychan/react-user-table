import { formatPhone } from '../formatPhone';

describe('formatPhone', () => {
  it('should skip letters and symbols', () => {
    expect(formatPhone('test')).toEqual('+7 ');
    expect(formatPhone('_+=!test +7123')).toEqual('+7 123');
  });

  it('should work correctly with default regexp', () => {
    expect(formatPhone('+7123')).toEqual('+7 123');
    expect(formatPhone('+71234')).toEqual('+7 (123) 4');
    expect(formatPhone('+71234567')).toEqual('+7 (123) 456-7');
    expect(formatPhone('+71234567890')).toEqual('+7 (123) 456-78-90');
  });

  it('should work correctly with custom regexp and country phone code', () => {
    const regexp = /^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/;
    expect(formatPhone('+9991234567890', '999', regexp)).toEqual(
      '+999 (123) 456-78-90',
    );
  });

  it('should handle falsy values', () => {
    expect(formatPhone(undefined as unknown as string)).toEqual('');
    expect(formatPhone(null as unknown as string)).toEqual('');
    expect(formatPhone('')).toEqual('');
  });
});

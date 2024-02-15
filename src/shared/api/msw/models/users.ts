import { primaryKey } from '@mswjs/data';
import { faker } from '@faker-js/faker';
import { NIL as NIL_UUID } from 'uuid';

/**
 * The function for generating mock users using faker
 *
 * @returns An object with a mock user
 */
export const generateRandomUser = () => {
  const gender = faker.person.sexType();
  const firstName = faker.person.firstName(gender);
  const lastName = faker.person.lastName(gender);

  return {
    id: faker.string.uuid(),
    name: `${firstName} ${lastName}`,
    gender,
    age: faker.number.int({ min: 18, max: 50 }),
    ip: faker.internet.ipv4(),
    username: faker.internet.userName({ firstName }),
    email: faker.internet.email({
      firstName,
      lastName,
    }),
    phone: faker.helpers.fromRegExp('+7 ([0-9]{3}) [0-9]{3}-[0-9]{2}-[0-9]{2}'),
    image: faker.image.avatarLegacy(),
    address: faker.location.street(),
    city: faker.location.city(),
  };
};

/**
 * The function to create a user model for a `@mswjs/data` database
 *
 * @returns User model for database
 */
export const createUserModel = () => {
  const gender = faker.person.sexType();
  const firstName = faker.person.firstName(gender);
  const lastName = faker.person.lastName(gender);

  return {
    id: primaryKey(() => faker.string.uuid()),
    name: () => `${firstName} ${lastName}`,
    username: () => faker.internet.userName({ firstName, lastName }),
    gender: () => gender,
    age: () => faker.number.int({ min: 18, max: 50 }),
    ip: () => faker.internet.ipv4(),
    email: () =>
      faker.internet.email({
        firstName,
        lastName,
      }),
    phone: () =>
      faker.helpers.fromRegExp('+7 ([0-9]{3}) [0-9]{3}-[0-9]{2}-[0-9]{2}'),
    image: () => faker.image.avatarLegacy(),
    address: () => faker.location.street(),
    city: () => faker.location.city(),
  };
};

export const MOCK_USER = {
  id: NIL_UUID,
  name: `Test Name`,
  gender: 'male' as const,
  age: 21,
  ip: '123.123.123.123',
  username: 'testname',
  email: 'test@test.test',
  phone: '+7 (123) 456-78-90',
  image: 'https://robohash.org/L9Z.png?set=set4',
  address: 'Test Address',
  city: 'Moscow',
};

import { drop, factory } from '@mswjs/data';
import { faker } from '@faker-js/faker';

import { MOCK_USER, createUserModel, generateRandomUser } from './models/users';

const database = factory({
  user: createUserModel(),
});

/** The function for creating a mock database */
const createDatabase = () => {
  if (database.user.count() > 0) {
    return;
  }

  faker.seed(123);

  database.user.create(MOCK_USER);

  const newUsers = faker.helpers.multiple(generateRandomUser, {
    count: 99,
  });

  newUsers.forEach((user) => database.user.create(user));
};

/**
 * The function for initializing a mock database
 *
 * @returns Mock database
 */
export const initMockDatabase = () => {
  createDatabase();

  return database;
};

/**
 * The function to reset the database to its initial state
 *
 * @returns Initial mock database
 */
export const resetMockDatabase = () => {
  drop(database);
  createDatabase();

  return database;
};

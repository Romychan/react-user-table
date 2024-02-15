import { z } from 'zod';

/** The basic schema of the user from the server */
export const UserDTOSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  gender: z.enum(['female', 'male']),
  age: z.number(),
  ip: z.string().ip({ version: 'v4' }),
  image: z.string().url(),
  username: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
});

/** The basic schema of the user */
export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  image: z.string().url(),
  username: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
});

/** The schema of the original response returned from fetch for users */
export const OriginalUsersResponseSchema = z.object({
  users: z.array(UserDTOSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

/** The schema of the transformed response data for users */
export const UsersResponseSchema = z.object({
  users: z.array(UserSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

/** The schema for validating a form with a user */
export const UserFormSchema = z.object({
  name: z
    .string({ required_error: 'The field is required' })
    .min(2, 'The minimum number of characters is 2')
    .max(32, 'The maximum number of characters is 32'),
  username: z
    .string({ required_error: 'The field is required' })
    .min(3, 'The minimum number of characters is 3')
    .max(16, 'The maximum number of characters is 16'),
  email: z
    .string({ required_error: 'The field is required' })
    .email('Not valid email')
    .min(2, 'The minimum number of characters is 2')
    .max(64, 'The maximum number of characters is 64'),
  phone: z
    .string({ required_error: 'The field is required' })
    .regex(
      /\+[0-9]{1,3}\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}/g,
      'Not valid phone number',
    ),
  city: z
    .string({ required_error: 'The field is required' })
    .min(2, 'The minimum number of characters is 2')
    .max(32, 'The maximum number of characters is 32'),
  address: z
    .string({ required_error: 'The field is required' })
    .min(2, 'The minimum number of characters is 2')
    .max(32, 'The maximum number of characters is 32'),
});

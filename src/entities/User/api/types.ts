import { z } from 'zod';

import {
  OriginalUsersResponseSchema,
  UserDTOSchema,
  UsersResponseSchema,
} from '../model/schemas';

/** Basic user type from the server */
export type UserDTO = z.infer<typeof UserDTOSchema>;

/** Type of the original response returned from fetch for users */
export type OriginalUsersResponse = z.infer<typeof OriginalUsersResponseSchema>;

/** Type of the transformed response data for users */
export type UsersResponse = z.infer<typeof UsersResponseSchema>;

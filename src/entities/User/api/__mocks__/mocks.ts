import { NIL as NIL_UUID } from 'uuid';

import { User } from '../../model/types';

export const MOCK_USER: User = {
  id: NIL_UUID,
  name: 'First Last Name',
  email: 'test@test.test',
  phone: '+1 (234) 567-89-12',
  username: 'username',
  image: 'https://robohash.org/L9Z.png?set=set4',
  address: '11 Test',
  city: 'Moscow',
};

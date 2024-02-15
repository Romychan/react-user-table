import { HttpResponse, delay, http } from 'msw';
import { v4 as uuidv4 } from 'uuid';

import { initMockDatabase } from '~/shared/api/msw';
import { CONFIG } from '~/shared/config';

import { UserDTO } from '../types';

const database = initMockDatabase();

/** An array of `MSW` handlers for intercepting user CRUD requests */
export const userHandlers = [
  http.get(`${CONFIG.API_URL}/users`, async ({ request }) => {
    const url = new URL(request.url);

    const skip = Number(url.searchParams.get('skip'));
    const limit = Number(url.searchParams.get('limit'));
    const sort = url.searchParams.get('sort') as keyof UserDTO;
    const order = url.searchParams.get('order') as 'asc' | 'desc';
    const search = url.searchParams.get('query') as string;

    const users = database.user.findMany({
      where: {
        name: { contains: search },
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      orderBy: {
        [sort]: order,
      },
      take: limit,
      skip: skip,
    });

    const total = database.user.count({
      where: {
        name: { contains: search },
      },
    });

    await delay();

    return HttpResponse.json({ users, total, skip, limit }, { status: 200 });
  }),

  http.post(`${CONFIG.API_URL}/users`, async ({ request }) => {
    const body = (await request.json()) as UserDTO;

    const newUser = {
      ...body,
      id: uuidv4(),
    };

    const user = database.user.create(newUser);

    return HttpResponse.json(user, { status: 200 });
  }),

  http.put(`${CONFIG.API_URL}/users/:id`, async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as UserDTO;

    const user = database.user.update({
      where: { id: { equals: id as string } },
      data: body,
    });

    return HttpResponse.json(user, { status: 200 });
  }),

  http.delete(`${CONFIG.API_URL}/users/:id`, ({ params }) => {
    const { id } = params;

    const user = database.user.delete({
      where: { id: { equals: id as string } },
    });

    return HttpResponse.json(user, { status: 200 });
  }),

  http.get(`${CONFIG.API_URL}/users/:id`, async ({ params }) => {
    const { id } = params;

    const user = database.user.findFirst({
      where: { id: { equals: id as string } },
    });

    await delay();

    return HttpResponse.json(user, { status: 200 });
  }),
];

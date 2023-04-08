import type { JWTPayload } from '$lib/types';
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';

export const handle = async ({ event, resolve }) => {
  const token = event.cookies.get('token');

  event.locals.username = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
      event.locals.username = decoded.username;
    } catch {}
  }

  const response = await resolve(event);
  return response;
};

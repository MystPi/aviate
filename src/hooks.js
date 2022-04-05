import { parse } from 'cookie';
import { getUserFromCookies } from '$lib/db';


export async function handle({ event, resolve }) {
  const cookies = parse(event.request.headers.get('cookie') || '');
  const user = await getUserFromCookies(cookies);

  if (user) {
    event.locals.user = user;
    return resolve(event);
  }

  event.locals.user = null;
  return resolve(event);
}


export async function getSession(request) {
  return request.locals;
}
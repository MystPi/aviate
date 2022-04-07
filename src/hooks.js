import { parse } from 'cookie';
import { getUserFromCookies, getAllUsers } from '$lib/db';


export async function handle({ event, resolve }) {
  const cookies = parse(event.request.headers.get('cookie') || '');
  const user = await getUserFromCookies(cookies);

  if (user) {
    event.locals.user = user;

    if (user.is_admin) {
      event.locals.users = await getAllUsers();
    }

    return resolve(event);
  }

  event.locals.user = null;
  event.locals.users = null;
  return resolve(event);
}


export async function getSession(request) {
  return request.locals;
}
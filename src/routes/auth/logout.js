import { deleteSession } from '$lib/db';
import { serialize, parse } from 'cookie';


export async function get({ request }) {
  const cookies = parse(request.headers.get('cookie') || '');

  if (cookies.session_id) {
    await deleteSession(cookies.session_id);
  }

  return {
    status: 302,
    headers: {
      'Set-Cookie': serialize('session_id', '', {
        path: '/',
        expires: new Date(0),
      }),
      Location: '/',
    },
  };
}
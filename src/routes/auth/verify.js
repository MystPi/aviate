import { serialize } from 'cookie';
import { createSession, getUserByUsername, createUser } from '$lib/db';


export async function post({ request }) {
  const { privateCode } = await request.json();

  const res = await fetch('https://auth.itinerary.eu.org/api/auth/verifyToken?privateCode=' + privateCode);
  const json = await res.json();

  if (!json.valid) return {
    status: 401
  };

  const user = await getUserByUsername(json.username);

  if (!user) {
    await createUser({
      username: json.username,
      status: '',
      is_admin: false
    });
  }

  const { id } = await createSession(json.username);

  return {
    status: 201,
    headers: {
      'Set-Cookie': serialize('session_id', id, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        maxAge: 60 * 60 * 24 * 7
      })
    }
  };
}

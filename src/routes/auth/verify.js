import { serialize } from 'cookie';
import { createSession, getUserByUsername, createUser, deleteSession } from '$lib/db';


export async function post({ request }) {
  const { privateCode } = await request.json();

  const res = await fetch('https://fluffyscratch.hampton.pw/auth/verify/v2/' + privateCode);
  const json = await res.json();

  if (json.valid) {
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
          // httpOnly: true,
          sameSite: 'strict',
          secure: true,
          maxAge: 60 * 60 * 24 * 7
        })
      }
    };
  } else {
    return {
      status: 401
    };
  }
}
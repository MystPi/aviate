import { getUserFromCookies } from '$lib/db';
import { run } from '$lib/statusLang';
import { parse } from 'cookie';


export async function post({ request }) {
  let status;

  try {
    const body = await request.json();
    status = body.status;
    if (status === undefined) return { status: 400 };
  } catch (e) {
    return {
      status: 400
    };
  }

  const cookies = parse(request.headers.get('cookie') || '');
  const user = await getUserFromCookies(cookies);

  if (user) {
    const result = await run(status, user.username);

    return {
      status: 200,
      body: {
        result
      }
    };
  }

  return {
    status: 401
  };
}
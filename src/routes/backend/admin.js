import { getAllUsers, getAllFeedback, getUserFromCookies } from '$lib/db';
import { parse } from 'cookie';


export async function get({ request }) {
  const cookies = parse(request.headers.get('cookie') || '');
  const user = await getUserFromCookies(cookies);

  if (user && user.is_admin) {
    const users = await getAllUsers();
    const feedback = await getAllFeedback();

    return {
      status: 200,
      body: {
        users,
        feedback,
      },
    };
  }
}
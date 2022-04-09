import { sendFeedback, getUserFromCookies } from '$lib/db';
import { parse } from 'cookie';


export async function post({ request }) {
  let feedback;

  try {
    feedback = await request.json();

    if (!feedback.feedbackType || !feedback.message || !feedback.timestamp) {
      return {
        status: 400
      };
    }
  } catch (e) {
    return {
      status: 400
    };
  }

  const cookies = parse(request.headers.get('cookie') || '');
  const user = await getUserFromCookies(cookies);

  if (!user) return {
    status: 401
  };

  await sendFeedback({...feedback, username: user.username});
}
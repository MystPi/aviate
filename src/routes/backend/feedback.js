import { sendFeedback, getUserFromCookies, deleteFeedback } from '$lib/db';
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

  return {
    status: 200
  };
}


export async function del({ request }) {
  let ts;

  try {
    const body = await request.json();
    ts = body.timestamp;
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

  const res = await deleteFeedback(ts);

  if (!res) return {
    status: 404
  };

  return {
    status: 200
  };
}
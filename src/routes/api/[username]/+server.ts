import { json } from '@sveltejs/kit';
import { getStatus } from '$lib/server/db';
import { run } from '$lib/statuslang';

export const GET = async ({ url, params: { username } }) => {
  const status = await getStatus(username);

  if (status !== null) {
    const result = url.searchParams.get('code') === 'true' ? status : await run(status, username);

    return json({
      success: true,
      username,
      status: result,
    });
  } else {
    return json({
      success: false,
      username,
      status: null,
    });
  }
};

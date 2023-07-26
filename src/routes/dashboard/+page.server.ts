import { redirect, fail, error } from '@sveltejs/kit';
import { setStatus, getStatus } from '$lib/server/db';

export const load = async ({ locals }) => {
  if (!locals.username) {
    throw redirect(302, '/auth/login');
  }
  const status = await getStatus(locals.username);

  if (status === null) {
    throw error(404, 'Your status is missing—please re-login');
  }

  return {
    status,
  };
};

export const actions = {
  default: async ({ request, locals }) => {
    if (!locals.username) return fail(403, { success: false });
    const data = await request.formData();
    const status = data.get('status');
    if (status === null || status.length > 200) return fail(400, { success: false });

    const result = await setStatus(locals.username, status.toString());

    if (!result) {
      return fail(500, { success: false });
    }

    return {
      success: true,
    };
  },
};

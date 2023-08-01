import { redirect, fail } from '@sveltejs/kit';
import { report } from '$lib/server/db';

export const load = async ({ locals }) => {
  if (!locals.username) {
    throw redirect(302, '/auth/login');
  }
};

export const actions = {
  default: async ({ request, locals }) => {
    if (!locals.username) return fail(403, { success: false });
    const data = await request.formData();
    const user = data.get('user');
    if (user === null) return fail(400, { success: false });

    const success = await report(locals.username, user.toString());

    return { success };
  },
};

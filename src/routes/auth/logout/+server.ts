import { redirect } from '@sveltejs/kit';

export const GET = ({ cookies }) => {
  cookies.delete('token', { path: '/' });
  throw redirect(302, '/');
};

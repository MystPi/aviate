import { redirect } from '@sveltejs/kit';

export const GET = ({ url }) => {
  const base64 = Buffer.from(url.host + '/auth/verify').toString('base64');
  const location = `https://auth.itinerary.eu.org/auth/?redirect=${base64}&name=Aviate&authProject=722544679`;
  throw redirect(302, location);
};

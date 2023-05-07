import { getUserCount } from '$lib/server/db';

export const load = async () => {
  return {
    userCount: await getUserCount(),
  };
};

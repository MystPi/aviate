import type { JWTPayload } from '$lib/types';
import { error, redirect } from '@sveltejs/kit';
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { createUser } from '$lib/server/db';

interface ScratchAuthValid {
  valid: true;
  username: string;
  redirect: string;
  type?: 'instant';
  oneClickSignInToken?: string;
  instantPrivateCode?: string;
}

interface ScratchAuthInvalid {
  valid: false;
  username: null;
  redirect: null;
}

type ScratchAuthResponse = ScratchAuthValid | ScratchAuthInvalid;

export const GET = async ({ url, cookies }) => {
  const privateCode = url.searchParams.get('privateCode');

  if (!privateCode) {
    throw error(400, 'privateCode must be given');
  }

  const res = await fetch(
    'https://auth.itinerary.eu.org/api/auth/verifyToken?privateCode=' + privateCode
  );
  const json = (await res.json()) as ScratchAuthResponse;

  if (!json.valid) {
    throw error(401, 'Authentication failed');
  }

  createUser(json.username);

  const payload: JWTPayload = {
    username: json.username,
  };

  const token = jwt.sign(payload, JWT_SECRET);

  cookies.set('token', token, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });

  throw redirect(302, '/dashboard');
};

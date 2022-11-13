import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_SECRET_KEY
);

async function getData(table, type, gotten) {
  return await supabase.from(table).select().eq(type, gotten);
}

export async function getUserByUsername(username, sensitive = true) {
  let user;

  if (sensitive) {
    user = await getData('users', 'username', username);
  } else {
    user = await supabase
      .from('users')
      .select()
      .ilike('username', username.replace(/(_|%)/g, '\\$1'));
  }

  if (!user.data?.length) return Promise.resolve(null);

  return Promise.resolve(user.data[0]);
}

export async function getUserFromCookies(cookies) {
  if (cookies.session_id) {
    const session = await getSession(cookies.session_id);
    if (session) {
      const user = await getUserByUsername(session.username);
      return Promise.resolve(user);
    }
  }

  return Promise.resolve(null);
}

export async function createUser(user) {
  const existing = await getData('users', 'username', user.username);

  if (existing.data?.length)
    return Promise.reject(new Error('User already exists'));

  await supabase.from('users').insert([user]);
  return Promise.resolve(user);
}

export async function createSession(username) {
  const existing = await getData('sessions', 'username', username);

  if (existing.data?.length) return existing.data[0];

  const session = {
    id: uuidv4(),
    username,
  };

  await supabase.from('sessions').insert([session]);
  return Promise.resolve(session);
}

export async function getSession(sessionId) {
  const session = await getData('sessions', 'id', sessionId);

  if (!session.data?.length) return Promise.resolve(null);

  return Promise.resolve(session.data[0]);
}

export async function deleteSession(sessionId) {
  const session = await getData('sessions', 'id', sessionId);

  if (!session.data?.length) return Promise.resolve(null);

  await supabase.from('sessions').delete().eq('id', sessionId);
  return Promise.resolve(sessionId);
}

export async function setStatus(username, status) {
  const user = await getUserByUsername(username);

  if (!user) return Promise.reject(new Error('User not found'));

  user.status = status;
  await supabase.from('users').update(user).eq('username', username);
  return Promise.resolve(user);
}

export async function getAllUsers() {
  const users = await supabase.from('users').select();
  return Promise.resolve(users.data || []);
}

export async function sendFeedback(feedback) {
  await supabase.from('feedback').insert([feedback]);
  return Promise.resolve(feedback);
}

export async function getAllFeedback() {
  const feedback = await supabase.from('feedback').select();
  return Promise.resolve(feedback.data || []);
}

export async function deleteFeedback(ts) {
  const feedback = await getData('feedback', 'timestamp', ts);

  if (!feedback.data?.length) return Promise.resolve(null);

  await supabase.from('feedback').delete().eq('timestamp', ts);
  return Promise.resolve(ts);
}

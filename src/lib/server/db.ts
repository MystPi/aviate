import { SUPABASE_URL, SUPABASE_KEY } from '$env/static/private';
import type { Database } from './database';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

export async function getStatus(username: string) {
  const { data } = await supabase.from('users').select('status').eq('username', username);
  return data?.[0]?.status ?? null;
}

export async function getStatusInsensitive(username: string) {
  const { data } = await supabase
    .from('users')
    .select()
    .ilike('username', username.replace(/(_|%)/g, '\\$1'));

  return data?.[0]?.status ?? null;
}

export async function setStatus(username: string, status: string) {
  const { data } = await supabase.from('users').select('status').eq('username', username);
  if (!data?.length) return false;
  await supabase.from('users').update({ status }).eq('username', username);
  return true;
}

export async function createUser(username: string) {
  const { data } = await supabase.from('users').select('username').eq('username', username);
  if (data?.length) return false;
  await supabase.from('users').insert({ username });
  return true;
}

export async function getUserCount() {
  const { count } = await supabase.from('users').select('*', { count: 'planned', head: true });
  return count ?? 0;
}

export async function report(reportedBy: string, user: string) {
  const { data } = await supabase.from('users').select('username').eq('username', user);
  if (!data?.length) return false;
  await supabase.from('reports').insert({ reported_by: reportedBy, user });
  return true;
}
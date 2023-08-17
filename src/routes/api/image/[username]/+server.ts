import { toSvg } from '$lib/image';
import emojiRegex from 'emoji-regex';

function sanitize(html: string) {
  return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replaceAll(emojiRegex(), '');
}

export const GET = async ({ fetch, url, params }) => {
  const width = Number(url.searchParams.get('width')) || 500;
  const height = Number(url.searchParams.get('height')) || 90;
  const dark = url.searchParams.get('dark') === 'true';

  const res = await fetch(`/api/${params.username}`);
  const json = await res.json();

  const status = sanitize(json.status ?? '');

  const html = dark
    ? `
    <div tw="flex p-4 rounded-md border border-slate-700 items-center bg-slate-900">
      <img tw="w-6 h-6" src="https://aviate.scratchers.tech/favicon.svg" />
      <div tw="flex flex-col ml-4 flex-1">
        <p tw="m-0 text-slate-400 text-xs">${params.username}'s status</p>
        <p tw="m-0 text-slate-50 text-sm">${status}</p>
      </div>
    </div>
  `
    : `
    <div tw="flex p-4 rounded-md border border-slate-300 items-center bg-white">
      <img tw="w-6 h-6" src="https://aviate.scratchers.tech/favicon.svg" />
      <div tw="flex flex-col ml-4 flex-1">
        <p tw="m-0 text-slate-500 text-xs">${params.username}'s status</p>
        <p tw="m-0 text-slate-900 text-sm">${status}</p>
      </div>
    </div>
  `;

  const svg = await toSvg(html, width, height);

  return new Response(svg, {
    headers: {
      'content-type': 'image/svg+xml',
      'cache-control': 'max-age=120, s-maxage=120',
    },
  });
};

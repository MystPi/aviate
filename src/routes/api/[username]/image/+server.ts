import { toSvg } from '$lib/image';

function escape(html: string) {
  return html.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

export const GET = async ({ fetch, url, params }) => {
  const fontFile = await fetch('/Inter-Regular.ttf');
  const fontData: ArrayBuffer = await fontFile.arrayBuffer();

  const width = Number(url.searchParams.get('width')) || 400;
  const height = Number(url.searchParams.get('height')) || 70;
  const dark = url.searchParams.get('dark') === 'true';

  const res = await fetch(`/api/${params.username}`);
  const json = await res.json();

  const status = escape(json.status);

  const html = dark
    ? `
    <div tw="flex p-4 rounded-md border border-slate-700 items-center bg-slate-900">
      <img tw="w-6 h-6" src="https://aviate.scratchers.tech/favicon.svg" />
      <div tw="flex flex-col ml-4">
        <p tw="m-0 text-slate-400 text-xs">${params.username}'s status</p>
        <p tw="m-0 text-slate-50 text-sm">${status}</p>
      </div>
    </div>
  `
    : `
    <div tw="flex p-4 rounded-md border border-slate-300 items-center bg-white">
      <img tw="w-6 h-6" src="https://aviate.scratchers.tech/favicon.svg" />
      <div tw="flex flex-col ml-4">
        <p tw="m-0 text-slate-500 text-xs">${params.username}'s status</p>
        <p tw="m-0 text-slate-900 text-sm">${status}</p>
      </div>
    </div>
  `;

  return toSvg(html, width, height, fontData);
};

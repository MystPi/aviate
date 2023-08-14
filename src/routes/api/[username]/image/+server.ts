import { toSvg } from '$lib/image';

function escape(html: string) {
  return html.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

export const GET = async ({ fetch, url, params }) => {
  const fontFile = await fetch('/Inter-Regular.ttf');
  const fontData: ArrayBuffer = await fontFile.arrayBuffer();

  const width = Number(url.searchParams.get('width')) || 400;
  const height = Number(url.searchParams.get('height')) || 58;
  const dark = url.searchParams.get('dark') === 'true';

  const res = await fetch(`/api/${params.username}`);
  const json = await res.json();

  const status = escape(json.status);

  const html = dark
    ? `
    <div tw="flex p-4 rounded-md border border-slate-700 items-center bg-slate-900">
      <img tw="w-6 h-6" src="https://aviate.scratchers.tech/favicon.svg" />
      <p tw="m-0 text-sm ml-4 text-slate-50">${status}</p>
    </div>
  `
    : `
    <div tw="flex p-4 rounded-md border border-slate-300 items-center bg-white">
      <img tw="w-6 h-6" src="https://aviate.scratchers.tech/favicon.svg" />
      <p tw="m-0 text-sm ml-4">${status}</p>
    </div>
  `;

  return toSvg(html, width, height, fontData);
};

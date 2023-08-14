import { toSvg } from '$lib/image';

export const GET = async ({ fetch, url, params }) => {
  const fontFile = await fetch('/Inter-Regular.ttf');
  const fontData: ArrayBuffer = await fontFile.arrayBuffer();

  const width = Number(url.searchParams.get('width')) || 400;
  const height = Number(url.searchParams.get('height')) || 50;

  const res = await fetch(`/api/${params.username}`);
  const json = await res.json();

  const html = `
    <div tw="flex p-4 rounded-md border border-slate-300 items-center bg-white">
      <img tw="w-6 h-6" src="https://aviate.scratchers.tech/favicon.svg" />
      <p tw="m-0 text-sm ml-4">${(json.status as string).replaceAll('<', '&lt;')}</p>
    </div>
  `;

  return toSvg(html, width, height, fontData);
};

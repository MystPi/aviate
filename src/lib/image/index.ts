import { toReactElement } from './toReactElement';
import satori from 'satori';

export async function toSvg(html: string, width: number, height: number, fontData: ArrayBuffer) {
  const svg = await satori(toReactElement(html), {
    width,
    height,
    fonts: [
      {
        name: 'sans serif',
        data: fontData,
        style: 'normal',
      },
    ],
  });

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
    },
  });
}

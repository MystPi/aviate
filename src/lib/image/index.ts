import { toReactElement } from './toReactElement';
import satori from 'satori';

export function toSvg(html: string, width: number, height: number, fontData: ArrayBuffer) {
  return satori(toReactElement(html), {
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
}

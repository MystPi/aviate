import { toReactElement } from './toReactElement';
import satori from 'satori';

const fontFile = await fetch('https://rsms.me/inter/font-files/Inter-Regular.woff');
const fontData: ArrayBuffer = await fontFile.arrayBuffer();

export function toSvg(html: string, width: number, height: number) {
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

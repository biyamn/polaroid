import { Resvg } from '@resvg/resvg-js';

export function convertSvgToPngByResvg(targetSvg: Buffer | string) {
  const resvg = new Resvg(targetSvg, {});
  const pngData = resvg.render();
  return pngData.asPng();
}

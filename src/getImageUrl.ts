import { ImageManipulation } from './types'
import { buildUrl } from './utils';

export default function getImageUrl(src: string, config: ImageManipulation): string {
  return buildUrl(src, config);
}
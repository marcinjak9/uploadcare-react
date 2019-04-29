import { ImageManipulation } from "../types";

export const buildUrl = (src: string, config: ImageManipulation): string => {
  const {
    preview, resize, crop, scaleCrop, stretch,
    setfill, format, quality, progressive, enhance,
    sharp, blur, colors, filter, grayscale, invert,
    autorotate, rotate, flip, mirror,
  } = config;
  let url = src;
  // TODO: detect if final / is missing
  if (typeof preview === 'string') {
    url += `-/preview/${preview}/`
  } else if (typeof preview === 'boolean') {
    url += '-/preview/'
  }
  if (resize) {
    url += `-/resize/${resize}/`
  }
  if (crop && crop.dimensions) {
    url += `-/crop/${crop.dimensions}/${crop.position ? `${crop.position}/` : ''}`
  }
  if (scaleCrop && scaleCrop.dimensions) {
    url += `-/scale_crop/${scaleCrop.dimensions}/${scaleCrop.position ? `${scaleCrop.position}/` : ''}`
  }
  if (stretch) {
    url += `-/stretch/${stretch}/`
  }
  if (setfill) {
    url += `-/setfill/${setfill}/`
  }
  if (format) {
    url += `-/format/${format}/`
  }
  if (quality) {
    url += `-/quality/${quality}/`
  }
  if (progressive) {
    url += `-/progressive/${progressive}/`
  }
  if (enhance) {
    url += `-/enhance/${enhance}/`
  }
  if (sharp) {
    url += `-/sharp/${sharp}/`
  }
  if (blur && blur.strength) {
    url += `-/blur/${blur.strength}/${blur.amount ? `${blur.amount}/` : ''}`
  }
  if (colors) {
    if (colors.brightness) {
      url += `-/brightness/${colors.brightness}/`
    }
    if (colors.exposure) {
      url += `-/exposure/${colors.exposure}/`
    }
    if (colors.gamma) {
      url += `-/gamma/${colors.gamma}/`
    }
    if (colors.contrast) {
      url += `-/contrast/${colors.contrast}/`
    }
    if (colors.saturation) {
      url += `-/saturation/${colors.saturation}/`
    }
    if (colors.vibrance) {
      url += `-/vibrance/${colors.vibrance}/`
    }
    if (colors.warmth) {
      url += `-/warmth/${colors.warmth}/`
    }
  }

  if (filter && filter.name) {
    url += `-/filter/${filter.name}/${filter.amount ? `${filter.amount}/` : ''}`
  }
  if (grayscale) {
    url += '-/grayscale/'
  }
  if (invert) {
    url += '-/invert/'
  }
  if (autorotate) {
    url += `-/autorotate/${autorotate}/`
  }
  if (rotate) {
    url += `-/rotate/${rotate}/`
  }
  if (flip) {
    url += `-/flip/`
  }
  if (mirror) {
    url += `-/mirror/`
  }
  return url;
}
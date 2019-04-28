/**
 * @class ExampleComponent
 */

import * as React from 'react'

import styles from './styles.css'
import { buildUrl } from './utils';

export type Props = { 
  className: string,
  style: any,
  alt: string,
  // srcset: string,
  src: string,
  // dimensions: bool, 200x200
  /**
   * Mode:
   * -/preview/
   * -/preview/:two_dimensions/
   * 
   * Reduces an image proportionally for it to fit into the given dimensions in pixels.
   * If dimensions are not specified, we use the default values of 2048x2048 pixels.
   */
  preview: boolean | string,

   /**
   * Mode:
   * /:uuid/-/resize/200x200/
   * /:uuid/-/resize/200x/
   * /:uuid/-/resize/x200/
   * 
   * Resizes an image to fit into the specified dimensions.
   * With just a single linear dimension specified, preserves your original aspect ratio
   * and resizes an image along one of its axes.
   */
  resize: string,

  /**
   * Mode: 
   * -/crop/:two_dimensions/
   * -/crop/:two_dimensions/:two_coords/
   * -/crop/:two_dimensions/center/
   * 
   * Crops an image using specified dimensions and offsets. If no offset values are passed into the operation,
   * the top-left image corner is used by default.
   */
  crop: { dimensions: string, position?: string },

  /**
   * Mode: 
   * -/scale_crop/:two_dimensions/
   * -/scale_crop/:two_dimensions/center/
   * 
   * Scales down an image until one of its dimensions gets equal to some of the specified ones;
   * the rest is cropped. This proves useful when your want to fit as much of your image as possible into a box.
   */
  scaleCrop: { dimensions: string, position?: string },
  /**
   * Mode:
   * -/stretch/:mode/
   * Sets the resize behavior when a source image is smaller than the resulting dimensions.
   * The following modes can apply:
   * 
   * on — stretches an image up, the default option.
   * off — forbids stretching an image along any dimension that exceeds image size along any of its axes.
   * fill — does not stretch an image, the color-filled frame is rendered around instead,
   * the default fill color is used.
   */
  stretch: string,

  /**
   * Mode:
   * -/setfill/:color/
   * Sets the fill color used with crop, stretch or when converting an alpha channel enabled image to JPEG.
   * The operation uses hexadecimal notation to define colors.
   */
  setfill: string,

  /**
   * Mode:
   * -/format/:format/
   * Converts an image to one of the following formats:
   * 
   * jpeg — JPEG is a lossy image format (good compression, good for photos). JPEG doesn’t support an alpha channel, hence you can use the setfill operation that sets a background color. All browsers support JPEG.
   * png — PNG is a lossless format (good compression only for graphics) with alpha channel support. Supported by all browsers.
   * webp — WebP is a modern image format that supports alpha channel and lossy compression. The format is good for all kinds of images but supported by a limited number of browsers.
   * auto — the image format used for content delivery is set according to the presence of an alpha channel in your input and capabilities of a client.
   */
  format: string,

  /**
   * Mode:
   * -/quality/:quality/
   * Sets the level of image quality that affects file sizes and hence loading speeds and volumes of generated traffic. quality works with JPEG and WebP images.
   * 
   * normal — the default setting, suits most cases.
   * better — can be used to render relatively small and detailed previews. ≈125% file size compared to normal.
   * best — useful for hi-res images, when you want to get perfect quality without paying much attention to file sizes. ≈170% file size.
   * lighter — useful when applied to relatively large images to save traffic without significant losses in quality. ≈80% file size.
   * lightest — useful for retina resolutions, when you don’t have to worry about the quality of each pixel. ≈50% file size.
   */
  quality: string,

  /**
   * Mode:
   * -/progressive/:progressive/
   * Sets the level of image quality that affects file sizes and hence loading speeds and volumes of generated traffic. quality works with JPEG and WebP images.
   * 
   * normal — the default setting, suits most cases.
   * better — can be used to render relatively small and detailed previews. ≈125% file size compared to normal.
   * best — useful for hi-res images, when you want to get perfect quality without paying much attention to file sizes. ≈170% file size.
   * lighter — useful when applied to relatively large images to save traffic without significant losses in quality. ≈80% file size.
   * lightest — useful for retina resolutions, when you don’t have to worry about the quality of each pixel. ≈50% file size.
   */
  progressive: string,
  
  /**
   * Mode:
   * -/enhance/:strength(0 - 100)/
   * Auto-enhances an image by performing the following operations: auto levels, auto contrast,
   * and saturation sharpening. :strength values should be in the range from 0 to 100. The default value is 50.
   */
  enhance: number,
  
  /**
   * Mode:
   * -/sharp/:strength(0 - 20)/
   * Sharpens an image, might be especially useful with images that were subjected to downscaling.
   * :strength can be in the range from 0 to 20 and defaults to the value of 5.
   */
  sharp: number,
  
  /**
   * Mode:
   * -/blur/:strength(0 - 5000)/:amount(-200 - 100)
   * Blurs images by the :strength factor.
   * The filtering mode is Gaussian Blur, where :strength parameter sets the blur radius — effect intensity.
   * Technically, :strength controls the Gaussian Blur standard deviation multiplied by ten.
   * The value of :strength might come up to 5000, while the default value is 10.
   * Note, different :strength values do not affect the operation performance.
   */
  blur: { strength: number, amount?: number },

  /**
   * Mode:
   * -/brightness/:value(-100 - 100)/
   * -/exposure/:value(-500 - 500)/
   * -/gamma/:value(0 - 1000)/
   * -/contrast/:value(-100 - 1000)/
   * -/saturation/:value(-100 - 500)/
   * -/vibrance/:value(-100 - 500)/
   * -/warmth/:value(-100 - 100)/
   * 
   * The first three operations: brightness, exposure, and gamma are very similar.
   * Unlike exposure and gamma, brightness works in a straightforward manner:
   * the :value gets added to each color channel; out-of-range values are cut.
   * Thus, when increasing brightness, brighter image features can be lost.
   * Same works for darker features on brightness decrease.
   * Conversely, exposure and gamma compress color values distribution in either
   * lighter or darker areas depending on the provided :value, thus preserving details.
   */
  colors: {
    brightness?: number,
    exposure?: number
    gamma?: number
    contrast?: number
    saturation?: number
    vibrance?: number
    warmth?: number
  },

  /**
   * Mode:
   * -/filter/:amount(-100 - 200)
   * 
   * Applies one of predefined photo filters by its :name.
   * The way your images look affects their engagement rates.
   * You apply filters thus providing beautiful images consistent across content pieces you publish.
   * 
   * The :name should be one of the following:
   * adaris, briaril, calarel, carris, cynarel, cyren, elmet, elonni, enzana, erydark,
   * fenralan, ferand, galen, gavin, gethriel, iorill, iothari, iselva, jadis, lavra,
   * misiara, namala, nerion, nethari, pamaya, sarnar, sedis, sewen, sorahel, sorlen,
   * tarian, thellassan, varriel, varven, vevera, virkas, yedis, yllara, zatvel, zevcen.
   * 
   * :amount can be set in the range from -100 to 200 and defaults to 100. The :amount of:
   */
  filter: { name: number, amount?: number },

  /**
   * Mode:
   * -/grayscale/
   * Desaturates images. The operation has no additional parameters and simply produces a grayscale
   * image output when applied.
   */
  grayscale: boolean,
  
  /**
   * Mode:
   * -/invert/
   * Inverts images rendering a 'negative' of the input.
   */
  invert: boolean,
  
  /**
   * Mode:
   * -/autorotate/yes_or_no
   * The default behavior goes with parsing EXIF tags of original images and
   * rotating them according to the “Orientation” tag.
   * This is what we call autorotation. -/autorotate/no/ allows turning off the default behavior.
   */
  autorotate: string,

  /**
   * Mode:
   * -/rotate/:angle
   * Right-angle image rotation, counterclockwise. The value of :angle must be a multiple of 90.
   */
  rotate: number,
  
  /**
   * Mode:
   * -/flip/
   * Flips images.
   */
  flip: boolean,
  
  /**
   * Mode:
   * -/mirror/
   * mirrors images.
   */
  mirror: boolean,

  // TODO: OVERLAYS
}

export default class ExampleComponent extends React.Component<Props> {
  render() {
    const { className, style, alt } = this.props;
    return (
      <img className={className} alt={alt} style={style} src={buildUrl(this.props)} />
    )
  }
}

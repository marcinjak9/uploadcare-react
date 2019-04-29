
/**
 * @class Image
 */

import * as React from 'react'
import { buildUrl } from './utils';
import { ImageProps } from './types';

export default class Image extends React.Component<ImageProps> {
  render() {
    const { className, style, alt, src } = this.props;
    return (
      <img className={className} alt={alt} style={style} src={buildUrl(src, this.props)} />
    )
  }
}

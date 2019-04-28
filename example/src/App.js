import React, { Component } from 'react'

import Image from 'uploadcare-react'

export default class App extends Component {
  render () {
    return (
      <div>
        <Image 
          src='https://ucarecdn.com/52da3bfc-7cd8-4861-8b05-126fef7a6994/'
          preview="800x400"
          // resize="300"
          // crop={{ dimensions: '440x380', position: 'center' }}
          // scaleCrop={{ dimensions: '200x200' }}
          // stretch="off"
          // setfill="333333"
          // quality="lightest"
          // progressive="yes"
          // format="png"
          // enhance={0}
          // sharp={20}
          // blur={{ strength: 100, amount: -200 }}
          colors={{
            // brightness: 0,
            // exposure: -50,
            // gamma: 500,
            // contrast: 100,
            // saturation: 100,
            // vibrance: 300,
            // warmth: 100,
          }}
          // filter={{
          //   name: 'pamaya',
          //   amount: 50
          // }}
          // grayscale
          // invert
          // autorotate="no"
          // rotate={90}
          // flip
          // mirror
        />
      </div>
    )
  }
}

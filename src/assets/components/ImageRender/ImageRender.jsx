import React from 'react'
import Masonry from './Masonry'

function ImageRender({imageData}) {
  console.log(imageData)
  return (
    <div>
        <div className=" text-black text-2xl">
          <Masonry
                items={imageData.photos}
                ease="power3.out"
                duration={0.6}
                stagger={0.05}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.95}
                blurToFocus={true}
                colorShiftOnHover={true}
              />         
        </div>
    </div>
  )
}

export default ImageRender
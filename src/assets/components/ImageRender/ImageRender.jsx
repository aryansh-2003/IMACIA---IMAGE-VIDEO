import React from 'react'
import Masonry from './Masonry'

function ImageRender({photos}) {
  return (
    <div className="w-full">
       <Masonry items={photos} />
    </div>
  )
}

export default ImageRender
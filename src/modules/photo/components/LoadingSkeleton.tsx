import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface Props {}

const LoadingSkeleton = (props: Props) => (
  //   <SkeletonTheme baseColor="#313131" highlightColor="#525252">
  <div className="photo-skeleton">
    {/* <h2>{photoItem.id}</h2> */}
    {/* <img className="thumbnail" src={photoItem.thumbnailUrl} />
        <div className="content">
          <input className="input" value={title} onChange={(e) => handleChangeTitle(e)} />
          <div className="date">{photoItem.updatedAt}</div>
        </div> */}
  </div>
  //   </SkeletonTheme>
)

export default LoadingSkeleton

import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './LoadingSkeleton.scss'

interface Props {}

const LoadingSkeleton = (props: Props) => (
  <div className="photo-skeleton">
    <Skeleton width={100} height={100} />
    <div className="content">
      <Skeleton width={500} height={20} count={1} />
      <Skeleton width={500} height={20} count={1} />
    </div>
  </div>
)

export default LoadingSkeleton

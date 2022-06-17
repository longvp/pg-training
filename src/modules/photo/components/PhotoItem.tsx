import React from 'react'
import './PhotoItem.scss'
import { IPhoto } from '../../../models/photo'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from './../../../redux/reducer'
import { Action } from 'redux'
import { setPhotosChange, removePhotoChange, resetPhotos } from '../redux/photoReducer'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

interface Props {
  photoItem: IPhoto
}

const PhotoItem = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
  const { photoItem } = props
  const [title, setTitle] = React.useState(photoItem.title || '')

  const { isReset } = useSelector((state: AppState) => ({
    isReset: state.photo.isReset,
  }))

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  React.useEffect(() => {
    if (title !== photoItem.title) {
      dispatch(resetPhotos(false))
      dispatch(setPhotosChange({ ...photoItem, title }))
    }
    if (title === photoItem.title) {
      dispatch(removePhotoChange({ ...photoItem, title }))
    }
  }, [title])

  React.useEffect(() => {
    if (isReset === true) {
      setTitle(photoItem.title)
    }
  }, [isReset])

  return (
    <>
      <div className="photo">
        <h2>{photoItem.id || <Skeleton count={3} />}</h2>
        <img className="thumbnail" src={photoItem.thumbnailUrl} />
        <div className="content">
          <input className="input" value={title} onChange={(e) => handleChangeTitle(e)} />
          <div className="date">{photoItem.updatedAt || <Skeleton width={100} height={500} />}</div>
        </div>
      </div>
    </>
  )
}

export default PhotoItem

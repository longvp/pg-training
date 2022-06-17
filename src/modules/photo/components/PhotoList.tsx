import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PhotoItem from './PhotoItem'
import './PhotoList.scss'
import { AppState } from './../../../redux/reducer'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { updatePhotos, resetPhotos } from '../redux/photoReducer'

interface Props {}

const PhotoList = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const { listPhoto, listPhotoChange } = useSelector((state: AppState) => ({
    listPhoto: state.photo.listPhoto,
    listPhotoChange: state.photo.listPhotoChange,
  }))

  const handleUpdatePhotos = () => {
    dispatch(updatePhotos())
  }

  const handleResetPhotos = () => {
    dispatch(resetPhotos(true))
  }

  return (
    <>
      {listPhoto && listPhoto.length > 0 && (
        <div className="photo-container">
          <div className="action">
            <button
              type="button"
              disabled={listPhotoChange && listPhotoChange.length > 0 ? false : true}
              className="btn-action"
              onClick={() => handleUpdatePhotos()}
            >
              Confirm
            </button>
            <button
              type="button"
              disabled={listPhotoChange && listPhotoChange.length > 0 ? false : true}
              className="btn-action"
              onClick={() => handleResetPhotos()}
            >
              Reset
            </button>
          </div>
          <div className="photo-list">
            {listPhoto.map((photo) => (
              <PhotoItem key={photo.id} photoItem={photo} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default PhotoList

import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../../../redux/reducer'
import { Action } from 'redux'
import { fetchThunk } from '../../../common/redux/thunk'
import { API_PHOTO } from '../../utils'
import _ from 'lodash'
import { IPhoto } from './../../../../models/photo'
import './PhotoDetail.scss'

interface Props {}

const PhotoDetail = (props: Props) => {
  const params = useParams<{ photoId: string | undefined }>()
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const [photoId, setPhotoId] = React.useState<string>(params.photoId || '')
  const [loading, setLoading] = React.useState<boolean>(false)
  const [photoDetail, setPhotoDetail] = React.useState<IPhoto>({
    albumId: '',
    id: -1,
    title: '',
    url: '',
    thumbnailUrl: '',
    updatedAt: '',
  })
  const [messageNotFound, setMessageNotFound] = React.useState<string>('')

  const getPhotoDetail = React.useCallback(
    async (photoId: string) => {
      setLoading(true)
      const json = await dispatch(fetchThunk(`${API_PHOTO}/${photoId}`, 'get'))
      if (!_.isEmpty(json)) {
        setPhotoDetail(json)
      } else {
        setMessageNotFound('Not Found Photo')
      }
      setLoading(false)
    },
    [photoId],
  )

  React.useEffect(() => {
    if (photoId) {
      getPhotoDetail(photoId)
    }
  }, [photoId])

  console.log('a: ', photoDetail)
  return (
    <>
      {photoDetail.id === -1 ? (
        <h2 className="heading">{messageNotFound}</h2>
      ) : (
        <>
          <h2 className="heading">Photo Detail</h2>
          <div className="box">
            <div className="text">Title: </div>
            <div className="content">{photoDetail.title}</div>
          </div>
          <div className="box">
            <div className="text">Thumbnail: </div>
            <img src={photoDetail.thumbnailUrl} />
          </div>
        </>
      )}
    </>
  )
}

export default PhotoDetail

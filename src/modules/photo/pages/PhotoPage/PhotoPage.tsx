import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../../../redux/reducer'
import { Action } from 'redux'
import { fetchThunk } from '../../../common/redux/thunk'
import _ from 'lodash'
import { setPhotos, setPaging } from '../../redux/photoReducer'
import { API_PHOTO, SIZE } from '../../utils'
import PhotoList from '../../components/PhotoList/PhotoList'
import { IPaging, IPhoto } from '../../../../models/photo'
import './PhotoPage.scss'
import LoadingSkeleton from '../../components/LoadingSkeleton/LoadingSkeleton'

interface Props {}

const PhotoPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
  const { isTheEnd } = useSelector((state: AppState) => ({
    isTheEnd: state.photo.isTheEnd,
  }))
  const { paging } = useSelector((state: AppState) => ({
    paging: state.photo.paging,
  }))

  const [loading, setLoading] = React.useState<boolean>(false)

  const getPhoto = React.useCallback(
    async (paging: IPaging) => {
      setLoading(true)
      const json = await dispatch(fetchThunk(`${API_PHOTO}?_start=${paging.start}&_end=${paging.end}`, 'get'))
      if (!_.isEmpty(json)) {
        const newjson = json.map((photo: IPhoto) => ({ ...photo, updatedAt: '' + Date.now() }))
        dispatch(setPhotos(newjson))
      }
      setLoading(false)
    },
    [paging],
  )

  React.useEffect(() => {
    if (paging) {
      getPhoto(paging)
    }
  }, [paging])

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 1) {
        if (!paging || isTheEnd) {
          return
        }
        dispatch(setPaging())
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const showLoadingSkeleton = () => {
    const arr = []
    for (let i = 0; i < SIZE; i++) {
      arr.push(i)
    }
    return arr.map((index) => <LoadingSkeleton key={index} />)
  }

  return (
    <>
      <PhotoList />
      {isTheEnd ? <h4>THE END</h4> : <>{loading && showLoadingSkeleton()}</>}
    </>
  )
}

export default PhotoPage

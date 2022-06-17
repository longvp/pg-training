import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from './../../../redux/reducer'
import { Action } from 'redux'
import { fetchThunk } from '../../common/redux/thunk'
import _ from 'lodash'
import { setPhotos, setPaging } from '../redux/photoReducer'
import { API_PHOTO, SIZE } from './../utils'
import PhotoList from '../components/PhotoList'
import { IPaging, IPhoto } from '../../../models/photo'
import Loading from '../components/Loading'
import './PhotoPage.scss'
import LoadingSkeleton from '../components/LoadingSkeleton'

interface Props {}

const PhotoPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
  // const { paging } = useSelector((state: AppState) => ({
  //   paging: state.photo.paging,
  // }))

  const [paging, setPaging] = useState<IPaging>({ start: 0, end: SIZE })

  const [loading, setLoading] = React.useState<boolean>(false)

  const getPhoto = React.useCallback(
    async (paging: IPaging) => {
      const json = await dispatch(fetchThunk(`${API_PHOTO}?_start=${paging.start}&_end=${paging.end}`, 'get'))
      if (!_.isEmpty(json)) {
        const newjson = json.map((photo: IPhoto) => ({ ...photo, updatedAt: '' + Date.now() }))
        dispatch(setPhotos(newjson))
      }
      setLoading(true)
    },
    [paging],
  )

  React.useEffect(() => {
    if (paging) {
      getPhoto(paging)
    }
  }, [paging])

  const loadMore = () => {
    console.log('a')
    // if (paging) {
    //   dispatch(setPaging({ start: +paging.start + SIZE, end: +paging.end + SIZE }))
    // }
    setPaging((prev: IPaging) => ({ start: prev.start + SIZE, end: prev.end + SIZE }))
  }

  const pagingRef = React.useRef<HTMLButtonElement>(null)
  // React.useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         loadMore()
  //       }
  //     },
  //     { threshold: 1 },
  //   )
  //   if (loading) {
  //     if (pagingRef && pagingRef.current) {
  //       observer.observe(pagingRef.current)
  //     }
  //   }
  //   // return () => {
  //   //   if (pagingRef && pagingRef.current) {
  //   //     observer.unobserve(pagingRef.current)
  //   //   }
  //   // }
  // }, [loading])

  return (
    <>
      <LoadingSkeleton />
      <PhotoList />
      {/* <Loading /> */}
      <button type="button" className="btn-load-more" onClick={() => loadMore()} ref={pagingRef}>
        Load more ...
      </button>
    </>
  )
}

export default PhotoPage

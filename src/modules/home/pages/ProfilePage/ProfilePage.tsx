import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { AppState } from '../../../../redux/reducer'
import { ACCESS_TOKEN_KEY, APIHost } from '../../../../utils/constants'
import { fetchThunk } from '../../../common/redux/thunk'
import { useLocation } from 'react-router-dom'
import './ProfilePage.scss'
import { ROUTES } from '../../../../configs/routes'
import { Modal, Button } from 'react-bootstrap'
import { generateAvatarUpload } from '../../../../utils/upload'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { API_PATHS } from '../../../../configs/api'
import { RESPONSE_STATUS_SUCCESS } from '../../../../utils/httpResponseCode'
import { setUserInfo } from '../../../auth/redux/authReducer'
import Cookies from 'js-cookie'

interface Props {}

const ProfilePage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
  const location = useLocation()
  const { user } = useSelector((state: AppState) => ({
    user: state.profile.user,
  }))
  const avatarInputRef = React.useRef<HTMLInputElement>(null)
  const imgRef = React.useRef<any>(null)
  const [image, setImage] = React.useState(user?.avatar)
  const [openModal, setOpenModal] = React.useState(false)
  const [crop, setCrop] = React.useState<any>({ unit: '%', width: 30, aspect: 1 })
  const [completedCrop, setCompletedCrop] = React.useState<any>(null)
  const previewCanvasRef = React.useRef<any>(null)

  const getUserProfile = async () => {
    if (location.pathname === ROUTES.profile) {
      const json = await dispatch(fetchThunk(API_PATHS.userProfile, 'get'))
      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(json.data))
      }
    }
  }

  React.useEffect(() => {
    getUserProfile()
  }, [])

  const changeAvatar = () => {
    if (avatarInputRef.current !== null) avatarInputRef.current.click()
  }

  const onChooseAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const files = e.target.files
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result as any)
    }
    if (files !== null && files.length) reader.readAsDataURL(files[0])
    setOpenModal(true)
  }

  const onLoad = React.useCallback((img: any) => {
    imgRef.current = img
  }, [])

  React.useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return
    }

    const image = imgRef.current
    const canvas = previewCanvasRef.current
    const crop = completedCrop

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')
    const pixelRatio = window.devicePixelRatio

    canvas.width = crop.width * pixelRatio * scaleX
    canvas.height = crop.height * pixelRatio * scaleY

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY,
    )
  }, [completedCrop])

  const uploadAvatar = async () => {
    const file = await generateAvatarUpload(previewCanvasRef.current, completedCrop)
    if (file) {
      const formData = new FormData()
      formData.append('file', file, file.name)
      // const contentType = {
      //   headers: {
      //     'content-type': 'multipart/form-data',
      //     Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
      //   },
      // }
      const json = await dispatch(fetchThunk(`${API_PATHS.userProfile}`, 'put', formData, true, 'multipart/form-data'))
      if (json.data && json.data.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(json.data.data))
      }
    }
  }

  return (
    <>
      <div className="container profile-page">
        <div className="card" style={{ margin: 'auto', width: '100%', alignItems: 'center' }}>
          <div className="profilepic">
            <img src={`${APIHost}/${user?.avatar}`} className="card-img-top profilepic__image" alt="avatar_url" />
            {location.pathname === ROUTES.profile && (
              <div className="profilepic__content" onClick={changeAvatar}>
                <input ref={avatarInputRef} hidden type="file" accept="image/*" onChange={(e) => onChooseAvatar(e)} />
                <span className="profilepic__text">Upload Avatar</span>
              </div>
            )}
          </div>
          <div className="card-body">
            <h5 className="card-title">Email</h5>
            <p className="card-text">{user?.email}</p>
            <h5 className="card-title">User Name</h5>
            <p className="card-text">{user?.name}</p>
            <h5 className="card-title">Description</h5>
            <p className="card-text">{user?.description}</p>
            <h5 className="card-title">State</h5>
            <p className="card-text">{user?.state}</p>
            <h5 className="card-title">Region</h5>
            <p className="card-text">{user?.region}</p>
          </div>
        </div>
        <Modal
          show={openModal}
          onHide={() => {
            setOpenModal(false)
          }}
        >
          <Modal.Header>
            <Modal.Title>Upload</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReactCrop
              src={image ? image : ''}
              crop={crop}
              onChange={(newCrop: any) => {
                setCrop(newCrop)
              }}
              onImageLoaded={onLoad}
              onComplete={(c) => setCompletedCrop(c)}
            />
            <div>
              <canvas
                ref={previewCanvasRef}
                // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                style={{
                  width: Math.round(completedCrop?.width ?? 0),
                  height: Math.round(completedCrop?.height ?? 0),
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setOpenModal(false)
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setOpenModal(false)
                uploadAvatar()
              }}
            >
              Save Image
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default ProfilePage

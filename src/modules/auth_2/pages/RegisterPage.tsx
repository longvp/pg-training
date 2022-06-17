import RegisterForm from '../components/RegisterForm'
import { replace } from 'connected-react-router'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { API_PATHS } from '../../../configs/api'
import { ROUTES } from '../../../configs/routes'
import { IGenderParams, ISignUpParams, IStatesParams } from '../../../models/auth'
import { AppState } from '../../../redux/reducer'
import { getErrorMessageResponse } from '../../../utils'
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode'
import { fetchThunk } from '../../common/redux/thunk'
import { ILocationParams } from './../../../models/auth'

const RegisterPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<string>('')

  const genders: IGenderParams[] = [
    { label: 'Nam', value: 'Male' },
    { label: 'Nữ', value: 'Female' },
  ]
  const [locations, setLocations] = React.useState<ILocationParams[]>([])
  const [idLocationSelected, setIdLocationSelected] = React.useState<string>('')
  const [states, setStateS] = React.useState<IStatesParams[]>([])

  const getLocation = React.useCallback(async () => {
    setLoading(true)
    const json = await dispatch(fetchThunk(API_PATHS.getLocation, 'get'))
    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      const locations = json.data
      setLocations(locations)
    }
    setLoading(false)
  }, [locations])

  const getState = React.useCallback(
    async (idLocation) => {
      setLoading(true)
      const json = await dispatch(fetchThunk(`${API_PATHS.getLocation}?pid=${idLocation}`, 'get'))
      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        setStateS(json.data)
      }
      setLoading(false)
    },
    [states],
  )

  const handleChangeLocation = React.useCallback((idLocation: string) => {
    setIdLocationSelected(idLocation)
  }, [])

  React.useEffect(() => {
    getLocation()
  }, [])

  React.useEffect(() => {
    if (idLocationSelected) {
      getState(idLocationSelected)
    }
  }, [idLocationSelected])

  // register https://jsonplaceholder.typicode.com/photos?_start=3&_end=10
  const handleRegister = React.useCallback(
    async (values: ISignUpParams) => {
      setErrorMessage('')
      setLoading(true)
      const json = await dispatch(fetchThunk(API_PATHS.register, 'post', values))
      setLoading(false)
      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        alert('Bạn đã đăng ký thành công !')
        dispatch(replace(ROUTES.login))
        return
      }
      setErrorMessage(getErrorMessageResponse(json))
    },
    [dispatch],
  )

  return (
    <>
      <RegisterForm
        handleRegister={handleRegister}
        errorMessage={errorMessage}
        loading={loading}
        genders={genders}
        locations={locations}
        states={states}
        handleChangeLocation={handleChangeLocation}
      />
    </>
  )
}

export default RegisterPage

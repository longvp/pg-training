import { replace } from 'connected-react-router'
import Cookies from 'js-cookie'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { API_PATHS } from '../../../configs/api'
import { ROUTES } from '../../../configs/routes'
import { ILoginParams } from '../../../models/auth'
import { AppState } from '../../../redux/reducer'
import { getErrorMessageResponse } from '../../../utils'
import { ACCESS_TOKEN_KEY } from '../../../utils/constants'
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode'
import { setUserInfo } from '../../auth/redux/authReducer'
import { fetchThunk } from '../../common/redux/thunk'
import LoginForm2 from '../components/LoginForm2'

function LoginPage2() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleLogin = React.useCallback(
    async (values: ILoginParams) => {
      setErrorMessage('')
      setLoading(true)

      const json = await dispatch(
        fetchThunk(API_PATHS.signIn, 'post', { email: values.email, password: values.password }),
      )

      setLoading(false)

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(json.data))
        Cookies.set(ACCESS_TOKEN_KEY, json.data.token, { expires: values.rememberMe ? 7 : undefined })
        dispatch(replace(ROUTES.home))
        return
      }

      setErrorMessage(getErrorMessageResponse(json))
    },
    [dispatch],
  )

  React.useEffect(() => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY)
    if (accessToken) {
      dispatch(replace(ROUTES.home))
    }
  }, [])

  return (
    <>
      <LoginForm2 handleLogin={handleLogin} loading={loading} errorMessage={errorMessage} />
    </>
  )
}

export default LoginPage2

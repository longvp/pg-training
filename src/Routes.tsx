import React, { lazy, Suspense } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { ROUTES } from './configs/routes'
import RegisterPage from './modules/auth_2/pages/RegisterPage'
import ProtectedRoute from './modules/common/components/ProtectedRoute'
import Navbar from './modules/home/components/Navbar'
import { ACCESS_TOKEN_KEY } from './utils/constants'
import Cookies from 'js-cookie'

const HomePage = lazy(() => import('./modules/home/pages/HomePage'))
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'))
//const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'))
const LoginPage2 = lazy(() => import('./modules/auth_2/pages/LoginPage2'))

interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation()
  const auth = Cookies.get(ACCESS_TOKEN_KEY)

  return (
    <>
      <Suspense fallback={<div>Loading.....</div>}>
        {auth && <Navbar />}
        <Switch location={location}>
          {/* <Route path={ROUTES.login} component={LoginPage} /> */}
          <Route path={ROUTES.login_2} component={LoginPage2} />
          <Route path={ROUTES.register} component={RegisterPage} />
          <ProtectedRoute path={ROUTES.home} component={HomePage} />
          <ProtectedRoute path={ROUTES.contact} component={ContactPage} />

          <Route path="/" component={LoginPage2} />
        </Switch>
      </Suspense>
    </>
  )
}

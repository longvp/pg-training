import { faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../../configs/routes'
import './Navbar.scss'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN_KEY } from '../../../utils/constants'
import { replace } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../../redux/reducer'
import { Action } from 'redux'
import { removeUserInfo } from './../../auth/redux/authReducer'
import _ from 'lodash'
import pgs from '../../../assets/images/pgs.png'

function Navbar() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const { user } = useSelector((state: AppState) => ({
    user: state.profile.user,
  }))

  const handleLogOut = () => {
    dispatch(removeUserInfo())
    Cookies.remove(ACCESS_TOKEN_KEY)
    dispatch(replace(ROUTES.login_2))
  }

  return (
    <>
      <div className="menu">
        <img src={pgs} className="logo" />
        <div className="menu-link">
          <NavLink activeClassName="active" className="link" to={ROUTES.home}>
            Home
          </NavLink>
          <NavLink activeClassName="active" className="link" to={ROUTES.contact}>
            Contact
          </NavLink>
        </div>
        <div className="action">
          {!_.isEmpty(user) && (
            <div className="avatar">
              <FontAwesomeIcon className="icon" icon={faUser} />
              <span className="name">{user?.name}</span>
            </div>
          )}
          <span className="log-out" title="Log out" onClick={() => handleLogOut()}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </span>
        </div>
      </div>
    </>
  )
}

export default Navbar

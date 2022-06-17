import { faArrowRightFromBracket, faBars, faEye, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../../../configs/routes'
import './Navbar.scss'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN_KEY } from '../../../../utils/constants'
import { replace } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../../../redux/reducer'
import { Action } from 'redux'
import { removeUserInfo } from '../../../auth/redux/authReducer'
import _ from 'lodash'
import pgs from '../../../../assets/images/pgs.png'
import { FormattedMessage } from 'react-intl'

function Navbar() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const [showMenu, setShowMenu] = React.useState<boolean>(false)

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
      <div className="menu-container">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="menu">
                <img src={pgs} className="logo" />
                <div className={`menu-link ${showMenu ? '' : 'hide-menu'}`}>
                  <NavLink activeClassName="active" className="link" to={ROUTES.home}>
                    Home
                  </NavLink>
                  <NavLink activeClassName="active" className="link" to={ROUTES.contact}>
                    Contact
                  </NavLink>
                  <NavLink activeClassName="active" className="link" to={ROUTES.photo}>
                    Photo
                  </NavLink>
                  <div className="btn-hide-menu" onClick={() => setShowMenu(false)}>
                    <FontAwesomeIcon icon={faXmark} />
                  </div>
                </div>
                <div className="header-right">
                  {!_.isEmpty(user) && (
                    <div className="avatar">
                      <FontAwesomeIcon className="icon" icon={faUser} />
                      <span className="name">{user?.name}</span>
                      <ul className="user-action">
                        <li className="action" onClick={() => handleLogOut()} title="Log out">
                          <FontAwesomeIcon className="action-icon" icon={faArrowRightFromBracket} />
                          <span className="action-name">
                            <FormattedMessage id="logout" />
                          </span>
                        </li>
                        <li className="action" title="See detail">
                          <FontAwesomeIcon className="action-icon" icon={faEye} />
                          <span className="action-name">
                            <FormattedMessage id="seeDetail" />
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                  <div className="btn-show-menu" onClick={() => setShowMenu(true)}>
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar

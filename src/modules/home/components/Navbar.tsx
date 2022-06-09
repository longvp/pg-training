import React from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../../configs/routes'
import './Navbar.scss'

function Navbar() {
  return (
    <>
      <div className="menu">
        <NavLink activeClassName="active" className="link" to={ROUTES.login}>
          Login_1
        </NavLink>
        <NavLink activeClassName="active" className="link" to={ROUTES.login_2}>
          Login_2
        </NavLink>
        <NavLink activeClassName="active" className="link" to={ROUTES.register}>
          Register
        </NavLink>
      </div>
    </>
  )
}

export default Navbar

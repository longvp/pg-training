import React, { useState } from 'react'
import './LoginForm2.scss'
import { ILoginParams } from './../../../models/auth'
import { Field, Form, Formik } from 'formik'
import { validEmailRegex } from './../../../utils/index'
import { FormattedMessage } from 'react-intl'
import * as yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../../configs/routes'

interface Props {
  handleLogin(values: ILoginParams): void
  errorMessage: string
}

const RegisterForm = (props: Props) => {
  const { handleLogin, errorMessage } = props

  const initialValues: ILoginParams = { email: '', password: '', rememberMe: false }
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const validationSchema = yup.object({
    email: yup.string().required('emailRequire').matches(validEmailRegex, 'emailInvalid'),
    password: yup.string().required('passwordRequire').min(4, 'minPasswordInvalid'),
  })

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true)
          handleLogin(data)
          setSubmitting(false)
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form className="form2">
            <div className="title">
              <FormattedMessage id="register" />
            </div>
            {!!errorMessage && (
              <div className="alert alert-danger error" role="alert">
                {errorMessage}
              </div>
            )}
            {/* Email */}
            <div className="input">
              <label htmlFor="email">
                <FormattedMessage id="email" />
              </label>
              <Field type="text" id="email" name="email" placeholder="Enter your email" />
              {errors && errors?.email && (
                <small className="text-danger">
                  <FormattedMessage id={errors?.email} />
                </small>
              )}
            </div>
            {/* Password */}
            <div className="input">
              <label htmlFor="password">
                <FormattedMessage id="password" />
              </label>
              <Field
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
              />
              <span className="icon" onClick={handleShowPassword}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
              {errors && errors?.password && (
                <small className="text-danger">
                  <FormattedMessage id={errors?.password} />
                </small>
              )}
            </div>
            {/* Repeat password */}
            <div className="input">
              <label htmlFor="repeatPassword">
                <FormattedMessage id="repeatPassword" />
              </label>
              <Field
                type={showPassword ? 'text' : 'password'}
                id="repeatPassword"
                name="repeatPassword"
                placeholder="Confirm password"
              />
              <span className="icon" onClick={handleShowPassword}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
              {errors && errors?.password && (
                <small className="text-danger">
                  <FormattedMessage id={errors?.password} />
                </small>
              )}
            </div>
            {/* Name */}
            <div className="input">
              <label htmlFor="name">
                <FormattedMessage id="name" />
              </label>
              <Field type="text" id="name" name="name" placeholder="Enter your name" />
              {errors && errors?.password && (
                <small className="text-danger">
                  <FormattedMessage id={errors?.password} />
                </small>
              )}
            </div>
            {/* Gender */}
            <div className="input">
              <label htmlFor="gender">
                <FormattedMessage id="gender" />
              </label>
              <Field as="select" id="gender" name="gender">
                <option value="M">Nam</option>
                <option value="F">Nữ</option>
              </Field>
            </div>
            {/* Region */}
            <div className="input">
              <label htmlFor="gender">
                <FormattedMessage id="gender" />
              </label>
              <Field as="select" id="gender" name="gender">
                <option value="M">Nam</option>
                <option value="F">Nữ</option>
              </Field>
            </div>
            <div className="remember-register">
              <div className="remember">
                <Field name="rememberMe" id="remember" type="checkbox" />
                <label htmlFor="remember">
                  <FormattedMessage id="remember" />
                </label>
              </div>
              <NavLink to={ROUTES.register} className="register">
                <FormattedMessage id="register" />
              </NavLink>
            </div>
            <button type="submit" className="submit" disabled={isSubmitting}>
              {isSubmitting && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
              <FormattedMessage id="signIn" />
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default RegisterForm

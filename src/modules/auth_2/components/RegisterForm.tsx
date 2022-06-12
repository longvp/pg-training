import React from 'react'
import './LoginForm2.scss'
import { IGenderParams, ILocationParams, ISignUpParams, IStatesParams } from './../../../models/auth'
import { Field, Form, Formik } from 'formik'
import { validEmailRegex } from './../../../utils/index'
import { FormattedMessage } from 'react-intl'
import * as yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { ROUTES } from './../../../configs/routes'

interface Props {
  handleRegister(values: ISignUpParams): void
  errorMessage: string
  loading: boolean
  genders: IGenderParams[]
  locations: ILocationParams[]
  states: IStatesParams[]
  handleChangeLocation(values: string): void
}

const RegisterForm = (props: Props) => {
  const { handleRegister, errorMessage, loading, genders, locations, states, handleChangeLocation } = props

  const initialValues: ISignUpParams = {
    email: '',
    password: '',
    repeatPassword: '',
    name: '',
    gender: genders && genders.length > 0 ? genders[0].value : '',
    region: locations.length > 0 ? locations[0].id.toString() : '1',
    state: '',
  }

  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const changeLocation = (idLocationSelected: string) => {
    handleChangeLocation(idLocationSelected)
  }

  const validationSchema = yup.object({
    email: yup.string().required('emailRequire').matches(validEmailRegex, 'emailInvalid'),
    password: yup.string().required('passwordRequire').min(4, 'minPasswordInvalid'),
    repeatPassword: yup
      .string()
      .required('repeatPasswordRequire')
      .oneOf([yup.ref('password'), null], 'repeatPasswordInvalid'),
    name: yup.string().required('nameRequire'),
    gender: yup.string().required('genderRequire'),
    region: yup.string().required('regionRequire'),
    state: yup.string().required('stateRequire'),
  })

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true)
          handleRegister(data)
          setSubmitting(false)
        }}
      >
        {({ values, errors, handleChange }) => (
          <>
            {changeLocation(values.region)}
            <Form className="form2">
              <div className="title">
                <FormattedMessage id="register" />
              </div>
              {!!errorMessage && (
                <div className="alert alert-danger error text-center" role="alert">
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
                {errors && errors?.repeatPassword && (
                  <small className="text-danger">
                    <FormattedMessage id={errors?.repeatPassword} />
                  </small>
                )}
              </div>
              {/* Name */}
              <div className="input">
                <label htmlFor="name">
                  <FormattedMessage id="name" />
                </label>
                <Field type="text" id="name" name="name" placeholder="Enter your name" />
                {errors && errors?.name && (
                  <small className="text-danger">
                    <FormattedMessage id={errors?.name} />
                  </small>
                )}
              </div>
              {/* Gender */}
              <div className="input">
                <label htmlFor="gender">
                  <FormattedMessage id="gender" />
                </label>
                {genders && genders.length > 0 && (
                  <>
                    <Field as="select" id="gender" name="gender">
                      {genders &&
                        genders.length > 0 &&
                        genders.map((gender, index) => (
                          <option key={index} value={gender.value}>
                            {gender.label}
                          </option>
                        ))}
                    </Field>
                  </>
                )}
              </div>
              {/* Region */}
              <div className="input">
                <label htmlFor="region">
                  <FormattedMessage id="region" />
                </label>
                <Field as="select" id="region" name="region" onChange={handleChange}>
                  {locations &&
                    locations.length > 0 &&
                    locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                </Field>
                {errors && errors?.region && (
                  <small className="text-danger">
                    <FormattedMessage id={errors?.region} />
                  </small>
                )}
              </div>
              {/* State */}
              <div className="input">
                <label htmlFor="state">
                  <FormattedMessage id="state" />
                </label>
                <Field as="select" id="state" name="state">
                  {states &&
                    states.length > 0 &&
                    states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}
                </Field>
                {errors && errors?.state && (
                  <small className="text-danger">
                    <FormattedMessage id={errors?.state} />
                  </small>
                )}
              </div>
              <NavLink className="link-sign-in" to={ROUTES.login_2}>
                <FormattedMessage id="signIn" />
              </NavLink>
              <button type="submit" className="submit" disabled={loading}>
                {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
                <FormattedMessage id="register" />
              </button>
            </Form>
          </>
        )}
      </Formik>
    </>
  )
}

export default RegisterForm

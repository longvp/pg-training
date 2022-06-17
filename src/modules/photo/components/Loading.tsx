import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './Loading.scss'

interface Props {}

const Loading = (props: Props) => {
  return (
    <>
      <FontAwesomeIcon className="loading" icon={faSpinner} />
    </>
  )
}

export default Loading

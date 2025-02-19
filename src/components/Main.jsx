import React from 'react'
import { Link } from 'react-router-dom'

function Main() {
  return (
    <div>
      <h1>Start slide</h1>
      <button><Link to={'/slide-1'}>For students</Link></button>
      <button><Link to={'/teacher-slide-1'}>For teachers</Link></button>
    </div>
  )
}

export default Main

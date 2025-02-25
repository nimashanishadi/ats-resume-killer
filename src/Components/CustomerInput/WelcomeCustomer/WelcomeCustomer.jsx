import React from 'react'

import './WelcomeCustomer.css'

import UserInput from '../UserInput/UserInput'
import UserWelcomeNote from '../../UserWelcomeNote/UserWelcomeNote'

function WelcomeCustomer() {
  return (
    <>
        <h2 className="welcome-note">Welcome User !</h2>
        <div className="resume-container">
        <UserWelcomeNote/>
        <UserInput/>
        </div>
    </>
  )
}

export default WelcomeCustomer
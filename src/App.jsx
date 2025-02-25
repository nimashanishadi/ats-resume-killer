import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HeaderContent from './Components/HeaderContent/HeaderContent'
import BodyContent from './Components/BodyContent/BodyContent'
import WelcomeCustomer from './Components/CustomerInput/WelcomeCustomer/WelcomeCustomer'




function App() {
  

  return (
    <>
      <div id='wrapper'>
        <HeaderContent/>
        <WelcomeCustomer/>
        
      </div>
    </>
  )
}

export default App

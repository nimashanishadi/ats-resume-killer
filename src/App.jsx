import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HeaderContent from './Components/HeaderContent/HeaderContent'
import BodyContent from './Components/BodyContent/BodyContent'
import WelcomeCustomer from './Components/CustomerInput/WelcomeCustomer/WelcomeCustomer'


import React from "react";
import { Provider } from "react-redux";
import Store from "./store/store";
import UserInput from "./Components/CustomerInput/UserInput/UserInput";



function App() {
  

  return (
    <Provider store={Store}>
      <div id='wrapper'>
        <HeaderContent/>
        <WelcomeCustomer/>
        
      </div>
      </Provider>
  )
}

export default App

import React from 'react'
import HeaderContent from '../Components/HeaderContent/HeaderContent'
import BodyContent from '../Components/BodyContent/BodyContent'
import UserInput from '../Components/CustomerInput/UserInput/UserInput'
import Footer from '../Components/Footer/Footer'

function BlogPage() {
  return (
    <>
        <div id='wrapper'>
            <HeaderContent/>
            <h3>Blob Page</h3>
            <Footer/>
        </div>
    </>
  )
}

export default BlogPage
import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Chatbot from './components/chatbot'


const App = () => {
  return (
    <>
    <Navbar />
    {/* <div className='bg-dark'>App</div> */}
    <Home />
<Chatbot/>
    <Footer />
    </>
  )
}

export default App
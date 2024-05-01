import React from 'react'
import NavbarReact from './Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cardreact from './Cards';
import "../style/home.css"

function Home({ cart, setCart }) {
  return (
    <div className='home-bck'>
        <NavbarReact/>
        <Cardreact cart={cart} setCart={setCart} />
        </div>
  )
}

export default Home
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login';
import { useState } from 'react';
import Passwordreset from './components/Passwordreset';
import Landing from './components/Landing';
import Cart from './components/Cart';



function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);
 
  const clearCart = () => {
    setCart([]);
  };

  const increaseQuantity = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCart(updatedCart);
  };

 
  const decreaseQuantity = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id && cartItem.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });
    setCart(updatedCart);
  };

  return (
    <div className="App"> 
    <Router>
        <Routes>
        <Route path="/" element={<Landing/>}/>
          <Route
            path="/login"
            element={<Login setAuthenticated={setAuthenticated}/>}
          />
          <Route
            path="/home"
            element={authenticated ? <Home cart={cart} setCart={setCart} /> : <Navigate to="/" />}
          />
          <Route
            path="/cart"
            element={authenticated ? <Cart cart={cart} clearcart={clearCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity}/> : <Navigate to="/" />}
          />

           <Route path="/password-reset" element={<Passwordreset/>}/>
        </Routes>  
      </Router>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
//import { Link } from 'react-router-dom'; 
import { API } from '../Global';
import "../style/cards.css";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { notification } from 'antd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar } from '@fortawesome/free-solid-svg-icons';
//import { Button } from 'antd';

function Cardreact({ cart, setCart }) {
  const [foods, setFoods] = useState([]);
  const [showVeg, setShowVeg] = useState(true); 
  const [selectedVariant, setSelectedVariant] = useState('');
  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem('Authorization');
        const response = await axios.get(`${API}/food/get-all-food`, {
          headers: {
            Authorization: `${token}`,
          },
        });
  
        if (response.status === 200) {
          setFoods(response.data);
        }
      } catch (error) {
        console.error('Error fetching movies:', error.message);
      }
    };
  
    fetchMovies();
  }, []);

  const filteredFoods = showVeg ? foods.filter(food => food.category === 'veg') : foods.filter(food => food.category !== 'veg');

  // const addToCart = (food) => {
  //   setCart([...cart, { ...food, variant: selectedVariant }]);
  // };

  const addToCart = (food) => {

    if (!selectedVariant || selectedVariant.trim() === '') { // Check if variant is not selected or is an empty string
      openNotification('error', 'Variant Not Selected', 'Please select a variant before adding to cart.');
      return; // Exit function early if variant is not selected
    }

    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(item => item._id === food._id && item.variant === selectedVariant);
    if (existingItemIndex !== -1) {
      // If the item already exists, increase its quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
      openNotification('success', 'Item Added', 'Item added to the cart successfully.');
    } else {
      // If the item is not in the cart, add it with quantity 1
      setCart([...cart, { ...food, variant: selectedVariant, quantity: 1 }]);
      openNotification('success', 'Item Added', 'Item added to the cart successfully.');
    }
  };

  return (
    <div className='card-back-img'>
      <div className="toggle-container">
      <button className="toggle-button" onClick={() => setShowVeg(!showVeg)}>
          {showVeg ? 'Show Non-Veg' : 'Show Veg'}
        </button>
      </div>
    <div className="card-container"> 
      {filteredFoods.map((food) => (
        <Card key={food._id} className="movie-card"> 
          <Card.Img variant="top" src={food.image} className="card-image" />
          <Card.Body>
            <Card.Title className="card-title">{food.name}</Card.Title>
            <Card.Text className="card-text">
            <div>
                  {food.varients && (
                    <select onChange={(e) => setSelectedVariant(e.target.value)}>
                      <option value="">Select Variant</option>
                      {food.varients.map((variant, index) => (
                        <option key={index} value={variant}>{variant}</option>
                      ))}
                    </select>
                  )}
                </div>
            </Card.Text>   
            <Button
              // to={`/movies/${food._id}`}
              onClick={() => addToCart(food)}
              className="btn btn-primary more-info-btn"
            >
              Add to cart
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
    </div>
  );
}

export default Cardreact;

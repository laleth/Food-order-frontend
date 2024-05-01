import React, {useState} from 'react';
import "../style/cart.css";
import NavbarReact from './Navbar';
import { Modal } from 'antd';
import Bill from './Bill';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Space} from 'antd';


function Cart({ cart,clearcart, increaseQuantity, decreaseQuantity }) {

  const colors2 = ['#012053', '#232a3f', '#642533', '#3f2492'];

  const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

  const calculatePrice = (item) => {
    const variantIndex = item.varients.indexOf(item.variant);
    const variantPrice = item.prices[0][item.varients[variantIndex]];
    return variantPrice * item.quantity;
  };
  const [visible, setVisible] = useState(false);
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + calculatePrice(item), 0);
  };
 
  const handleChargeBill = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };



  return (
    <div>
      <NavbarReact />
      <div className='back-img'>
      <div className="cart-container">
        <h2>Your Cart</h2>
        <button className="clear-cart-button" onClick={clearcart}>Clear Cart</button>
        <ul className="cart-items">
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
              <div className="item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                </div>
                <p className="cart-item-price"> ₹{calculatePrice(item)}</p>
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item)}>+</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="total-container">
          <p className="total-text">Total:  ₹{calculateTotal()}</p>
         </div> 
         <div>
         <Space>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: `linear-gradient(90deg,  ${colors2.join(', ')})`,
                  colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colors2).join(', ')})`,
                  colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colors2).join(', ')})`,
                  lineWidth: 0,
                },
              },
            }}
          >
          <Button  type="primary" size="large" className="charge-bill-button" onClick={handleChargeBill}>Charge Bill</Button>
          </ConfigProvider>
          </Space>
        </div>
      </div>
      <Modal
        title="Bill Details"
        visible={visible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Bill Total={calculateTotal()}/>
      </Modal>
      </div>
    </div>
  );
}

export default Cart;

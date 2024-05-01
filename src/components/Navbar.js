import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import { API } from '../Global';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { notification } from 'antd';

function NavbarReact() {
  const [username, setUsername] = useState("");
  // const navigate = useNavigate();

  // const openNotification = (type, message, description) => {
  //   notification[type]({
  //     message,
  //     description,
  //   });
  // };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const token = localStorage.getItem('Authorization');
        const response = await axios.get(`${API}/Profile/user-details`, {
          headers: {
            Authorization: `${token}`,
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          setUsername(response.data.user.username);
        }
      } catch (error) {
        console.error('Error getting user details:', error.message);
      }
    };

    getUserDetails();
  }, []);



  return (
    <Navbar expand="lg" style={{ backgroundColor: '#10898d', color: 'rgb(3,47,60)' }}>
      <Container fluid>
        <Navbar.Brand href="#" style={{ color: 'rgb(3,47,60)' }}>
          Welcome {username}!
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/home" style={{ color: 'rgb(3,47,60)' }}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" style={{ color: 'rgb(3,47,60)' }}>
              View cart
            </Nav.Link>    
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" style={{ color: 'rgb(3,47,60)' }}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarReact;

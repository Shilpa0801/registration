import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Home() {
  let token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  if (!token) {
    navigate('/');
  }

  const [user, setUser] = useState([]);

  useEffect(() => {
    const url = 'http://localhost:8000/home';
    Axios.get(url, { headers: { token: token } })
      .then((res) => {
        setUser(res.data.user);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const logOut = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <>
      <h1>Welcome {user.name}</h1>
      <div>
        <Button
          onClick={logOut}
          variant="dark"
          style={{
            position: 'absolute',
            left: '10px',
            top: '20px',
            padding: '10px 20px',
            fontSize: '16px',
          }}
        >
          Logout
        </Button>
      </div>
    </>
  );
}

export default Home;

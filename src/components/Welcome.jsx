import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Robot from "../assets/robot.gif";
import Logout from '../components/Logout';

const Welcome = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData6 = async () => {
      setUserName(
        await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        ).username
      );
    }
    fetchData6();
  }, []);
  return (
    <Container>
      <Logout />
      <h3 className='logoutInfo'>Please logout and create additional accounts for more conversations</h3>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

export default Welcome;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;

  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
  .logoutInfo {
    margin-top: 10px;
    margin-bottom: -15px;
  }

  .glnvzv {
    width: 5rem;
    height: 4rem;
    border-radius: 33px;
    margin-bottom:4px;
  }
`

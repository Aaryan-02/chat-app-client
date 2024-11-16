import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import loader from "./assets/loader.gif";
import styled from 'styled-components';

// Code-Splitting using React Lazy
const Chat = lazy(() => import("./pages/Chat"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const SetAvatar = lazy(() => import("./pages/SetAvatar"));

const App = () => {
  const [backendReady, setBackendReady] = useState(false);
  const [loading, setLoading] = useState(true);

  const wakeBackend = async (attempt = 1) => {
    if (attempt > 3) {
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("https://chat-app-server-0xv7.onrender.com/api/ping");
      if (response.ok) {
        setBackendReady(true);
        setLoading(false);
      } else {
        setTimeout(() => wakeBackend(attempt + 1), 2000); // Retry after 2 seconds
      }
    } catch {
      setTimeout(() => wakeBackend(attempt + 1), 2000); // Retry after 2 seconds
    }
  };

  useEffect(() => {
    wakeBackend();
  }, []);

  if (loading) return <Container>
          <img src={loader} alt="loader" className='loader' />
        </Container>;

  return (
    <BrowserRouter>
      <Suspense fallback={
        <Container>
          <img src={loader} alt="loader" className='loader' />
        </Container>
      }>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/setAvatar' element={<SetAvatar />} />
          <Route path='/' element={<Chat />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;
    .loader {
        max-inline-size: 100%;
    }
      
    .title-container {
        h1 {
            color: white;
        }
    }
      
  .avatars {
    display: flex;
    gap: 2rem;
      
        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img {
                height: 6rem;
                transition: 0.5s ease-in-out;
            }
        }
        .selected {
            border: 0.4rem solid #4e0eff;
        }
    }
    .submit-btn {
        background-color: #4e0eff;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
            background-color: #4e0eff;
        }
    }
`;



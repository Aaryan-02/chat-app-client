import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/ping`);
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

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
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

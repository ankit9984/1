import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar.components'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/auth/Signup'
import Signin from './pages/auth/Signin'
import { login, signup } from './utils/auth'
import Cookies from 'js-cookie'
import Home from './pages/home/Home'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
        const token = Cookies.get('authToken');
        if(token){
            try {
                const response = await fetch('http://localhost:3000/api/auth/', {
                  method: 'GET',
                  credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                console.log(data);
                setUser(data)
                // if(data.user){
                //     setUser(data);
                // }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }
    };

    fetchUser();
}, []);

const ProtectedRoute = ({children}) => {
  const isAuthenticated = !!Cookies.get('authToken')
  
  if(!isAuthenticated){
    return <Navigate to='/signin' />
  }

  return children
}

const isAuthenticated = !!Cookies.get('authToken');



  const handleSignup = (username, email, passowrd) => {
    signup(username, email, passowrd, setUser);
  };

  const handleLogin = (username, passowrd) => {
    login(username, passowrd, setUser);
  }

  // console.log(user);

 

  return (
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} username={user}/>
        <Routes>
          <Route path="/signup" element={<Signup signup={handleSignup}/>} />
          <Route path="/signin" element={<Signin login={handleLogin}/>} />
          <Route path='/' element={<ProtectedRoute><Home username={user}/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App

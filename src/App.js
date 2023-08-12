import React, { useEffect } from 'react';
import {
  ChakraProvider,
  CSSReset,
} from '@chakra-ui/react';
import Fonts from './Fonts';
import { Header } from './Components/Header';
import { HomePage } from './Components/HomePage/HomePage';
import { Route, Routes } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import theme from './theme';
import { Register } from './Components/Authentication/Register';
import { Login } from './Components/Authentication/Login';
import { fetchWithAxios } from './BaseFunctions';
import { useDispatch } from 'react-redux';
import { setRegistrationStatus, setUsername } from './store/features/userSlice';
import { Products } from './Components/Products/Products';
import { UserProfile } from './Components/Authentication/UserProfile';

function App() {
  const dispatch = useDispatch();

  const checkLogin = () => {
    fetchWithAxios.get('/shop/checkauth/', {})
      .then(function(response) {
          const responseText = response[Object.keys(response)[0]];
        console.log(response);
          dispatch(setRegistrationStatus(responseText));
        },
      ).catch(() => {
      dispatch(setUsername(''));
      dispatch(setRegistrationStatus(false));
    });
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Fonts />
      <Header />
      <AnimatePresence exitBeforeEnter>
        <Routes>
          <Route path='/' element={
            <motion.div
              key='searchPanel'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <HomePage />
            </motion.div>
          } />
          <Route path='/register' element={
            <motion.div
              key='searchPanel'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Register />
            </motion.div>
          } />
          <Route path='/login' element={
            <motion.div
              key='searchPanel'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Login />
            </motion.div>
          } />
          <Route path='/products' element={
            <motion.div
              key='searchPanel'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Products />
            </motion.div>
          } />
          <Route path='/userProfile' element={
            <motion.div
              key='searchPanel'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <UserProfile />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
    </ChakraProvider>
  );
}

export default App;

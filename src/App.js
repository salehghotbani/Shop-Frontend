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
import { fetchWithAxios } from './Base/BaseFunctions';
import { useDispatch } from 'react-redux';
import { setRegistrationStatus, setUsername } from './store/features/userSlice';
import { ListProducts } from './Components/Products/ListProducts';
import { Info } from './Components/Authentication/Info';
import { Product } from './Components/Products/Product';

function App() {
  const dispatch = useDispatch();

  const checkLogin = () => {
    fetchWithAxios.get('/shop/checkauth/', {})
      .then(function(response) {
          dispatch(setRegistrationStatus(true));
          dispatch(setUsername(response.data.username));
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
          <Route path='/info' element={
            <motion.div
              key='searchPanesl'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Info />
            </motion.div>
          } />
          <Route path='/productList' element={
            <motion.div
              key='searchPanel'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ListProducts />
            </motion.div>
          } />
          <Route path='/productInfo' element={
            <motion.div
              key='searchPanel'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Product />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
    </ChakraProvider>
  );
}

export default App;

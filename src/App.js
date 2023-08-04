import React from 'react';
import {
  ChakraProvider, CSSReset,
} from '@chakra-ui/react';
import Fonts from './Fonts';
import { Header } from './Components/Header';
import { HomePage } from './Components/HomePage/HomePage';
import { Route, Routes } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import theme from './theme';
import { Register } from './Components/Authentication/Register';

function App() {
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
        </Routes>
      </AnimatePresence>
    </ChakraProvider>
  );
}

export default App;

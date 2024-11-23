import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Token from './pages/Token';
import { WalletContextProvider } from './contexts/WalletContext';

function App() {
  return (
    <WalletContextProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/token" element={<Token />} />
        </Routes>
      </Layout>
    </WalletContextProvider>
  );
}

export default App;

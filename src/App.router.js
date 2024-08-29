import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './public/home/Home'; 
import MintPage from './public/mintpage/Mintpage';
import MyNFTsPage from './public/myNFTs/Mynfts';
import HeaderComponent from './components/HeaderComponent'; 

const AppRouter = ({ contract, account, setNeedRefresh }) => {
  return (
    <Router>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mint" element={<MintPage contract={contract} account={account} setNeedRefresh={setNeedRefresh} />} />
        <Route path="/my-nfts" element={<MyNFTsPage contract={contract} account={account} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

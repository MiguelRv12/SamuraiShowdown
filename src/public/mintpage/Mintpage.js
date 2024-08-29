import React from 'react';
import MintNFTComponent from '../../components/MintNftComponent'; // Importa tu componente de mint

const MintPage = ({ contract, account, setNeedRefresh }) => {
  return (
    <div>
      <h1>Mintear NFT</h1>
      <MintNFTComponent contract={contract} account={account} setNeedRefresh={setNeedRefresh} />
    </div>
  );
};

export default MintPage;

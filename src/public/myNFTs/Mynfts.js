import React from 'react';
import ShowNFTsComponent from '../../components/ShowNFTsComponent'; // Importa tu componente para mostrar NFTs

const MyNFTsPage = ({ contract, account }) => {
  return (
    <div>
      <h1>Mis NFTs</h1>
      <ShowNFTsComponent contract={contract} account={account} />
    </div>
  );
};

export default MyNFTsPage;

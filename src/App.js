import { Box, Flex, Text } from "@chakra-ui/react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./config";
import AppRouter from './App.router';



function App() {
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [needRefresh, setNeedRefresh] = useState(true);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const getBalance = async () => {
      const provider = new ethers.BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setContract(contractInstance);
  
      setNeedRefresh(false);
    };
    walletProvider && getBalance();
  }, [address, walletProvider, needRefresh]);

  return (
    <Box w={"100vw"} h={"100vh"} bg={"gray.700"}>
      {!isConnected ? (
        <Flex w={"100vw"} h={"100vh"} alignItems={"center"} justifyContent={"center"}>
          <w3m-button />
        </Flex>
      ) : (
        <>
          <AppRouter contract={contract} account={address} setNeedRefresh={setNeedRefresh} />
        </>
      )}
    </Box>
  );
}

export default App;

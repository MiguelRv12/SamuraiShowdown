import React, { useState, useEffect } from "react";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { ethers } from "ethers";
import Papa from "papaparse";

const MintNFTComponent = ({ contract, account, setNeedRefresh }) => {
  const [minting, setMinting] = useState(false);
  const [nftsData, setNftsData] = useState([]);

  useEffect(() => {
    const loadNFTData = async () => {
      const response = await fetch("/nftsData.csv");
      const csvText = await response.text();
      Papa.parse(csvText, {
        header: true,
        complete: (result) => {
          setNftsData(result.data);
        },
      });
    };
    loadNFTData();
  }, []);

  const mintNFT = async () => {
    if (!contract || !account || nftsData.length === 0) return;

    try {
      setMinting(true);

      const randomIndex = Math.floor(Math.random() * nftsData.length);
      const selectedNFT = nftsData[randomIndex];
      const tokenURI = selectedNFT.URL; 
      const tx = await contract.createRandomNFT(tokenURI, {
        value: ethers.parseEther("0"), 
      });

      await tx.wait(); 

      alert("NFT acuñado con éxito!");
      setNeedRefresh(true);
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("Error acuñando NFT.");
    } finally {
      setMinting(false);
    }
  };

  return (
    <Box p={5} bg="white" borderRadius="md" boxShadow="md">
      <VStack spacing={4}>
        <Text fontSize="xl" fontWeight="bold">
          Mintear un nuevo NFT
        </Text>
        <Button
          colorScheme="teal"
          onClick={mintNFT}
          isLoading={minting}
          isDisabled={minting || nftsData.length === 0}
        >
          Mintear NFT
        </Button>
      </VStack>
    </Box>
  );
};

export default MintNFTComponent;

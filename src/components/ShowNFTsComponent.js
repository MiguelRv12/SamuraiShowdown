import React, { useState, useEffect } from "react";
import { Box, Text, VStack, Spinner } from "@chakra-ui/react";
import { ethers } from "ethers";

const ShowNFTsComponent = ({ contract, account }) => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contract || !account) return;

    const fetchNFTs = async () => {
      try {
        setLoading(true);

        // Obtener los IDs de los NFTs del propietario
        const nftIds = await contract.getNftsByOwner(account);
        
        const nftDetails = await Promise.all(
          nftIds.map(async (id) => {
            const tokenURI = await contract.tokenURI(id);
            
            // Obtener los detalles de la metadata desde el tokenURI
            const response = await fetch(tokenURI);
            const metadata = await response.json();

            return {
              id,
              name: metadata.name,
              attributes: metadata.attributes,
            };
          })
        );

        setNfts(nftDetails);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [contract, account]);

  return (
    <Box p={5} bg="white" borderRadius="md" boxShadow="md" mt={5}>
      <VStack spacing={4}>
        <Text fontSize="xl" fontWeight="bold">
          Mis NFTs
        </Text>
        {loading ? (
          <Spinner />
        ) : (
          nfts.map((nft) => (
            <Box key={nft.id} p={4} borderWidth={1} borderRadius="md" w="100%">
              <Text fontSize="lg" fontWeight="bold">
                {nft.name}
              </Text>
              {nft.attributes.map((attr, index) => (
                <Text key={index}>
                  {attr.trait_type}: {attr.value}
                </Text>
              ))}
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
};

export default ShowNFTsComponent;

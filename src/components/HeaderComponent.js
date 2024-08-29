import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink, Flex, Text, Box } from '@chakra-ui/react';

;<ChakraLink as={ReactRouterLink} to='/home'>
  Home
</ChakraLink>

const HeaderComponent = () => {
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"} p={4} bg={"gray.800"}>
      <Text color={"white"} fontSize={"3xl"}>
        SamuraiShowdown
      </Text>
      <Flex p={4} bg="teal.500" justifyContent="space-between">
        <Box>
        <ChakraLink as={ReactRouterLink} to='/'>
          Home
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to='/mint'>
            Mint NFTs
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to="/my-nfts">
            My NFTs
        </ChakraLink>
        </Box>
    </Flex>
      <w3m-account-button />
    </Flex>
  );
};
export default HeaderComponent;

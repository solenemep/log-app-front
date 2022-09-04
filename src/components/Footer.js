import { Box, Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box px={4} w="100%">
      <Flex h={16} alignItems={"center"} justifyContent={"center"}>
        <Text>by Solène</Text>
      </Flex>
    </Box>
  );
};
export default Footer;

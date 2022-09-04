import { Flex, Box } from "@chakra-ui/react";

import DarkMode from "./DarkMode";

const Nav = () => {
  return (
    <Box position="fixed" px={4} w="100%" zIndex="sticky">
      <Flex h={16} alignItems={"center"} justifyContent={"end"}>
        <DarkMode />
      </Flex>
    </Box>
  );
};

export default Nav;

import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface IProfileProps {
  showProfileData: boolean;
}

export default function Profile({ showProfileData = true }: IProfileProps) {
  return (
    <Flex align="center" ml="auto">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Bárbara N. Sousa</Text>
          <Text color="gray.300" fontSize="small">barbara.ns@outlook.com</Text>
        </Box>
      )}

      <Avatar size="md" name="Bárbara N. Sousa" src="https://github.com/barbara-kanttum.png" />
    </Flex>
  );
}

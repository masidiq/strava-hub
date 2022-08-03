import { Box } from "@chakra-ui/react";

export default function Card(props) {
  return (
    <Box
      w="full"
      borderWidth="1px"
      overflow="hidden"
      borderRadius="lg"
      p="15px"
      {...props}
      bg="bg.default"
    />
  );
}

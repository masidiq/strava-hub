import { Box } from "@chakra-ui/react";

export default function Card(props) {
  return (
    <Box w="full" borderWidth="1px" borderRadius="lg" p="15px" {...props} />
  );
}

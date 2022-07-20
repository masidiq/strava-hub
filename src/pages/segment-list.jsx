import { Text, Stack, Button, Container } from "@chakra-ui/react";
export default function Page() {
  return (
    <Container p="20px">
      <Text fontWeight="bold" fontSize="xl" mb="20px">
        Segment Lainnya
      </Text>
      <Stack direction="column" spacing={4} align="center">
        <Button colorScheme="teal" variant="outline" w="full">
          RSHS-GH Lembang
        </Button>
        <Button colorScheme="teal" variant="outline" w="full">
          McD - Warnang
        </Button>
        <Button colorScheme="teal" variant="outline" w="full">
          GBLA-Loop 5x
        </Button>
        <Button colorScheme="teal" variant="outline" w="full">
          GBLA-Loop Sprint
        </Button>
        <Button colorScheme="teal" variant="outline" w="full">
          Cagak - Tangkuban Perahu
        </Button>
        <Button colorScheme="teal" variant="outline" w="full">
          Padalrang - CIleunyi
        </Button>
      </Stack>

      <Text mb="20px" mt="20px">
        Tambah segment?
      </Text>
      <Button w="full" colorScheme="blue">
        Request Segment
      </Button>
    </Container>
  );
}
